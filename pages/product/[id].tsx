// import { getAllProducts } from "../lib/shopify"
// import ProductCard from "../components/ProductCard"



import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
// import Page from "../../components/layout/Page"
// import { getAllProductHandles, getAllProducts, getProduct, ShopifyData } from "../../lib/shopify"
// import ImageSwiper from "../../components/ImageSwiper"
import ProductCard from "../../components/ProductCard"



export interface Product {
    title: string;
    description: string;
    handle: string;
    descriptionHtml: string;
    priceRange: PriceRange;
    images: Images;
}

export interface Images {
    edges: Edge[];
}

export interface Edge {
    node: Node;
}

export interface Node {
    originalSrc: string;
    altText: null;
}

export interface PriceRange {
    minVariantPrice: MinVariantPrice;
}

export interface MinVariantPrice {
    amount: string;
}





const ProductPage: NextPage = ({ product, products }: { product: Product, products: Product[] }) => {

    useEffect(() => {

        console.log(product)

    }

        , [])







    return (
        <>
            <div className="">


            </div >
            {/* 
            {
                products.map(_product => {
                    if (product.handle == _product.node.handle) return

                    return <ProductCard key={_product.node.id} product={_product} />
                }
                )
            } */}
        </ >
    )
}

export default ProductPage

// export const getStaticProps: GetStaticProps = async (context) => {
//     const product = await getProduct(context.params?.id)
//     const products = await getAllProducts()

//     return {
//         props: { product, products }, // will be passed to the page component as props
//     }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//     const allProductsHandles = await getAllProductHandles()

//     return {
//         paths: allProductsHandles.map((p) => ({
//             params: { id: p },
//         })),
//         fallback: "blocking",
//     };
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