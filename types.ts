export type CartItem = {
    id: string
    quantity: number,
    product: Product

}

export type Product = {
    id: string,
    price: number,
    name: string,
    subtitle?: string,
    description: string,
    photo: [Photo]
}

export type Photo = {
    altText: string,
    image: {
        publicUrlTransformed: string
    }
}

export type Orders = {
    Orders: [Order]
}

export type Order = {
    id: string,
    charge: string,
    total: number,
    createdAt: string,
    user: {
        id: string,
    }
    items: [OrderItem]
}

export type OrderItem = {
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    productId: string,
    photo: Photo
}
