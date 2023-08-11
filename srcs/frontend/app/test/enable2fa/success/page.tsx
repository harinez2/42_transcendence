import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <h1>2FA authentication successfully enabled.</h1>
      <Link href="/test">Back to main page</Link>
    </div>
  );
}
