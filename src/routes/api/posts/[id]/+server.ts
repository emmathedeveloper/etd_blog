import cloudinary from '$lib/server/cloudinary';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { UploadApiResponse } from 'cloudinary';
import { eq } from 'drizzle-orm';

export async function PATCH({ params, request }) {
	const formData = await request.formData();

	let { poster , ...data } = Object.fromEntries(formData) as Record<string , string>;

	//Create Buffer

	try {
		let result: UploadApiResponse | undefined;

		if (poster) {
			const buffer = Buffer.from(await (poster as any).arrayBuffer());

			//Upload file to cloudinary
			result = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{
							folder: 'etd_blog',
							resource_type: 'auto',
							chunk_size: 6_000_000
						},
						(error, result) => {
							if (error) reject(error);
							else resolve(result);
						}
					)
					.end(buffer);
			});

			if (!result) {
				return json({ success: false, message: 'Upload failed' }, { status: 500 });
      }
    }
		
    data = result ? { ...data , poster: result.url } : data

		//Create post
		const [post] = await db
			.update(posts)
			.set({
        ...data,
      })
			.where(eq(posts.id , params.id))
			.returning();

		return json({
			success: true,
			message: 'Post created successfully',
			data: post
		});
	} catch (error) {
		console.error(error);
		return json({ success: false, message: 'Upload failed' }, { status: 500 });
	}
}
