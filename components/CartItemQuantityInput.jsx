import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { ADD_TO_CART_MUTATION } from "../pages/product/[id]"
import { CURRENT_USER_QUERY } from "./User"

const REMOVE_FROM_CART_MUTATION = gql`
mutation REMOVE_FROM_CART_MUTATION($id: ID!){
  removeFromCart(id: $id)  {
    id
  }
}
`


const CartItemQuantityInput = ({ productId, quantity }) => {

    const [removeFromCart, { data }] = useMutation(REMOVE_FROM_CART_MUTATION, { variables: { id: productId }, refetchQueries: [CURRENT_USER_QUERY] })

    const [addToCart, { data: addToCartData }] = useMutation(ADD_TO_CART_MUTATION, {
        variables: { id: productId },
        refetchQueries: [
            CURRENT_USER_QUERY
        ]
    },)

    return <div className="flex items-center gap-4">
        <MinusButton onClick={removeFromCart} />
        <div className="bg-yellow rounded-xl w-12 h-full text-purple text-center justify-center drop-shadow-xs font-bold">
            {quantity}
        </div>
        <PlusButton onClick={addToCart} />
    </div>
}
export default CartItemQuantityInput

const MinusButton = ({ onClick }) => <button onClick={() => { onClick() }} className=" h- w- text-purple bg-turquoise  rounded-full  p-2 drop-shadow-xs" ><svg width="10" height="10" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="13" width="5" height="21" transform="rotate(-90 0 13)" fill="currentColor" />
</svg></button>


const PlusButton = ({ onClick }) => <button className="  h- w- text-purple bg-turquoise rounded-full  p-2  drop-shadow-xs" onClick={() => { onClick() }} ><svg width="10" height="10" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" width="5" height="21" fill="currentColor" />
    <rect y="13" width="5" height="21" transform="rotate(-90 0 13)" fill="currentColor" />
</svg></button>