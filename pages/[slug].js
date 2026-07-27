import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// 集中注册所有配置（后续可改为动态 import 全自动）
const configs = {
  'demo': require('../config/demo').default,
  'demoa': require('../config/demoa').default,
};

export default function LandingPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [views, setViews] = useState(null);
  const config = configs[slug];

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/counter?page=${slug}`)
      .then(res => res.json())
      .then(data => setViews(data.views))
      .catch(console.error);
  }, [slug]);

  if (!config) return <div>页面不存在</div>;

  return (
    <div style={{ '--theme': config.themeColor }}>
      <img src={config.bannerImage} alt={config.title} />
      <h1>{config.title}</h1>
      <p>{config.description}</p>
      <a href={config.ctaLink} className="cta">{config.ctaText}</a>
      {views !== null && (
        <div className="counter">已有 {views} 人访问</div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Object.keys(configs).map(slug => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps() {
  return { props: {} };
}