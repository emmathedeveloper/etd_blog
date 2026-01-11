import cloudinary from "$lib/server/cloudinary";
import { json } from "@sveltejs/kit";
import type { UploadApiResponse } from "cloudinary";

export async function POST({ request }) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return json({ error: "No file provided" }, { status: 400 });
  }

  // File → Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
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
      return json({ error: "Upload failed" }, { status: 500 });
    }

    return json(result);
  } catch (error) {
    console.error(error);
    return json({ error: "Upload failed" }, { status: 500 });
  }
}
