"use client";

import makeAPIRequest from "@/app/api/api";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function AvatarSettingsPage() {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    makeAPIRequest<{ user: { username: string } }>("get", "auth/validate")
      .then((result) => {
        if (result.success) {
          setUsername(result.data.user.username);
          setError("");
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occured.");
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const newUsername = (
      form.elements.namedItem("newUsername") as HTMLInputElement
    ).value;

    makeAPIRequest("post", "auth/username", {
      username: newUsername,
    })
      .then((result) => {
        if (result.success) {
          alert("Username successfully updated");
          setUsername(newUsername);
          setError("");
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
      <h1 className="mb-6 text-2xl font-semibold">Username Setting</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex items-center">
          <label htmlFor="newUsername" className="mr-2 text-xl font-bold">
            New Username :
          </label>
          <input
            type="text"
            id="newUsername"
            name="newUsername"
            placeholder={username}
            className="mr-2 grow rounded-md border p-2 text-xl shadow-sm"
          />
          <input
            type="submit"
            value="Submit"
            className="rounded-md bg-blue-500 p-2 font-bold text-white"
          />
        </div>
        {error && <p className="text-red-600">Error: {error}</p>}
      </form>
    </>
  );
}
