import Link from "next/link";

export default function HomeLogo() {
  return (
    <>
      <nav className="bg-white shadow-[-1px_-10px_20px_#7c3aed] fixed w-full z-10 top-0">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="font-bold text-violet-600 text-2xl">
            <Link href="/">Chatter📚</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
