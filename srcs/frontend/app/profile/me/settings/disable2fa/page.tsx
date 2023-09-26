"use client";

import makeAPIRequest from "@/app/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AvatarSettingsPage() {
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const disable2fa = async () => {
    makeAPIRequest("post", "/auth/disable2fa")
      .then((result) => {
        if (result.success) {
          alert("2FA Authentication Successfully Disabled");
          router.push("/profile/me/settings");
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occured.");
      });
  };

  return (
    <>
      <Link
        href="/profile/me/settings"
        className="cursor-pointer text-sm text-gray-200"
      >
        Go Back
      </Link>
      <h1 className="mb-6 text-2xl font-semibold">
        Disable 2FA Authentication
      </h1>
      <button
        onClick={disable2fa}
        className="rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Disable
      </button>
      {error && <p className="text-red-600">Error: {error}</p>}
    </>
  );
}
