"use client";

import React, { useState } from "react";
import makeAPIRequest from "@/app/api/api";
import { useSearchParams } from "next/navigation";

export default function TwoFactorAuthPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const userId = parseInt(searchParams.get("userId") || "", 10);

  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otpCode = (
      event.currentTarget.elements.namedItem("otpcode") as HTMLInputElement
    ).value;
    makeAPIRequest("post", "/auth/2fa", { userId: userId, code: otpCode })
      .then((result) => {
        if (result.success) {
          window.location.href = "/test";
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
      <h3 className="m-2.5 text-center font-serif text-xl text-white">Login via 2FA</h3>
      <form onSubmit={handleCodeSubmit} className="m-2 flex flex-col space-y-2">
        <fieldset className="flex flex-col space-y-2 border border-gray-500 p-2">
          <legend className="text-center text-gray-300">
            Authentication Details
          </legend>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="otpcode"
              name="otpcode"
              required
              title="Please enter a 6-digits OTP code."
              autoFocus
              pattern="[0-9]{6}"
              placeholder="OTP code"
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
