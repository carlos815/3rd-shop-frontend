import Link from "next/link"

const NavUrl = ({ href, children, onClick }) => <Link href={href} className="*hover:even:rotate-6 *hover:odd:-rotate-6  hover:z-40 group " onClick={onClick} >
    <li className="z- p-2 font-bold before:rounded-xl  duration-100  font-headline  justify-center before:block before:absolute before:-inset-1  group-hover:before:bg-turquoise before:drop-shadow-lg before:-z-10 relative inline-block  group-hover:scale-150  ">
        {children}</li>
</Link>

export default NavUrl