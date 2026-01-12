// import { db } from "$lib/server/db"
// import { error } from "@sveltejs/kit";





// export const load = async ({ params }) => {
  
//   const post = await db.query.posts.findFirst({
//     where: (t , { eq }) => eq(t.id , params.id)
//   })
  
//   if(!post) {
//       throw error(404, 'Post not found');
//   }
  
//   return {  }
// }