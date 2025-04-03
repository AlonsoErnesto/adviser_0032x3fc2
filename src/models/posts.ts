import { createBrowserClient } from '../utils/supabase'

type Post = {
  id?: string
  title: string
  content: string
  user_id: string
  created_at?: string
  updated_at?: string
}

const supabase = createBrowserClient()

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

// export const getPostById = async (id: string): Promise<Post> => {
//   const { data, error } = await supabase
//     .from('posts')
//     .select('*')
//     .eq('id', id)
//     .single()

//   if (error) throw new Error(error.message)
//   return data
// }

// export const createPost = async (
//   post: Omit<Post, 'id' | 'created_at'>,
// ): Promise<Post> => {
//   const { data, error } = await supabase
//     .from('posts')
//     .insert(post)
//     .select()
//     .single()

//   if (error) throw new Error(error.message)
//   return data
// }

// export const updatePost = async (post: Post): Promise<Post> => {
//   const { data, error } = await supabase
//     .from('posts')
//     .update(post)
//     .eq('id', post.id)
//     .select()
//     .single()

//   if (error) throw new Error(error.message)
//   return data
// }

// export const deletePost = async (id: string): Promise<void> => {
//   const { error } = await supabase.from('posts').delete().eq('id', id)

//   if (error) throw new Error(error.message)
// }
