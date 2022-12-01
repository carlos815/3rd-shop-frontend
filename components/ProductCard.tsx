import Link from "next/link";
import Image from "next/image";
import formatMoney from '../lib/formatMoney'
import { Product } from "../types";
// import { formatter } from "../utils/helpers";

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, price } = product;

  const { altText, image } = product?.photo[0];
  return (
    <Link href={`/product/${id}`} className="group ">
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden drop-shadow-lg relative  aspect-[296/256] ">
        <Image
          src={image.publicUrlTransformed}
          alt={altText}
          fill
          sizes="(max-width: 1024px) 50vw,
              25vw"
          className="object-cover  group-hover:scale-105 group-hover:rotate-3 duration-500  "
        />

      </div>
      <h3 className="mt-4 text-turquoise font-headline text-lg ">{name}</h3>
      <p className="mt-0 text-pink font-headline text-lg">{formatMoney(price)}</p>
    </Link>
  );
};

export default ProductCard;
