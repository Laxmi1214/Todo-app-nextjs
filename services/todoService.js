import supabase from "@/lib/supabase";

export async function getTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addTodo(title) {
  const { data, error } = await supabase
    .from("todos")
    .insert([
      {
        title,
        completed: false,
      },
    ])
    .select();

  if (error) throw error;

  return data[0];
}

export async function updateTodo(id, updates) {
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data[0];
}

export async function deleteTodo(id) {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw error;
}
