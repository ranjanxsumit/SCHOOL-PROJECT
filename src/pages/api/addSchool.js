import multer from 'multer';
import path from 'path';
import { query } from '../../lib/db';

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), 'public', 'schoolImages'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
});

// Middleware helper to run multer inside Next.js API routes
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // Disallow default body parsing for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  try {
    // Run multer middleware to handle single file
    await runMiddleware(req, res, upload.single('image'));

    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? `/schoolImages/${req.file.filename}` : '';

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await query({
      query: `
        INSERT INTO schools (name, address, city, state, contact, image, email_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      values: [name, address, city, state, contact, image, email_id],
    });

    // Build a message about image upload status
    const imageMessage = req.file
      ? `Image '${req.file.originalname}' uploaded successfully.`
      : 'No image uploaded.';

    return res.status(200).json({
      message: 'School added successfully!',
      imageStatus: imageMessage,
      imagePath: image || null,
    });
  } catch (error) {
    console.error('Error in addSchool API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
