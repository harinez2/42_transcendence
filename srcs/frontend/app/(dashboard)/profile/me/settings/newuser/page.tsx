"use client";

import React, { useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";
import Link from "next/link";
import Image from "next/image";
import { UserType } from "@/app/types";

export default function Profile() {
  const [profile, setProfile] = useState<UserType | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    makeAPIRequest<{ user: UserType }>("get", "auth/validate")
      .then((result) => {
        if (result.success) {
          setProfile(result.data.user);
          setError("");
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occured.");
      });
  }, []);

  return (
    <>
      <h1>Welcometo 42 Transcendence!</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      <p>Your profile is set automatically as follows:</p>
      {profile ? (
        <div className="m-2 flex items-end">
          <Image
            src={`/api/users/avatar/${profile.id}`}
            alt="User Avatar"
            width={50}
            height={50}
            priority
            className="rounded-full"
          />
          <p className="m-0 ml-1 text-4xl">{profile.username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <ul className="space-y-2">
        <li>
          <Link className="text-teal-200" href="username">
            Change username
          </Link>
        </li>
        <li>
          <Link className="text-teal-200" href="avatar">
            Change avatar
          </Link>
        </li>
        <li>
          <Link className="text-teal-200" href="./">
            Other settings
          </Link>
        </li>
      </ul>
      <Link
        href="/chat"
        className="rounded bg-gray-800 px-4 py-2 text-white no-underline hover:bg-gray-700 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Dive In!
      </Link>
    </>
  );
}
