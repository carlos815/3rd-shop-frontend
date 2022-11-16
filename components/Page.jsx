import Image from "next/image";
import Link from "next/link";

export default function Page({ children }) {
    return <main className="bg-purple flex justify-center">
        <div className="max-w-6xl">
            {children}
        </div>
    </main>
}