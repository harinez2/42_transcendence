"use client";

import React, { useEffect, useState } from "react";
import makeAPIRequest from "@/app/api/api";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserType } from "@/app/types";

export type AuthType = { staff: boolean; twoFactorAuthEnabled: boolean };

export default function Profile() {
  const [profile, setProfile] = useState<UserType | null>(null);
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [error, setError] = useState<string>("");

  const router = useRouter();

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

    makeAPIRequest<AuthType>("get", "auth/is2fa")
      .then((result) => {
        if (result.success) {
          setAuth(result.data);
          setError("");
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occured.");
      });
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      router.push("/");
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <>
      <Link href="/profile/me" className="cursor-pointer text-sm text-gray-200">
        Go Back
      </Link>
      <h1>Settings</h1>
      {error && <p className="text-red-600">Error: {error}</p>}
      <h2>Profile Settings</h2>
      {profile ? (
        <div className="m-2 flex items-end">
          <Image
            src={`/api/users/avatar/${profile.id}?stamp=${profile.updated}`}
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
          <Link className="text-teal-200" href="settings/username">
            Change username
          </Link>
        </li>
        <li>
          <Link className="text-teal-200" href="settings/avatar">
            Change avatar
          </Link>
        </li>
      </ul>
      <h2>Account Settings</h2>
      {auth ? (
        <>
          <p className="m-2">
            2FA Authentication:{" "}
            <span className="font-bold">
              {auth.twoFactorAuthEnabled ? "enabled" : "disabled"}
            </span>
            {auth.staff && (
              <span className="ml-1 text-sm text-orange-200">
                &#40;Staff cannot enable 2FA authentication&#41;
              </span>
            )}
          </p>
          <ul className="space-y-2">
            <li>
              <Link className="text-teal-200" href="settings/enable2fa">
                enable2fa
              </Link>
            </li>
            <li>
              <Link className="text-teal-200" href="settings/disable2fa">
                disable2fa
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button
        onClick={logout}
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Logout
      </button>
    </>
  );
}
