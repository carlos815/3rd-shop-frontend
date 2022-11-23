import Image from "next/image";
import Link from "next/link";
import { useNav } from "../lib/navStateProvider";
import { useEffect, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import MaxWidth from "./layout/MaxWidth";
import Padding from "./layout/Padding";
import { useUser } from "./User";

export default function Header() {
    const { sideMenu, openSideMenu, toggleSideMenu, closeSideMenu, cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart } = useNav()

    const user = useUser();



    const NavUrl = ({ href, children }) => <Link href={href} className="hover:even:rotate-6 hover:odd:-rotate-6 z-30 hover:z-40 group " >
        <li className="z- p-2 font-bold before:rounded-xl  duration-100  font-headline  justify-center before:block before:absolute before:-inset-1  group-hover:before:bg-turquoise before:drop-shadow-lg before:-z-10 relative inline-block  group-hover:scale-125 ">
            {children}</li>
    </Link>

    const SearchBar = () => <div className="w-auto bg-p/urple-dark p-4 flex justify-center ">
        <form className="relative max-w-xl w-[600px]">
            <input type="text" className="w-full bg-yellow rounded-lg p-2 text-purple-dark font-body" />
            <button className="rounded-lg absolute right-0 top-0 bg-purple-dark h-full flex w-10 justify-center "><Image src="/search.svg" alt="search icon" width={15} height={15}></Image></button>
        </form>
    </div>

    const CartButton = () => <button className="flex items-center gap-2 " onClick={toggleCart}>
        <Image src="/cart.svg" width={24} height={24} alt="cart" />
        <p className="font-bold text-base tabular-nums text-purple-dark   bg-yellow rounded-full w-7 h-7 flex items-center justify-center">12</p>
    </button>

    const Logo = () => <Link href={"/"} >
        <Image src="/3rd-Shop.svg" alt="3rd Store Logo" className="h-full" width={76} height={38} />
    </Link>

    const NavMenuButton = () => <button onClick={toggleSideMenu}>
        {sideMenu ? <Image src="/close.svg" width={30} height={30} alt="Menu" /> : <Image src="/hamburger.svg" width={30} height={30} alt="Menu" />
        }
    </button>

    return <>
        <header className="bg-purple-dark z-50">
            {/* Mobile Nav */}
            <div className="lg:hidden">
                <div className="flex justify-between py-3 px-6 ">
                    <NavMenuButton />
                    <Logo />
                    {user ? <CartButton /> : <div></div>}

                </div>
                <SearchBar />
            </div>

            {/* Desktop Nav */}

            <div className="hidden lg:flex justify-between py-3 px-6 ">
                <Logo />
                <SearchBar />
                {user ? <CartButton /> : <div></div>}
            </div>

            <div className="bg-yellow flex justify-center">
                <MaxWidth>
                    <Padding>
                        <ul hidden={!sideMenu} className="hidden lg:flex z-10 py-4 w-full  text-h6 font-headline text-center text-purple decoration-purple underline  flex-row gap-4  self-center " >
                            <NavUrl href="/allProducts">All Products</NavUrl>
                            <NavUrl href="/orders">Orders</NavUrl>
                            <NavUrl href="/sell">Sell</NavUrl>
                            <NavUrl href="/profile">Profile</NavUrl>
                            <NavUrl href="/user">User</NavUrl>
                        </ul>
                    </Padding>
                </MaxWidth>
            </div>
        </header>

        {/* Mobile Nav Menu */}
        {sideMenu && <ClickAwayListener onClickAway={closeSideMenu}>
            <ul hidden={!sideMenu} className="lg:hidden absolute z-10  w-4/5 h-full bg-yellow p-4 py-8 text-h6 font-headline text-center text-purple decoration-purple underline flex flex-col gap-4" >
                <NavUrl href="/allProducts">All Products</NavUrl>
                <NavUrl href="/orders">Orders</NavUrl>
                <NavUrl href="/sell">Sell</NavUrl>
                <NavUrl href="/profile">Profile</NavUrl>
                <NavUrl href="/user">User</NavUrl>
            </ul>
        </ClickAwayListener>}

        {/*Cart*/}
        {cartOpen && <ClickAwayListener onClickAway={closeCart}>
            <ul hidden={!cartOpen} className=" absolute z-10 top-0 right-0 w-4/5 h-full bg-pink p-4 py-8 text-h6 font-headline text-center text-purple decoration-purple underline flex flex-col gap-4" >
                <h1 className="text-4xl ">Cart</h1>
                The cart
            </ul>
        </ClickAwayListener>}
    </>
}
