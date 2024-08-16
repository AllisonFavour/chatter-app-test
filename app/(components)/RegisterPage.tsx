"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import registerImg from "../../public/assets/register.svg";
import HomeLogo from "./logo";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (res.ok) {
        // Registration successful, now sign in
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
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <HomeLogo />
      <div className="w-full py-12 md:py-24 lg:py-32 mt-10">
        <div className="container px-10 md:px-6">
          <div className="mx-auto flex justify-around">
            <div className="">
              <Image
                src={registerImg}
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
              <div className="px-4 mb-4">
                <h1 className="text-5xl mb-6 text-black font-bold mt-10">
                  Register
                </h1>
                <p className="text-base font-semibold text-gray-400">
                  Enter your details below to become a member
                </p>

                <div className="my-4">
                  <label htmlFor="firstName" className="font-bold">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="firstName"
                    placeholder="Enter your first name"
                    required
                    className="w-full border-b border-gray-400 outline-none py-1 px-4 text-violet-600"
                  />
                </div>

                <div className="my-4">
                  <label htmlFor="lastName" className="font-bold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lastName"
                    placeholder="Enter your last name"
                    required
                    className="w-full border-b border-gray-400  outline-none py-1 px-4 text-violet-600"
                  />
                </div>

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
                  Register
                </button>
              </div>

              {error && <div className="text-red-500 mt-4 px-4">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// 'use client'

// import { useState } from 'react'
// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/navigation'

// export default function Register() {
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setError(null)

//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ firstName, lastName, email, password }),
//       })

//       if (res.ok) {
//         // Registration successful, now sign in
//         const result = await signIn('credentials', {
//           redirect: false,
//           email,
//           password,
//         })

//         if (result?.error) {
//           setError(result.error)
//         } else {
//           router.push('/posts') // or wherever you want to redirect after login
//         }
//       } else {
//         const data = await res.json()
//         setError(data.message)
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//         placeholder="First Name"
//         required
//       />
//       <input
//         type="text"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//         placeholder="Last Name"
//         required
//       />
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
//       <button type="submit">Register</button>
//       {error && <p>{error}</p>}
//     </form>
//   )
// }

// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import registerImg from "../../public/assets/register.svg";
// // import HomeLogo from "./logo";

// // export default function RegisterPage() {
// //   const [firstName, setFirstName] = useState("");
// //   const [lastName, setLastName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");

// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     const res = await fetch("/api/auth/register", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ firstName, lastName, email, password }),
// //     });

// //     if (res.ok) {
// //       console.log("Registration successful, please sign in.");
// //       router.push("/login");
// //       console.log("redirecting to login page...");
// //     } else {
// //       console.log("Registration failed with status:", res.status);
// //       try {
// //         const error = await res.json();
// //         setErrorMessage(error.message || "Registration failed");
// //       } catch (err) {
// //         console.error("Failed to parse error response: ", err);
// //         setErrorMessage("Failed to parse error response");
// //       }
// //     }
// //   };

// //   return (
// //     <>
// //       <HomeLogo />
// //       <div className="w-full py-12 md:py-24 lg:py-32 mt-10">
// //         <div className="container px-10 md:px-6">
// //           <div className="mx-auto flex justify-around">
// //             <div className="">
// //               <Image
// //                 src={registerImg}
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
// //               <div className="px-4 mb-4">
// //                 <h1 className="text-5xl mb-6 text-black font-bold mt-10">
// //                   Register
// //                 </h1>
// //                 <p className="text-base font-semibold text-gray-400">
// //                   Enter your details below to become a member
// //                 </p>

// //                 <div className="my-4">
// //                   <label htmlFor="firstName" className="font-bold">
// //                     First Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="firstName"
// //                     value={firstName}
// //                     onChange={(e) => setFirstName(e.target.value)}
// //                     id="firstName"
// //                     placeholder="Enter your first name"
// //                     required
// //                     className="w-full border-b border-gray-400 outline-none py-1 px-4 text-violet-600"
// //                   />
// //                 </div>

// //                 <div className="my-4">
// //                   <label htmlFor="lastName" className="font-bold">
// //                     Last Name
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="lastName"
// //                     value={lastName}
// //                     onChange={(e) => setLastName(e.target.value)}
// //                     id="lastName"
// //                     placeholder="Enter your last name"
// //                     required
// //                     className="w-full border-b border-gray-400  outline-none py-1 px-4 text-violet-600"
// //                   />
// //                 </div>

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

// //                 <button
// //                   type="submit"
// //                   className="w-full bg-violet-600 text-white py-2 px-4 rounded-md active:bg-gray-400 my-8 font-bold"
// //                 >
// //                   Register
// //                 </button>
// //               </div>

// //               {errorMessage && (
// //                 <div className="text-red-500 mt-4">{errorMessage}</div>
// //               )}
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }
