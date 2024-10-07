import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-background/40 backdrop-blur w-full">
      <nav className="max-w-3xl mx-auto border-b flex items-center justify-between px-4 py-2">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <Link href="/">Next Chat</Link>
        </h1>
        <Button className="font-bold">
          <Link href="/u/signup">Login / Sign Up</Link>
        </Button>
      </nav>
    </header>
  );
}
