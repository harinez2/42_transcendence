"use client";

import { API_PATH } from "@/config";

const LoginButton = () => {
  const login = () => {
    window.location.href = `${API_PATH}/auth/42`;
  };

  return (
    <button
      onClick={login}
      className="inline-block rounded bg-black px-4 py-2 text-white"
    >
      Login with 42
    </button>
  );
};

export default LoginButton;
