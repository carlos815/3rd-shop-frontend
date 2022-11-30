import Image from "next/image"
import Link from "next/link"



const CartButton = ({ toggleCart, cartCount }) => <Link className="flex items-center gap-2 " href={"/cart"}>
    <Image src="/cart.svg" width={24} height={24} alt="cart" />
    {cartCount !== 0 && <p className="font-bold text-base tabular-nums text-purple-dark   bg-yellow rounded-full w-7 h-7 flex items-center justify-center">{cartCount}</p>}
</Link>

export default CartButton