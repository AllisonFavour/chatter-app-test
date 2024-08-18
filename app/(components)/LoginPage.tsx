"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImg from "../../public/assets/login_svg.svg";
import HomeLogo from "./HomeLogo";
import LoadingSpinner from "./LoadingSpinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/posts"); // or wherever you want to redirect after login
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <HomeLogo /> */}
      <div className="w-full py-4 md:py-10 lg:py-16 mt-10 h-fit">
        <div className="container px-10 md:px-6">
          <div className="mx-auto flex justify-around flex-row-reverse">
            <div className="">
              <Image
                src={loginImg}
                alt="A surfer for the log in"
                width={300}
                height={500}
                className="hidden sm:block"
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm border rounded-md shadow-[-3px_3px_0px_#7c3aed]"
            >
              <div className="px-4 mt-12">
                <h1 className="text-5xl mb-10 text-black font-bold mt-6">
                  Login
                </h1>
                <p className="text-base font-semibold text-gray-400 mb-6">
                  Enter your details below to become a member
                </p>

                <div className="flex flex-col my-4">
                  <label htmlFor="email" className="font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    placeholder="Enter your email"
                    required
                    className="w-full border-b border-gray-400 outline-none py-1 px-4 text-violet-600"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Enter your password"
                    required
                    className="w-full border-b border-gray-400 outline-none py-1 px-4 text-violet-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-violet-600 text-white py-2 px-4 rounded-md active:bg-gray-400 my-8 font-bold flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : "Login"}
                </button>
              </div>

              {error && <div className="px-4 text-red-500 mb-4">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
