import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
      <h1 className="text-4xl font-bold">Welcome to the School Directory</h1>
      <p className="text-gray-600 text-center max-w-md">
        Use this mini app to add new schools and browse the ones already in our database.
      </p>
      <div className="flex space-x-4">
        <Link href="/addSchool">
          <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
            Add a School
          </span>
        </Link>
        <Link href="/showSchools">
          <span className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
            View Schools
          </span>
        </Link>
      </div>
    </div>
  );
}
