import Redis from 'ioredis';

const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: { rejectUnauthorized: false }
});

export default redis;