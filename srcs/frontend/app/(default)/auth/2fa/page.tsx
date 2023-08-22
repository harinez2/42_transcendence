"use client";

import React, { useState } from "react";
import makeAPIRequest from "@/app/api/api";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const OtpInput = dynamic(() => import("react-otp-input"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function TwoFactorAuthPage() {
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const userId = parseInt(searchParams.get("userId") || "", 10);

  const clearOtp = () => {
    setOtp("");
  };

  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    makeAPIRequest("post", "/auth/2fa", { userId: userId, code: otp })
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
      <h3 className="m-2.5 text-center font-serif text-xl text-white">
        Login via 2FA
      </h3>
      <form onSubmit={handleCodeSubmit} className="m-2 flex flex-col space-y-2">
        <fieldset className="flex flex-col space-y-2 border border-gray-500 p-2">
          <legend className="text-center text-gray-300">
            Authentication Details
          </legend>
          <div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType="number"
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus
              containerStyle={"flex justify-between"}
              inputStyle={
                "m-2 rounded text-4xl text-black font-semibold no-spin"
              }
            />
          </div>
        </fieldset>
        <div className="flex justify-between">
          <button
            type="button"
            className="rounded border border-gray-600 bg-gray-700 p-1 hover:bg-gray-600"
            disabled={otp.trim() === ""}
            onClick={clearOtp}
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded border border-gray-600 bg-gray-700 p-1 hover:bg-gray-600"
            disabled={otp.length < 6}
          >
            Submit
          </button>
        </div>
        {error && <p className="my-0 text-red-600">Error: {error}</p>}
      </form>
    </>
  );
}
