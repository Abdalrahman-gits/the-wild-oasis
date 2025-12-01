import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cmoxpfjkkshjglabxetr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtb3hwZmpra3NoamdsYWJ4ZXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTQ4NTcsImV4cCI6MjA3NzE3MDg1N30.AT-nV8Xt4DPu1PlDt3TgKF1vDMfiDSCs1frqRDv_PSw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
