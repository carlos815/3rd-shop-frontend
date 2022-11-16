import Image from "next/image";

export default function Banner() {
    return <div className=' bg-turquoise self-center  max-h-[424px] flex flex-col items-center px-5 min-w-full'>
        <Image src="/banner.svg" height={456} width={790.78} alt={"Banner Image"} className="  object-cover h-full " />
    </div>;
}