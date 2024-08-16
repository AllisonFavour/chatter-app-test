"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImg from "../../public/assets/login_svg.svg";
import HomeLogo from "./logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

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
  };

  return (
    <>
      <HomeLogo />
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
                  className="w-full bg-violet-600 text-white py-2 px-4 rounded-md active:bg-gray-400 my-8 font-bold"
                >
                  Login
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

// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);

//     const result = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (result?.error) {
//       setError(result.error);
//     } else {
//       router.push("/posts"); // or wherever you want to redirect after login
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         required
//       />
//       <button type="submit">Log in</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// }

// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import loginImg from "../../public/assets/login_svg.svg";
// // import HomeLogo from "./logo";

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     const res = await fetch("/api/auth/login", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ email, password }),
// //     });

// //     if (res.ok) {
// //       console.log("Login successful");
// //       router.push("/posts");
// //     } else {
// //       try {
// //         const error = await res.json();
// //         setErrorMessage(error.message || "Login failed. Try again!");
// //       } catch (err) {
// //         console.error("Failed to parse error response", err);
// //         setErrorMessage("Failed to parse error response");
// //       }
// //     }
// //   };

// //   return (
// //     <>
// //       <HomeLogo />
// //       <div className="w-full py-4 md:py-10 lg:py-16 mt-10 h-fit">
// //         <div className="container px-10 md:px-6">
// //           <div className="mx-auto flex justify-around flex-row-reverse">
// //             <div className="">
// //               <Image
// //                 src={loginImg}
// //                 alt="A surfer for the log in"
// //                 width={300}
// //                 height={500}
// //                 className="hidden sm:block"
// //               />
// //             </div>

// //             <form
// //               onSubmit={handleSubmit}
// //               action=""
// //               className="w-full max-w-sm border rounded-md shadow-[-3px_3px_0px_#7c3aed]"
// //             >
// //               <div className="px-4 mt-12">
// //                 <h1 className="text-5xl mb-10 text-black font-bold mt-6">
// //                   Login
// //                 </h1>
// //                 <p className="text-base font-semibold text-gray-400 mb-6">
// //                   Enter your details below to become a member
// //                 </p>

// //                 <div className="flex flex-col my-4">
// //                   <label htmlFor="email" className="font-bold">
// //                     Email
// //                   </label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     id="email"
// //                     placeholder="Enter your email"
// //                     required
// //                     className="w-full border-b border-gray-400 outline-none py-1 px-4 text-violet-600"
// //                   />
// //                 </div>

// //                 <div className="flex flex-col">
// //                   <label htmlFor="password" className="font-bold">
// //                     Password
// //                   </label>
// //                   <input
// //                     type="password"
// //                     name="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     id="password"
// //                     placeholder="Enter your password"
// //                     required
// //                     className="w-full border-b border-gray-400 outline-none py-1 px-4 text-violet-600"
// //                   />
// //                 </div>

// //                 <button className="w-full bg-violet-600 text-white py-2 px-4 rounded-md active:bg-gray-400 my-8 font-bold">
// //                   Login
// //                 </button>
// //               </div>

// //               {errorMessage && <div>{errorMessage}</div>}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }
