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
      event.currentTarget.elements.namedItem("otpCode") as HTMLInputElement
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
      <h3>Enter your 2FA code</h3>
      <form onSubmit={handleCodeSubmit}>
        <label htmlFor="code">OTP Code: </label>
        <input
          type="text"
          id="code"
          name="otpCode"
          required
          pattern="[0-9]{6}"
          title="Please enter a 6-digit OTP code."
          autoFocus
        />
        {error && <p>error: {error}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
