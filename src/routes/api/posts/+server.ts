import cloudinary from "$lib/server/cloudinary";
import { db } from "$lib/server/db/index.js";
import { posts } from "$lib/server/db/schema.js";
import { json } from "@sveltejs/kit";
import type { UploadApiResponse } from "cloudinary";

export async function POST({ request }) {
  const formData = await request.formData();
  const poster = formData.get("poster") as File;
  const content = formData.get("content") as string;
  const title = formData.get("title") as string;

  //Validate file
  if (!poster || poster.size === 0) {
    return json({ success: false, message: "No file provided" }, { status: 400 });
  }
  
  //Validate content
  if (!content || content.length === 0) {
    return json({ success: false, message: "No content provided" }, { status: 400 });
  }
  
  //Validate title
  if (!title || title.length === 0) {
    return json({ success: false, message: "No title provided" }, { status: 400 });
  }
  
  //Create Buffer
  const buffer = Buffer.from(await poster.arrayBuffer());

  try {
    
    //Upload file to cloudinary
    const result = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "etd_blog",
          resource_type: "auto",
          chunk_size: 6_000_000
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    
    if(!result) {
      return json({ success: false, message: "Upload failed" }, { status: 500 });
    }
    
    //Create post
    const [post] = await db.insert(posts).values({
      title,
      content,
      poster: result.url,
    }).returning();

    return json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
    return json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}
