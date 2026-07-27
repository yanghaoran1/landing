import redis from '../../lib/redis';

export default async function handler(req, res) {
  const page = req.query.page;
  if (!page) return res.status(400).json({ error: 'Missing page' });

  try {
    const views = await redis.incr(`pv:${page}`);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ views });
  } catch (error) {
    res.status(500).json({ error: 'Counter failed' });
  }
}