import Link from "next/link";
import Image from "next/image";
import formatMoney from '../lib/formatMoney'
// import { formatter } from "../utils/helpers";

const ProductCard = ({ product }) => {
  const { id, name, price } = product;

  const { altText, publicUrlTransformed } = product.photo.image;


  return (
    <Link href={`/product/${id}`} className="group ">
      <div className="w-full bg-gray-200 rounded-3xl overflow-hidden drop-shadow-lg ">
        <div className="relative  h-64 group-hover:scale-105 group-hover:rotate-3 duration-500 ">
          <Image
            src={publicUrlTransformed}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <h3 className="mt-4 text-turquoise font-headline text-lg ">{name}</h3>
      <p className="mt-0 text-pink font-headline text-lg">{formatMoney(price)}</p>
    </Link>
  );
};

export default ProductCard;
