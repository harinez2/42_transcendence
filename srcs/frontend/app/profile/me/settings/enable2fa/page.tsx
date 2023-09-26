"use client";

import makeAPIRequest from "@/app/api/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import QRCode from "qrcode.react";
import Link from "next/link";

const OtpInput = dynamic(() => import("react-otp-input"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

type otpauth_data = { otpauth_url: string };

export default function Page() {
  const router = useRouter();
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const [error, setError] = useState("");
  const request2faUrl = () => {
    makeAPIRequest<otpauth_data>("get", "/auth/request2faurl")
      .then((result) => {
        if (result.success) {
          setOtpauthUrl(result.data.otpauth_url);
          setError("");
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occured.");
      });
  };

  const [otp, setOtp] = useState("");

  const clearOtp = () => {
    setOtp("");
  };

  const handleCodeSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    makeAPIRequest("post", "/auth/enable2fa", { code: otp })
      .then((result) => {
        if (result.success) {
          alert("2FA Authentication Successfully Enabled");
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
      <h1>Enable 2FA Authentication</h1>
      <div className="flex flex-col items-center">
        {otpauthUrl ? (
          <>
            <p>Scan this QR code with your 2FA app:</p>
            <QRCode value={otpauthUrl} />
            <form onSubmit={handleCodeSubmit2} className="m-8 max-w-[400px]">
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
              <div className="flex justify-end">
                <button
                  type="button"
                  className="m-2 rounded border p-1"
                  disabled={otp.trim() === ""}
                  onClick={clearOtp}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="m-2 rounded border p-1"
                  disabled={otp.length < 6}
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <button
            onClick={request2faUrl}
            className="rounded px-4 py-2 text-xl font-bold"
          >
            Show QR code
          </button>
        )}
        {error && <p className="text-red-600">Error: {error}</p>}
      </div>
    </>
  );
}
