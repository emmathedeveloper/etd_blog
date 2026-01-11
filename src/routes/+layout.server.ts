import { db } from "$lib/server/db"




export const load = async () => {
  
  const posts = await db.query.posts.findMany({
    orderBy: (t , { desc }) => desc(t.createdAt)
  })
  
  return { posts }
}