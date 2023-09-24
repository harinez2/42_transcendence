"use client";

import makeAPIRequest from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const result = await makeAPIRequest<{ user: { id: number } }>(
          "get",
          "auth/validate",
        );
        if (!result.success) throw new Error(result.error);
        setAvatarSrc(`/api/users/avatar/${result.data.user.id}`);
      } catch (error) {
        console.error("There was an error fetching the avatar:", error);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {avatarSrc && (
        <Image
          src={avatarSrc}
          alt="User Avatar"
          width={500}
          height={500}
          priority
        />
      )}
      <Link href="https://nextjs.org/docs/app/building-your-application/optimizing/images">
        Next.js Image
      </Link>
    </div>
  );
};

export default ProfilePage;
