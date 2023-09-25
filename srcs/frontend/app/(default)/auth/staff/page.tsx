"use client";

import React, { useState } from "react";
import makeAPIRequest from "@/app/api/api";
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    makeAPIRequest("post", "/auth/staff", { username, password })
      .then((result) => {
        if (result.success) {
          router.push("/chat");
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
      <h3 className="m-2.5 text-center font-serif text-xl text-white">
        Login as Staff
      </h3>
      <form onSubmit={handleCodeSubmit} className="m-2 flex flex-col space-y-2">
        <fieldset className="flex flex-col space-y-2 border border-gray-500 p-2">
          <legend className="text-center text-gray-300">
            Authentication Details
          </legend>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="username"
              name="username"
              required
              title="Please enter a username."
              autoFocus
              placeholder="Username"
              className="grow rounded border border-gray-600 bg-gray-800 p-2"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="password"
              id="password"
              name="password"
              required
              title="Please enter a password."
              placeholder="Password"
              className="grow rounded border border-gray-600 bg-gray-800 p-2"
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className="rounded border border-gray-600 bg-gray-700 p-1 hover:bg-gray-600"
        >
          Submit
        </button>
        {error && <p className="my-0 text-red-600">Error: {error}</p>}
      </form>
    </>
  );
}
