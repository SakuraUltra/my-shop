import SignInContent from "@/components/auth/SignInContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return <SignInContent />;
}
