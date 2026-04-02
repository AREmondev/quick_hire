"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { getErrorMessage, cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      try {
        const result = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      router.push("/jobs");
      router.refresh();
    },
    onError: (err: unknown) => {
      setError(getErrorMessage(err));
    },
  });

  const onSubmit = (data: LoginInput) => {
    setError("");
    mutation.mutate(data);
  };

  return (
    <main className="min-h-screen bg-light-gray pt-[78px]">
      <div className="container py-12 max-w-md mx-auto">
        <Text variant="h2" fontFamily="clash" className="text-neutral-100 mb-2">
          Sign In
        </Text>
        <Text className="text-neutral-60 mb-6">
          Access your account to apply and manage applications.
        </Text>
        {error ? (
          <div className="mb-4 border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-none">
            {error}
          </div>
        ) : null}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white border border-border p-6"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-80">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={cn(
                "w-full border border-border px-3 py-3 outline-none transition-colors focus:border-primary",
                errors.email && "border-red-500 focus:border-red-500",
              )}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-80">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={cn(
                  "w-full border border-border px-3 py-3 outline-none pr-10 transition-colors focus:border-primary",
                  errors.password && "border-red-500 focus:border-red-500",
                )}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-60 hover:text-neutral-100 transition-colors"
              >
                {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            isLoading={mutation.isPending}
            className="w-full"
          >
            Sign In
          </Button>
          <div className="text-center mt-4">
            <Text variant="body_sm" className="text-neutral-60">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-semibold hover:underline underline-offset-4"
              >
                Create Account
              </Link>
            </Text>
          </div>
        </form>
      </div>
    </main>
  );
}
