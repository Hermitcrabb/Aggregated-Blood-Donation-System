
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // If not using NextAuth, remove this import.
import NavBar from "@/components/NavBar";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "", remember: true });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        // ---- Option A: NextAuth/Auth.js credentials provider ----
        // const res = await signIn("credentials", {
        //   redirect: false,
        //   email: form.email,
        //   password: form.password,
        // });
        // setLoading(false);
        // if (res?.error) {
        //   alert(res.error);
        // } else {
        //   window.location.href = "/"; // or router.push
        // }

        // ---- Option B: Your own API endpoint ----
        // const res = await fetch("/api/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(form),
        // });
        // setLoading(false);
        // if (!res.ok) { alert("Login failed"); return; }
        // window.location.href = "/";

        setLoading(false);
    }

    return (
        <main>
            <NavBar />
            <section className="mx-auto max-w-md px-4 py-16">
                <h1 className="text-3xl font-bold text-darkred">Login</h1>
                <p className="mt-2 text-neutral-700">
                    Welcome back! Please sign in to continue.
                </p>

                {/* Social sign-in */}
                <div className="mt-8">
                    <div className="grid gap-3">
                        <button
                            type="button"
                            onClick={() => signIn?.("google")} // replace if not using NextAuth
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
                            aria-label="Sign in with Google"
                        >
                            {/* Google "G" */}
                            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.9 2.3 30.5 0 24 0 14.7 0 6.7 5.3 2.7 13l7.9 6.1C12.3 13.2 17.6 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.1 24.5c0-1.8-.2-3.6-.6-5.2H24v9.9h12.4c-.5 2.7-2 5-4.2 6.5l6.5 5c3.8-3.5 6.1-8.6 6.1-16.2z"/>
                                <path fill="#FBBC05" d="M10.6 28.9c-.7-2-1.1-4.1-1.1-6.4s.4-4.4 1.1-6.4l-7.9-6.1C.9 13 0 18.3 0 22.5c0 4.2.9 9.5 2.7 12.5l7.9-6.1z"/>
                                <path fill="#34A853" d="M24 45c6.5 0 12-2.1 16-5.9l-6.5-5c-2 1.4-4.7 2.3-7.6 2.3-6.4 0-11.7-3.7-13.4-9l-7.9 6.1C6.7 42.7 14.7 45 24 45z"/>
                            </svg>
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            onClick={() => signIn?.("github")}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
                            aria-label="Sign in with GitHub"
                        >
                            <GitHubIcon />
                            Continue with GitHub
                        </button>

                        <button
                            type="button"
                            onClick={() => signIn?.("facebook")}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
                            aria-label="Sign in with Facebook"
                        >
                            <FacebookIcon />
                            Continue with Facebook
                        </button>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-neutral-200" />
                        <span className="text-xs text-neutral-500">or</span>
                        <div className="h-px flex-1 bg-neutral-200" />
                    </div>
                </div>

                {/* Email/password form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-800">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={form.password}
                                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                className="w-full rounded-lg border border-neutral-300 px-3 py-2 pr-11 text-sm shadow-sm focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute inset-y-0 right-0 mr-2 grid place-items-center rounded-md px-2 text-xs text-neutral-600 hover:bg-neutral-100"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                            <input
                                type="checkbox"
                                checked={form.remember}
                                onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
                                className="h-4 w-4 rounded border-neutral-300 text-darkred focus:ring-neutral-300"
                            />
                            Remember me
                        </label>
                        <a href="/forgot-password" className="text-sm font-medium text-darkred hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-darkred px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkred/50 disabled:opacity-60"
                    >
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-neutral-700">
                    Don’t have an account?{" "}
                    <a href="/register" className="font-medium text-darkred hover:underline">
                        Create one
                    </a>
                </p>
            </section>
        </main>
    );
}

/* --- Simple inline icons (no external deps) --- */
function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
            <path
                fill="currentColor"
                d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6-.6-1.4-1.5-1.8-1.5-1.8-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.5 2.1 1.5 1.2 2.1 3.2 1.5 4 .9.1-.9.5-1.5.8-1.8-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.6 1.3-3.6-.1-.3-.6-1.7.1-3.6 0 0 1-.3 3.6 1.3a12.3 12.3 0 0 1 6.6 0c2.6-1.6 3.6-1.3 3.6-1.3.7 1.9.2 3.3.1 3.6.8 1 1.3 2.2 1.3 3.6 0 4.7-2.8 5.8-5.5 6.1.5.4.9 1.2.9 2.5v3.6c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
            />
        </svg>
    );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
            <path
                fill="currentColor"
                d="M22.7 12a10.7 10.7 0 1 0-12.4 10.6v-7.5H7.3V12h3.1V9.5c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.1h-2.9v7.5A10.7 10.7 0 0 0 22.7 12Z"
            />
        </svg>
    );
}

