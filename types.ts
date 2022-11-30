export type CartItem = {
    id: string
    quantity: number,
    product: Product

}

export type Product = {
    id: string,
    price: number,
    name: string,
    description: string,
    photo: [Photo]
}

export type Photo = {
    altText: string,
    image: {
        publicUrlTransformed: string
    }
}