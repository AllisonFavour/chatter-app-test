import Link from "next/link";
import NavBar from "../(components)/NavBar";

export default function Blogs() {
  return (
    <>
      <div>
        <header>
          <NavBar />
        </header>

        <main>
          <div className="container mt-16 text-center">
            <h1 className="font-bold text-black mb-4">Blogs</h1>
            <Link
              href="/create-post"
              className="bg-violet-600 py-1 px-2 text-white"
            >
              Create blog post
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
