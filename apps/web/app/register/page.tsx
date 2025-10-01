
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // If using NextAuth
import NavBar from "@/components/NavBar";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }

        // ---- Example: POST to your API ----
        // const res = await fetch("/api/register", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(form),
        // });
        // if (!res.ok) { alert("Registration failed"); }
        // else { window.location.href = "/"; }

        setLoading(false);
    }

    return (
        <main>
            <NavBar />
            <section className="mx-auto max-w-md px-4 py-16">
                <h1 className="text-3xl font-bold text-darkred">Register</h1>
                <p className="mt-2 text-neutral-700">
                    Create your account to get started.
                </p>

                {/* Social sign-up */}
                <div className="mt-8">
                    <div className="grid gap-3">
                        <button
                            type="button"
                            onClick={() => signIn?.("google")}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn?.("github")}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
                        >
                            <GitHubIcon />
                            Continue with GitHub
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn?.("facebook")}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400"
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

                {/* Registration form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-800">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="Your name"
                            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-800">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                            placeholder="you@example.com"
                            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-800">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={form.password}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, password: e.target.value }))
                                }
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-neutral-300 px-3 py-2 pr-11 text-sm shadow-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute inset-y-0 right-0 mr-2 grid place-items-center rounded-md px-2 text-xs text-neutral-600 hover:bg-neutral-100"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-800">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={form.confirmPassword}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, confirmPassword: e.target.value }))
                            }
                            placeholder="••••••••"
                            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-darkred px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkred/50 disabled:opacity-60"
                    >
                        {loading ? "Registering…" : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-neutral-700">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-darkred hover:underline">
                        Sign in
                    </a>
                </p>
            </section>
        </main>
    );
}

/* --- Simple inline icons --- */
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="18" height="18" viewBox="0 0 48 48" {...props}>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.9 2.3 30.5 0 24 0 14.7 0 6.7 5.3 2.7 13l7.9 6.1C12.3 13.2 17.6 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.8-.2-3.6-.6-5.2H24v9.9h12.4c-.5 2.7-2 5-4.2 6.5l6.5 5c3.8-3.5 6.1-8.6 6.1-16.2z"/>
            <path fill="#FBBC05" d="M10.6 28.9c-.7-2-1.1-4.1-1.1-6.4s.4-4.4 1.1-6.4l-7.9-6.1C.9 13 0 18.3 0 22.5c0 4.2.9 9.5 2.7 12.5l7.9-6.1z"/>
            <path fill="#34A853" d="M24 45c6.5 0 12-2.1 16-5.9l-6.5-5c-2 1.4-4.7 2.3-7.6 2.3-6.4 0-11.7-3.7-13.4-9l-7.9 6.1C6.7 42.7 14.7 45 24 45z"/>
        </svg>
    );
}
function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
            <path
                fill="currentColor"
                d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.6-4-1.6-.6-1.4-1.5-1.8-1.5-1.8-1.3-.9.1-.9.1-.9 1.4.1 2.1 1.5 2.1 1.5 1.2 2.1 3.2 1.5 4 .9.1-.9.5-1.5.8-1.8-2.7-.3-5.5-1.4-5.5-6.1 0-1.4.5-2.6 1.3-3.6-.1-.3-.6-1.7.1-3.6 0 0 1-.3 3.6 1.3a12.3 12.3 0 0 1 6.6 0c2.6-1.6 3.6-1.3 3.6-1.3.7 1.9.2 3.3.1 3.6.8 1 1.3 2.2 1.3 3.6 0 4.7-2.8 5.8-5.5 6.1.5.4.9 1.2.9 2.5v3.6c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"
            />
        </svg>
    );
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" {...props}>
            <path
                fill="currentColor"
                d="M22.7 12a10.7 10.7 0 1 0-12.4 10.6v-7.5H7.3V12h3.1V9.5c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.1h-2.9v7.5A10.7 10.7 0 0 0 22.7 12Z"
            />
        </svg>
    );
}

