"use client";

import makeAPIRequest from "@/app/api/api";
import Image from "next/image";
import { useState, useEffect } from "react";
import AvatarUpload from "./upload";
import Link from "next/link";
import { UserType } from "@/app/types";

export default function AvatarSettingsPage() {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const fetchAvatar = async () => {
    try {
      const result = await makeAPIRequest<{ user: UserType }>(
        "get",
        "auth/validate",
      );
      if (!result.success) throw new Error(result.error);
      setAvatarSrc(
        `/api/users/avatar/${result.data.user.id}?stamp=${result.data.user.updated}`,
      );
    } catch (error) {
      console.error("There was an error fetching the avatar:", error);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <>
      <Link
        href="/profile/me/settings"
        className="cursor-pointer text-sm text-gray-200"
      >
        Go Back
      </Link>
      <h1 className="mb-4 text-2xl font-semibold">Avatar Setting</h1>
      <div className="flex flex-col items-center space-y-4">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={500}
            height={500}
            priority
            className="rounded"
          />
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
        <AvatarUpload onUpdate={fetchAvatar} />
        <p>
          The avatar image is subject to caching, leading to a delay in
          reflecting changes.
        </p>
      </div>
    </>
  );
}
