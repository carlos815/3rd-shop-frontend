// import { getAllProducts } from "../lib/shopify"
// import ProductCard from "../components/ProductCard"
import gql from 'graphql-tag';

import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from 'next/head';
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Banner from '../../components/Banner';
import MaxWidth from '../../components/layout/MaxWidth';
// import Page from "../../components/layout/Page"
// import { getAllProductHandles, getAllProducts, getProduct, ShopifyData } from "../../lib/shopify"
// import ImageSwiper from "../../components/ImageSwiper"
import ProductCard from "../../components/ProductCard"
import { useMutation, useQuery } from '@apollo/client';
import { ALL_PRODUCTS_QUERY } from '..';
import { useRouter } from 'next/router';
import formatMoney from '../../lib/formatMoney';
import Padding from '../../components/layout/Padding';
import ProductsGrid from '../../components/ProductsGrid';
import Button from '../../components/Buttons';
import ErrorComponent from '../../components/ErrorComponent';
import LoadingComponent from '../../components/LoadingComponent';

import ImageSwiper from "../../components/ImageSwiper"
import { CURRENT_USER_QUERY, useUser } from '../../components/User';
import { userAgent } from 'next/server';
import Link from 'next/link';
import { CartItem, Product } from '../../types';
import nProgress from 'nprogress';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      subtitle
      price
      description
      id
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

const ADD_TO_CART_MUTATION = gql`
mutation ADD_TO_CART_MUTATION($id: ID!) {
  addToCart(id: $id) {
    id
  }
}
`


const ProductPage: NextPage = ({ }) => {
  const { query } = useRouter();


  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, { variables: { id: query.id } })

  const { data: otherProductsData, error: otherProductsError, loading: otherProductsLoading } = useQuery(ALL_PRODUCTS_QUERY, { variables: { take: 4, id_not: query.id } })

  const product: Product = data?.product
  const [addToCart, { data: addToCartData, error: addToCartError, loading: addToCartLoading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id: query.id },
    refetchQueries: [
      CURRENT_USER_QUERY
    ],

    onCompleted: () => {
      console.log("item added to cart")
    }
  },
  )
  const user = useUser();

  const match = user?.cart.find((item: CartItem) => item.product.id == query.id)
  const success = !error && !loading

  const buyItem = () => {
    if (!user) { console.log("user not logged in"); return };
    addToCart()
  }
  useEffect(() => {
    if (loading) {
      nProgress.start()
    }
    if (data || error) {
      nProgress.done()
    } else {
      nProgress.start()
    }
  }, [error, loading, data])
  return (
    <>
      <Head>
        <title>{data?.product.name} - 3rd Shop</title>
        <meta name="description" content="Vintage eshop page built with Keystone and Next Js by Carlos Hernández" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MaxWidth>
        <Padding className="w-auto py-8 min-h-[400px]">
          {error && <ErrorComponent error={error} />}
          {loading && <LoadingComponent />}
          {success && <><div className="flex flex-col md:flex-row md:gap-16 mb-6  animate-fadein md:items-start" >
            <div className="relative flex items-center justify-center overflow-hidden mb-4 w-full">
              <div className="relative flex items-center justify-center rounded-lg overflow-hidden">
                {<ImageSwiper images={product?.photo} />}
              </div >
            </div >
            <div className='w-full'>
              <h1 className="text-3xl text-turquoise font-headline text-shadow-3d ">{product?.name}</h1>
              <h2 className="text-lg text-pink font-headline mb-4 ">
                {product?.subtitle}
              </h2>

              <div className="flex flex-col gap-y-4  text-yellow font-body mb-4" >{product?.description}</div>

              <h2 className="text-2xl  text-turquoise mb-4 font-headline">{formatMoney(product?.price)}</h2>
              {!user && <p className='text-turquoise font-body'><Link href={
                {
                  pathname: '/signin',
                  query: { product: product.id },
                }
              } className='underline'>Log in</Link> or <Link href={{
                pathname: '/signup',
                query: { product: product.id },
              }} className='underline'>Sign up</Link> to buy
              </p>}
              {match && <p className='text-turquoise font-body'>                Item added to <Link href="/cart" className='underline'>cart!</Link>
              </p>}
              {!match && user && <Button onClick={buyItem} disabled={addToCartLoading}>Buy</Button>}</div>


          </div>

            <h1 className='font-headline lg:text-3xl text-2xl  text-turquoise text-shadow-3d'>Moar Products</h1>
            {otherProductsData?.products && <ProductsGrid products={otherProductsData?.products}></ProductsGrid>
            }</>}

        </Padding>
      </MaxWidth>

      {success && <Banner />}

    </ >
  )
}

export default ProductPage

export { ADD_TO_CART_MUTATION }

// export const getStaticProps: GetStaticProps = async (context) => {
//     const product = await getProduct(context.params?.id)
//     const products = await getAllProducts()

//     return {
//         props: { product, products }, // will be passed to the page component as props
//     }
// }


/*

  <h1 className="text-3xl text-turquoise  text-shadow-3d">{product.title}</h1>

                <div className="relative flex items-center justify-center rounded-2xl overflow-hidden">
                    { <ImageSwiper images={product.images} /> }
                </div >



                <div className="flex flex-col gap-y-4 mt-6" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>

                <h2 className="text-2xl font-bold text-turquoise">{product.priceRange.minVariantPrice.amount.toString().replace(".", ",")}</h2>

                <button className="relative z-20 transition duration-200 translate-x-0 translate-y-0 hover:-translate-x-2 hover:-translate-y-2 rounded-lg uppercase  text-sm text-purple p-4 w-full font-bold mt-4 before:block before:absolute  before:-inset-2 before:bg-black  before:left-2 before:top-2 before:-z-50 before:rounded-lg before:hover:translate-x-2 before:hover:translate-y-2 before:translate-x-0 before:translate-y-0 before:transition before:duration-200 after:absolute  after:contents after:bg-pink after:inset-0   after:-z-50 after:rounded-lg">
                    Buy
                </button>
*/