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
import { useRouter } from 'next/router';
import Link from 'next/link';
import ErrorComponent from '../components/ErrorComponent';
import LoadingComponent from '../components/LoadingComponent';


// products(first: $first, skip: $skip, where: { id_not: $id_not }) {

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($id_not: ID, $take: Int, $skip: Int = 0) {
    productsCount
    products(where: { id: { not: {equals: $id_not} } }, take: $take, skip: $skip) {
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
export default function AllProductsPage() {
  const { query } = useRouter();

  const itemsPerPage = 4
  const page = query.p ? parseInt(query.p.toString()) : 1
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage
    }
  })

  const totalPages = Math.ceil(data?.productsCount / itemsPerPage)

  const success = !error && data

  return (
    < >
      <Head>
        <title>All Products - Page {page} - 3rd Shop</title>
        <meta name="description" content="Vintage eshop page built with Keystone and Next Js by Carlos Hernández" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MaxWidth>
        <Padding className="py-8 ">
          {error && <ErrorComponent error={error} />}
          {loading && <LoadingComponent />}
          {success && <>    <h1 className='font-headline lg:text-4xl text-2xl  text-turquoise text-shadow-3d'>Explore Products</h1>
            {data?.products && <ProductsGrid products={data?.products}></ProductsGrid>
            }
            {page && totalPages && <div className='flex w-full justify-center items-center drop-shadow-xs gap-6 mt-12'>
              {page >= 2 ? <Link className='font-headline flex justify-center items-center text-2xl h-8 w-8 text-turquoise' href={`/all-products?p=${page - 1}`}>◄</Link> : <div className='h-8 w-8'></div>}
              <div>
                <div className='bg-yellow rounded-full p-2 flex justify-center items-center font-body text-purple-dark font-bold'>{page} of {totalPages}</div>
              </div>
              {totalPages !== page ? <Link className='font-headline flex justify-center items-center text-2xl h-8 w-8 text-turquoise' href={`/all-products?p=${page + 1}`}>►</Link> : <div className='h-8 w-8'></div>}</div>}</>}
        </Padding>
      </MaxWidth>
    </>
  )


}
