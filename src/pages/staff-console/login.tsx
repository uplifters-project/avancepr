import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ADMIN_BASE_PATH } from "@/lib/constants";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(1, "Password is required."),
});
type FormValues = z.infer<typeof schema>;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      // Goes through our own /api/admin/login (not straight to Supabase from
      // the browser) so it can sit behind an app-level attempt cap; see that
      // route for why. It sets the same auth cookies proxy.ts/getServerSideProps
      // read, just from the server side.
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast({
          title: res.status === 429 ? "Too many attempts" : "Sign in failed",
          description: body.detail ?? "Something went wrong.",
          variant: "destructive",
        });
        return;
      }

      const next =
        typeof router.query.next === "string" ? router.query.next : ADMIN_BASE_PATH;
      // Full navigation (not router.push) so proxy.ts and getServerSideProps
      // on the destination page see the freshly-set auth cookies.
      window.location.assign(next);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin sign in — Avance PR</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-sm rounded-lg border bg-background p-8 shadow-sm">
          <h1 className="mb-1 text-xl font-semibold">Avance PR admin</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in to manage site content.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

// If already signed in as the admin, skip the login form.
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createSupabaseServerClient(ctx.req, ctx.res);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (user?.email && adminEmails.includes(user.email.toLowerCase())) {
    const next =
      typeof ctx.query.next === "string" ? ctx.query.next : ADMIN_BASE_PATH;
    return { redirect: { destination: next, permanent: false } };
  }

  return { props: {} };
};

export default LoginPage;
