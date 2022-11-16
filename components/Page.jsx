import Image from "next/image";
import Link from "next/link";

export default function Page({ children }) {
    return <main className="bg-purple  justify-center flex flex-col ">
        {children}
    </main>
}