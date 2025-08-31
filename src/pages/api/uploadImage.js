import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

import { query } from '../../lib/db'; // adjust if your db.js path is different

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Image upload failed.' });

    const file = files.image;
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'schoolImages',
    });

    const imageUrl = result.secure_url;

    await query({
      query: `
        INSERT INTO schools (name, address, city, state, contact, image, email_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      values: [
        fields.name,
        fields.address,
        fields.city,
        fields.state,
        fields.contact,
        imageUrl,
        fields.email_id,
      ],
    });

    res.status(200).json({
      message: 'School added successfully!',
      imageStatus: `Image uploaded to Cloudinary.`,
      imageUrl,
    });
  });
}
