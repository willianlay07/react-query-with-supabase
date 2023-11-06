import supabase from "../supabase";

export async function getPersonal() {
  let { data, error } = await supabase.from("personal").select("*");

  if (error) {
    console.log(error);
    throw new Error("Unable to load Personal!");
  }

  return data;
}

export async function deletePersonal(id) {
  const { data, error } = await supabase.from("personal").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Unable to load Personal!");
  }

  return data;
}
