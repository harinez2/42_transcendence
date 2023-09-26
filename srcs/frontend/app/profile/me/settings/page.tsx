"use client";

import React, { useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";
import Link from "next/link";

export type ProfileType = { userId: string; bio: string };

export default function Profile() {
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
      <h1>User Settings (id: {profile.userId})</h1>
      <p>{profile.bio}</p>
      <h2>Work in progress...</h2>
      <ul>
        <li>
          <Link className="text-teal-200" href="settings/username">
            username
          </Link>
        </li>
        <li>
          <Link className="text-teal-200" href="settings/avatar">
            avatar
          </Link>
        </li>
        <li>
          <Link className="text-teal-200" href="settings/enable2fa">
            enable2fa
          </Link>
        </li>
      </ul>
    </>
  );
}
