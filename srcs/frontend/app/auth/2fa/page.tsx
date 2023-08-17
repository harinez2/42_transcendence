import { Suspense } from "react";
import Form2fa from "./form2fa";

function Form2faFallback() {
  return <>placeholder</>;
}

export default function Page() {
  return (
    <>
      <h1>Login with 2FA</h1>
      <Suspense fallback={<Form2faFallback />}>
        <Form2fa />
      </Suspense>
    </>
  );
}
