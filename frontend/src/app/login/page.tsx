"use client";

import { useState } from "react";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { AuthShell } from "@/components/shells/auth-shell";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <AuthShell mode={showSignIn ? "signin" : "signup"}>
      {showSignIn ? (
        <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
      ) : (
        <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
      )}
    </AuthShell>
  );
}
