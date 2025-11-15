import { useUser } from "@clerk/clerk-react";
import { redirect } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return <LoadingComponent />;
  }
  if (!isSignedIn) {
    redirect(`/sign-in`);
  }
  return <>{children}</>;
}
