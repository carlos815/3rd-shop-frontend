import Image from "next/image";

export default function LoadingComponent() {
    //Not really a spinner
    return <div className='flex justify-center items-center h-96'>
        <Image className='animate-bounce' src="/cart.svg" width={50} height={50} alt="cart" />
    </div>
}