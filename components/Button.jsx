export default function Button({ children, onClick, type = "button", disabled = false }) {
    return <button disabled={disabled} className="relative z-20 transition duration-200 translate-x-0 translate-y-0 hover:-translate-x-1 hover:-translate-y-1 rounded-lg uppercase  text-sm text-purple p-4 w-full font-bold mt-4 bg-pink drop-shadow-lg   " type={type} onClick={onClick}>
        {children}
    </button>
}


