import Image from "next/image";
import journalManImg from "../../public/assets/journal-man.png";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container mx-auto pt-12">
          <div>
            <div className="container mx-auto my-20 px-6 lg:mx-10 flex justify-between items-center gap-20 flex-col sm:flex-row sm:items-center sm:justify-center">
              <div className="w-full mx-auto">
                <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl mb-10 text-black">
                  Connect, Engage, and Grow with{" "}
                  <span className=" text-violet-600">Chatter</span>
                </h1>
                <p className="text-gray-400 text-xl">
                  Chatter is the ultimate blogging platform that empowers you to
                  share your thoughts, connect with like-minded individuals, and
                  grow your online presence.
                </p>
                <div className="my-10">
                  <Link href="/register">
                    <button className="bg-violet-600 text-white py-2 px-4 rounded-md">
                      Become a member
                    </button>
                  </Link>

                  <span className="mx-6 text-violet-600 font-bold text-2xl">
                    OR
                  </span>

                  <Link href="/login">
                    <button className="bg-violet-600 text-white py-2 px-4 rounded-md">
                      Log In
                    </button>
                  </Link>
                </div>
              </div>

              <div className="w-full mx-auto">
                <Image src={journalManImg} alt="journaling man illustration" />
              </div>
            </div>

            <section>
              <div className="container w-full grid grid-cols-1 gap-4 gap-y-10 md:grid-cols-3 py-40 bg-black text-white">
                <div className="text-center max-w-md mx-auto px-6">
                  <h3 className="text-3xl font-semibold mb-4">
                    Powerful Blogging
                  </h3>
                  <p className="text-gray-400">
                    Chatter provides a seamless blogging experience with
                    intuitive tools to help you create and publish engaging
                    content.
                  </p>
                </div>

                <div className="text-center max-w-md mx-auto px-6">
                  <h3 className="text-3xl font-semibold mb-4">
                    Community Building
                  </h3>
                  <p className="text-gray-400">
                    Build a loyal following and foster meaningful connections
                    with your readers through Chatter&lsquo;s powerful community
                    features.
                  </p>
                </div>

                <div className="text-center max-w-md mx-auto px-6">
                  <h3 className="text-3xl font-semibold mb-4">
                    Insightful Analytics
                  </h3>
                  <p className="text-gray-400">
                    Gain valuable insights into your content performance and
                    audience engagement with Chatter&lsquo;s comprehensive
                    analytics tools.
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
              <div className="container px-10 md:px-6">
                <div className="mx-auto max-w-md space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-violet-600">
                    Stay up-to-date with our newsletter
                  </h2>
                  <p className="text-muted-foreground md:text-xl text-gray-400">
                    Subscribe to our newsletter and be the first to know about
                    our latest features, updates, and blog posts.
                  </p>

                  <form className="flex gap-2">
                    <input
                      type="email"
                      name="subscribe"
                      id=""
                      placeholder="Enter your email"
                      className="max-w-lg py-2 px-4 flex-1 border border-gray-400 rounded-md text-gray-400 focus:border-violet-600 focus:text-violet-600"
                    />
                    <button
                      type="submit"
                      className="bg-violet-600 rounded-md text-white py-2 px-4"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
