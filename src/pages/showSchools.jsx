import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/getSchools');
        const data = await res.json();
        if (res.ok) setSchools(data);
        else console.error(data.error || 'Failed to fetch schools');
      } catch (e) {
        console.error('Error fetching schools:', e);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Schools Directory</h1>
          <nav className="flex items-center gap-3">
            <Link href="/addSchool" className="text-sm text-blue-600 hover:underline">Add School</Link>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {schools.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-600">
            No schools yet. <Link href="/addSchool" className="text-blue-600 hover:underline">Add the first one</Link>.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((s) => (
              <article
                key={s.id ?? `${s.name}-${s.city}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Image wrapper: overflow hidden for clean zoom crop */}
                <div className="group relative overflow-hidden rounded-t-2xl">
                  <img
                    src={s.image || '/schoolImages/placeholder.jpg'}
                    alt={s.name}
                    loading="lazy"
                    className="w-full h-56 object-cover transform transition-transform duration-500 ease-out group-hover:scale-110 active:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{s.address}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                      {s.city}{s.state ? `, ${s.state}` : ''}
                    </span>
                    {s.email_id && (
                      <a
                        href={`mailto:${s.email_id}`}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        Email
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
