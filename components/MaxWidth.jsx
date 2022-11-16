import Image from "next/image";
import Link from "next/link";

export default function MaxWidth({ children }) {
    return <div className="max-w-7xl  flex flex-col self-center">
        {children}
    </div>

}