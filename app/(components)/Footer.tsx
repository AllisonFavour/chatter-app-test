import Image from "next/image";
import loveIcon from "../../public/assets/purple_love.png";

export default function Footer() {
  return (
    <>
      <footer className="w-full mx-auto text-center border-t border-t-violet-900 p-6">
        <p className="text-black text-1xl flex justify-center items-center">
          Built with{" "}
          <span className="mx-2">
            <Image src={loveIcon} alt="Purple love" width={20} />
          </span>{" "}
          by Trillest. &copy; 2024
        </p>
      </footer>
    </>
  );
}
