import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from "next/image";
import ProductCard from '../components/ProductCard';
import MaxWidth from '../components/layout/MaxWidth';
import Padding from '../components/layout/Padding';
import Banner from '../components/Banner';
import CartItemQuantityInput from '../components/CartItemQuantityInput';
import ProductsGrid from '../components/ProductsGrid';
import { useUser } from '../components/User';
import formatMoney from '../lib/formatMoney';
import Button from '../components/Buttons';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Checkout from '../components/Checkout'
import Link from 'next/link';
import BaseModal from '../components/modals/BaseModal';
import { useState, useRef } from 'react'
import { CartItem } from '../types';
import { parse } from 'path';

// products(first: $first, skip: $skip, where: { id_not: $id_not }) {



export default function CartPage() {

  const user = useUser()

  const totalPrice = user?.cart.reduce((accumulator: number, cartItem: CartItem) => {
    const price = cartItem.product.price;
    const quantity = cartItem.quantity;
    return price * quantity + accumulator
  }, 0)


  const checkoutDialog = useRef<null | HTMLDialogElement>()
  const cart = user?.cart;

  const EmptyCart = () => <div>
    <p className='font-body text-yellow'>{"The cart is empty :)"}</p>
  </div>

  const FilledCart = () => <>
    <div className='flex flex-col gap-8 mb-6'>
      {user?.cart.map((cartItem: CartItem) =>
        <CartItem key={cartItem.id} cartItem={cartItem} />
      )}
    </div>
    <h2 className='font-headline  text-h6  text-yellow'>Total: {formatMoney(totalPrice)}</h2>
    <Button onClick={() => { checkoutDialog.current?.showModal() }}>Buy</Button>
  </>

  return (
    < >
      <Head>
        <title>Cart - 3rd Shop</title>
        <meta name="description" content="Vintage eshop page built with Keystone and Next Js by Carlos Hern??ndez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseModal title='Check out' className='newModal' dialogRef={checkoutDialog}  >
        <Checkout totalPrice={totalPrice} />
      </BaseModal>

      <MaxWidth>


        <Padding className="py-8 ">


          {!user && <p className='text-turquoise font-body'><Link href="/signin" className='underline'>Log in</Link> or <Link href="/signup" className='underline'>Sign up</Link> to buy
          </p>}
          {user && <><h1 className='font-headline lg:text-6xl text-2xl  text-turquoise text-shadow-3d mb-4'>Cart</h1>
            {user?.cart.length == 0 ? <EmptyCart /> : <FilledCart />}</>}
        </Padding>
      </MaxWidth>
    </>
  )
}

const CartItem = ({ cartItem }: { cartItem: CartItem }) => <div key={cartItem.id.toString()} className={"flex gap-5 "}>
  <Image className={"w-32 h-32 object-cover rounded-lg drop-shadow-lg aspect-[296/256] "} src={cartItem.product.photo[0].image.publicUrlTransformed} width={200} height={200} alt={cartItem.product.photo[0].altText} />
  <div className='text-yellow  w-full flex flex-col justify-between h-auto'>
    <h3 className='font-headline font-bold text-h6 '>
      <Link href={`/product/${cartItem.product.id}`}>{cartItem.product.name}</Link>
    </h3>
    <h3 className='font-body '>Price: {formatMoney(cartItem?.product.price)} &times; {cartItem?.quantity}</h3>
    <h3 className='font-body mb-auto font-bold '>Total: {formatMoney(cartItem?.product.price * cartItem?.quantity)}</h3>
    <CartItemQuantityInput productId={cartItem.product.id} quantity={cartItem.quantity} />
  </div>
</div>

