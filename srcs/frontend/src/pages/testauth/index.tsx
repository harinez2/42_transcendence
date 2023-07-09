import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const fetchMe = () => {
    if (!session?.user.accessToken) {
      return;
    }
    try {
    const url = "https://api.intra.42.fr/v2/me";
      const headers = { Authorization: "Bearer " + session.user.accessToken };

      fetch(url, { headers })
        .then((res) => res.json())
        .then((json) => console.log(json));
    } catch (e) {
      console.log(e);
    }
  };

  return session ? (
    <>
      {JSON.stringify(session, null, "\t")}
      <button onClick={() => fetchMe()}>Fetch Me</button>
      <button onClick={() => signIn()}>Link Account</button>
      <button onClick={() => signOut()}>SignOut</button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>SignIn</button>
    </>
  );
}
