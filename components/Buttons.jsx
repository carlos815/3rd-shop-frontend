export default function Button({ children, onClick, type = "button", disabled = false }) {
    return <button disabled={disabled} className="relative  transition duration-200 translate-x-0 translate-y-0 hover:-translate-x-1 hover:-translate-y-1 rounded-lg uppercase  text-sm text-purple p-4 w-full font-bold mt-4 bg-pink " style={{
        boxShadow: "8px 8px 0px #292140, inset 4px 4px 0px #FFF4BD"
    }} type={type} onClick={onClick}>
        {children}
    </button>
}

const MinusButton = ({ onClick }) => <button onClick={() => { onClick() }} className=" h-11 w-11 text-purple bg-turquoise  rounded-full  p-3 scale-75" ><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="13" width="5" height="21" transform="rotate(-90 0 13)" fill="currentColor" />
</svg></button>


const PlusButton = ({ onClick, className }) => <button className={`  h-11 w-11 text-purple bg-turquoise rounded-full  p-3 scale-75 ${className}`} onClick={() => { onClick() }} ><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" width="5" height="21" fill="currentColor" />
    <rect y="13" width="5" height="21" transform="rotate(-90 0 13)" fill="currentColor" />
</svg></button>


export { MinusButton, PlusButton }