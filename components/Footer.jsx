import Link from "next/link";

export default function Header() {
    return <div className="flex gap-4 justify-center p-4 text-yellow underline bg-purple">
        <Link href="/contact">Contact</Link>
        <Link href="/legal">Legal Stuff</Link>
        <Link href="/about">About Us</Link>
    </div>
}