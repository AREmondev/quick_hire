"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { register } from "@/lib/api/auth";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      await register(email, password, name, "candidate");
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    },
    onSuccess: () => {
      router.push("/jobs");
      router.refresh();
    },
    onError: (e: unknown) => {
      const msg = e instanceof Error ? e.message : "Registration failed";
      setError(msg);
    },
  });

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      <div className="container py-12 max-w-md mx-auto">
        <Text variant="h2" fontFamily="clash" className="text-neutral-100 mb-2">Create Account</Text>
        <Text className="text-neutral-60 mb-6">Register to save and track your applications.</Text>
        {error ? (
          <div className="mb-4 border border-red-200 bg-red-50 text-red-700 px-4 py-3">{error}</div>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            mutation.mutate();
          }}
          className="space-y-4 bg-white border border-border p-6"
        >
          <div className="space-y-2">
            <label className="text-sm text-neutral-80">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-border px-3 py-3 outline-none"
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-80">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border px-3 py-3 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-neutral-80">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border px-3 py-3 outline-none"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </main>
  );
}

