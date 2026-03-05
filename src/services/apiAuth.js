import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // 1) update fullname | password
  let userData;
  if (fullName) userData = { data: { fullName } };
  if (password) userData = { password };

  const { data, error } = await supabase.auth.updateUser(userData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2) upload avatar
  const fileName = `avatar-${data.user.id}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, {
      upsert: true,
    });

  if (storageError) throw new Error("Error in update avatar");

  // update avatar field in user metadata
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}?${Date.now()}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
