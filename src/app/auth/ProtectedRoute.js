import { useUser } from "@clerk/clerk-react";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    redirect(`/sign-in`);
  }
  return <>{children}</>;
}
