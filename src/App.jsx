import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    async function fetchProfile() {
      try {
        const res = await axios.get('/.netlify/functions/get-profile');
        if (res.data && !res.data.error) setProfile(res.data);
      } catch(e) {
        // no session
      } finally { setLoading(false); }
    }
    fetchProfile();
  },[]);

  function startLogin() {
    window.location.href = '/.netlify/functions/oauth-start';
  }

  async function logout() {
    await axios.post('/.netlify/functions/logout');
    window.location.href = '/';
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">PlusCurriculo — Account</h1>
      {!profile ? (
        <div>
          <p className="mb-4">Você não está logado.</p>
          <button onClick={startLogin} className="px-4 py-2 bg-blue-600 text-white rounded">Entrar com Google</button>
        </div>
      ) : (
        <div className="inline-block bg-white p-6 rounded shadow text-left">
          <div className="flex items-center gap-4">
            {profile.avatar_url && <img src={profile.avatar_url} alt="avatar" className="w-16 h-16 rounded-full" />}
            <div>
              <p className="font-semibold">{profile.full_name || profile.email}</p>
              <p className="text-sm">{profile.email}</p>
              <p className="text-xs text-gray-500">Criado em: {profile.inserted_at || '—'}</p>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Sair</button>
          </div>
        </div>
      )}
    </div>
  )
}
