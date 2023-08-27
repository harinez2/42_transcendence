export default async function Home() {
  return (
    <div className="flex min-h-full items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Welcome!</h1>
        <p className="text-gray-700">
          This page is intended to be viewable only when logged in.
        </p>
      </div>
    </div>
  );
}
