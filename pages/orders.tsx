import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from "next/image";
import ProductCard from '../components/ProductCard';
import MaxWidth from '../components/layout/MaxWidth';
import Padding from '../components/layout/Padding';
import Banner from '../components/Banner';
import ProductsGrid from '../components/ProductsGrid';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import formatDate from '../lib/formatDate';
import { Order, OrderItem, Orders } from '../types';


// products(first: $first, skip: $skip, where: { id_not: $id_not }) {

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
      orders(orderBy: {createdAt: desc}) {
        id
        charge
        total
        createdAt
        user {
          id
        }
        items {
          id
          name
          description
          price
          quantity
          productId          
          photo {
            altText
            image {
              publicUrlTransformed
            }
          }
        }
      }
    }
`;


// [
//   {
//     "__typename": "Product",
//     "id": "clar2bmab0257nkvq9o97caws",
//     "name": "Test",
//     "price": 342,
//     "description": "test",
//     "photo": []
//   }
// ]


export default function OrdersPage() {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY)

  return (
    < >
      <Head>
        <title>3rd Shop - Orders</title>
        <meta name="description" content="Vintage eshop page built with Keystone and Next Js by Carlos Hernández" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MaxWidth>

        <Padding className="py-8">
          {/* {loading && <p>Loading...</p>} */}
          <h1 className='font-headline lg:text-4xl text-2xl  text-turquoise text-shadow-3d'>Orders</h1>
          <div className='flex flex-col gap-8 my-4'>
            {data?.orders.length == 0 && <p className='text-turquoise font-body'>There are no orders </p>}
            {data?.orders.map((order: Order, index: number) => <div key={order.id} className={"flex flex-col  rounded-lg overflow-hidden"}>
              {/* //Header */}
              <div className='flex gap-7 text-sm text-yellow font-body bg-purple-dark py-2 px-4 '>
                <div>
                  <p className="uppercase">Order placed</p>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <div className='mr-auto'>
                  <p className="uppercase">Total</p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div>
                  <p className="uppercase">ORDER # {order.id}</p>
                </div>
              </div>
              <div className='bg-yellow p-4 flex flex-col gap-4'>
                {order.items.map((orderItem) => <OrderItem orderItem={orderItem} key={orderItem.id + order.id} />)}
              </div>
            </div>)
            }
          </div>
        </Padding>
      </MaxWidth>
    </>
  )


}

const OrderItem = ({ orderItem }: { orderItem: OrderItem }) => <div key={orderItem.id} className={"flex gap-5 "}>
  <Image className={"w-32 h-32 object-cover rounded-lg g aspect-[296/256] "} src={orderItem.photo.image.publicUrlTransformed} width={200} height={200} alt={orderItem.photo.altText} />
  <div className='text-purple-dark  w-full flex flex-col justify-between h-auto'>
    <h3 className='font-headline font-bold text-h6 '>
      <Link href={`/product/${orderItem.productId}`}>{orderItem.name}</Link>
    </h3>
    <h3 className='font-body '>Price: {formatMoney(orderItem?.price)} &times; {orderItem?.quantity}</h3>
    <h3 className='font-body mb-auto font-bold '>Total: {formatMoney(orderItem?.price * orderItem?.quantity)}</h3>

  </div>
</div>

