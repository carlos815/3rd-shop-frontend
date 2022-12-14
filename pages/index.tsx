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
import ErrorComponent from '../components/ErrorComponent';
import LoadingComponent from '../components/LoadingComponent';


// products(first: $first, skip: $skip, where: { id_not: $id_not }) {

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($id_not: ID, $take: Int, $skip: Int = 0, $orderBy: OrderDirection = desc) {
    products(where: { id: { not: {equals: $id_not} } }, take: $take, skip: $skip, orderBy: {description: $orderBy}) {
      id
      name
      price
      description
      photo {
        id
        altText
        image {
          publicUrlTransformed
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
export default function Home() {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY, { variables: { take: 4, orderBy: "asc" } })

  const success = !error && !loading && data

  return (
    < >
      <Head>
        <title>3rd Shop</title>
        <meta name="description" content="Vintage eshop page built with Keystone and Next Js by Carlos Hernández" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MaxWidth>
        <div className='aspect-[1280/512] relative min-h-[364px] '>  <Image src="/hero.png" fill alt="Hero Image" className=" object-cover w-screen " ></Image></div>
        <Padding className="my-8">
          {error && <ErrorComponent error={error} />}
          {loading && <LoadingComponent />}

          {success && <>
            <h1 className='font-headline lg:text-4xl text-2xl  text-turquoise text-shadow-3d'>Explore Products</h1>
            {data?.products && <ProductsGrid products={data?.products}></ProductsGrid>
            }</>}
        </Padding>
      </MaxWidth>
      <Banner />
    </>
  )


}

