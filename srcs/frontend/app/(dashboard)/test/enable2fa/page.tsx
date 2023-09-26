"use client";

import makeAPIRequest from "@/app/api/api";
import React, { useState } from "react";
import QRCode from "qrcode.react";

type otpauth_data = { otpauth_url: string };

export default function Page() {
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

  const handleCodeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otpCode = (
      event.currentTarget.elements.namedItem("otpCode") as HTMLInputElement
    ).value;
    makeAPIRequest("post", "/auth/enable2fa", { code: otpCode })
      .then((result) => {
        if (result.success) {
          window.location.href = "/test/enable2fa/success";
        } else {
          setError(result.error);
        }
      })
      .catch(() => {
        setError("An unexpected error occured.");
      });
  };

  return (
    <div>
      <h1>Enable 2FA Authentication</h1>
      {otpauthUrl ? (
        <div>
          <p>Scan this QR code with your 2FA app:</p>
          <QRCode value={otpauthUrl} />
          <div>
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
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <button onClick={request2faUrl}>Show QR code</button>
      )}
      {error && <p>error: {error}</p>}
    </div>
  );
}
