import ProductCard from "./ProductCard";

export default function ProductsGrid({ products }) {

    return <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 my-4'>  {products?.map(product => <ProductCard product={product} key={product.id} />)}</div>
} 