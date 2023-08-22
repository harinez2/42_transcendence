"use client";

import { API_PATH } from "@/config";
import Link from "next/link";

const LoginButton = () => {
  const login = () => {
    window.location.href = `${API_PATH}/auth/42`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-5 text-center font-mono text-xl">ft_transcendence</div>
      <button
        onClick={login}
        className="my-3 inline-block rounded bg-black px-4 py-2 text-xl text-white"
      >
        Login with 42
      </button>
      <Link className="mb-5 mt-1 text-zinc-500 underline" href="/auth/staff">
        Login as Staff
      </Link>
    </div>
  );
};

export default LoginButton;
