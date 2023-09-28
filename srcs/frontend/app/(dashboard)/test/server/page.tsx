import makeAPIRequest from "@/app/api/api";

export type ProfileType = { userId: string; bio: string };

export default async function Page() {
  try {
    const result = await makeAPIRequest<ProfileType>("get", "/profiles");

    if (result.success) {
      const profile = result.data;
      return (
        <>
          <h1>UserID : {profile.userId}</h1>
          <p>{profile.bio}</p>
        </>
      );
    } else {
      return <p>{result.error}</p>;
    }
  } catch (e) {
    return <p>An unexpected error occured.</p>;
  }
}
