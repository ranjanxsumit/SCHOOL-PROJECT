import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }

  try {
    const results = await query({
      query: `
        SELECT id, name, address, city, state, contact, image, email_id
        FROM schools
      `,
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error in getSchools API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
