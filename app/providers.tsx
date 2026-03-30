"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

function AuthRefreshHandler({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/login", redirect: true });
    }
  }, [session]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SessionProvider>
        <AuthRefreshHandler>{children}</AuthRefreshHandler>
      </SessionProvider>
    </QueryClientProvider>
  );
}
