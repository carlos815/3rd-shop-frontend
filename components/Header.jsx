import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return <header className="bg-purple-dark ">
        <div className="flex justify-between p-3 ">
            <Image src="/hamburger.svg" width={30} height={30} />
            <Link href={"/"}>
                <Image src="/3rd-Shop.svg" width={76} height={37.26} />
            </Link>
            <div className="flex items-center gap-2 ">
                <Image src="/cart.svg" width={24} height={24} />
                <p className="font-bold text-base tabular-nums text-purple-dark   bg-yellow rounded-full w-7 h-7 flex items-center justify-center">12</p>
            </div>
        </div></header>
}