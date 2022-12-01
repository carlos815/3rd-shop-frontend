import Image from "next/image";
import Link from "next/link";
import { useNav } from "../lib/navStateProvider";
import { useEffect, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import MaxWidth from "./layout/MaxWidth";
import Padding from "./layout/Padding";
import { useUser } from "./User";
import CartButton from "./CartButton"
import Search from "./Search"
import NavUrl from "./NavUrl"
import SignOut from "./SignOut"



export default function Header() {


    const { sideMenu, openSideMenu, toggleSideMenu, closeSideMenu, cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart } = useNav()

    const user = useUser();


    const Logo = () => <Link href={"/"} >
        <Image src="/3rd-Shop.svg" alt="3rd Store Logo" className="h-full" width={76} height={38} />
    </Link>

    const NavMenuButton = () => <button onClick={toggleSideMenu}>
        {sideMenu ? <Image src="/close.svg" width={30} height={30} alt="Menu" /> : <Image src="/hamburger.svg" width={15 * 2} height={12 * 2} alt="Menu" />
        }
    </button>

    const NavUrls = () => <>
        <NavUrl href="/all-products" onClick={closeSideMenu}>All Products</NavUrl>
        {user && <>
            <NavUrl href="/orders" onClick={closeSideMenu}>Orders</NavUrl>
            {/* <NavUrl href="/sell" onClick={closeSideMenu}>Sell</NavUrl>
            <NavUrl href="/profile" onClick={closeSideMenu}>Profile</NavUrl> */}
        </>}
        {!user ? <>
            <NavUrl href="/signin" onClick={closeSideMenu}>Sign In</NavUrl>
            <NavUrl href="/signup" onClick={closeSideMenu}>Register</NavUrl>
        </> : <SignOut />
        }
    </>

    const cartCount = user?.cart.reduce((accumulator, cartItem) => cartItem.quantity + accumulator
        , 0)


    return <>
        <header className="bg-purple-dark 0">
            {/* Mobile Nav */}
            <div className="lg:hidden py-3 px-6">
                <div className="flex justify-between mb-4">
                    <NavMenuButton />
                    <Logo />
                    {user ? <CartButton toggleCart={toggleCart} cartCount={cartCount} /> : <div></div>}
                </div>
                <Search />
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex justify-between py-3 px-6 ">
                <Logo />
                <Search />
                {user ? <CartButton toggleCart={toggleCart} cartCount={cartCount} /> : <div></div>}
            </div>
            <div className="bg-yellow flex justify-center">
                <MaxWidth>
                    <Padding>
                        <ul hidden={!sideMenu} className="hidden lg:flex 0 py-4 w-full  text-h6 font-headline text-center text-purple decoration-purple underline  flex-row gap-4  self-center " >
                            <NavUrls />
                        </ul>
                    </Padding>
                </MaxWidth>
            </div>
        </header>
        {/* Mobile Nav Drawer */}
        {sideMenu && <ClickAwayListener onClickAway={closeSideMenu}>
            <ul hidden={!sideMenu} className="lg:hidden absolute z-10  w-4/5 h-full bg-yellow p-4 py-8 text-h6 font-headline text-center text-purple decoration-purple underline flex flex-col gap-4 animate-fadein" >
                <NavUrls />
            </ul>
        </ClickAwayListener>}

        {/*Cart Drawer*/}
        {cartOpen && <ClickAwayListener onClickAway={closeCart}>
            <ul hidden={!cartOpen} className="absolute 0 right-0 w-2/5 h-full bg-pink p-4 py-8 text-h6 font-headline text-center text-purple decoration-purple underline flex flex-col gap-4 h-" >
                <h1 className="text-4xl ">Cart</h1>
                {user?.cart.map((cartItem) =>
                    <div key={cartItem.id}>
                        <h1>{cartItem.product.name}</h1>
                        <h1>{cartItem.quantity}</h1>
                    </div>
                )}
            </ul>
        </ClickAwayListener>}
    </>
}


