import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Can not get the Cabins data from the server!");
  }

  return data;
}

async function addEditCabin(cabinObj, id) {
  console.log(cabinObj, id);
  // https://cmoxpfjkkshjglabxetr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImagePath = cabinObj.image.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabinObj.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? cabinObj.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // B) Create
  if (!id) query = query.insert([{ ...cabinObj, image: imagePath }]);

  // A) Edit
  if (id) query = query.update({ ...cabinObj, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Failed to ${id ? "edit" : "add new"} Cabin`);
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinObj.image);

  // 3. Delete Cabin if the image could not be uploaded
  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error("Cabin could not be added as image could not be uploaded");
  }

  return data;
}

async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete Cabin");
  }
}

export { getCabins, deleteCabin, addEditCabin };
