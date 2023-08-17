"use client";

import React, { useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";

export type ProfileType = { userId: string; bio: string };

export default function Page() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    makeAPIRequest<ProfileType>("get", "/profiles")
      .then((result) => {
        if (result.success) {
          setProfile(result.data);
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occurred.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>UserID : {profile.userId}</h1>
      <p>{profile.bio}</p>
    </>
  );
}
