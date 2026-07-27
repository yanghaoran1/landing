import redis from '../../lib/redis';

export default async function handler(req, res) {
  if (req.headers['x-password'] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const keys = await redis.keys('pv:*');
  const result = [];
  for (const key of keys) {
    const page = key.replace('pv:', '');
    const views = await redis.get(key);
    result.push({ page, views: Number(views) });
  }
  res.status(200).json(result);
}