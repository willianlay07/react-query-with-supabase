import supabase, { supabaseUrl } from "../supabase";

export async function getStudents() {
  let { data, error } = await supabase.from("students").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createStudent(newStudent) {
  console.log(newStudent.image);

  const imageName = `${Math.random()}-${newStudent.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/student-images/${imageName}`;

  // 1. Create
  const { data, error } = await supabase
    .from("students")
    .insert([
      {
        ...newStudent,
        image: imagePath,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Student could not be created!");
  }

  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from("student-images")
    .upload(imageName, newStudent.image);

  // 3: Delete If anything wrong with image;
  if (storageError) {
    await supabase.from("students").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error(
      "Profile image could not uploaded and the student storage was not created."
    );
  }

  return data;
}

export async function deleteStudent(id) {
  const { data, error } = await supabase.from("students").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
