import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to User Management</h1>
      <Link
        href="/users/1"
        className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        View Users
      </Link>
    </div>
  );
}
