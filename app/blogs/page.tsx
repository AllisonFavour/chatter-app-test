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
          <div className="container mt-16">
            <h1 className="font-bold text-black ">Blogs</h1>
            <Link href='/create-post'>Create blog post</Link>
          </div>
        </main>
      </div>
    </>
  );
}
