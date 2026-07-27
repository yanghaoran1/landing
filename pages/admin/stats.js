import { useState } from 'react';

export default function Stats() {
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    const res = await fetch('/api/admin/stats', {
      headers: { 'x-password': password }
    });
    if (res.ok) {
      setStats(await res.json());
      setAuthorized(true);
    } else {
      alert('密码错误');
    }
  };

  if (!authorized) {
    return (
      <div>
        <input type="password" value={password}
          onChange={e => setPassword(e.target.value)} placeholder="管理密码" />
        <button onClick={fetchStats}>查看统计</button>
      </div>
    );
  }

  return (
    <table>
      <thead><tr><th>页面</th><th>访问量</th></tr></thead>
      <tbody>
        {stats.map(s => (
          <tr key={s.page}><td>{s.page}</td><td>{s.views}</td></tr>
        ))}
      </tbody>
    </table>
  );
}