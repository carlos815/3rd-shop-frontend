import { PlusButton } from "../Buttons"

const Dialog = require('react-a11y-dialog')

interface ModalProps {
    title?: string,
    content?: string,
    children?: any,
    important?: boolean,
    className?: string,
    open?: boolean,
    dialogRef: any

}
const BaseModal = ({ title, content, children, important, className, open, dialogRef }: ModalProps) => {

    return <dialog className={`${className}  rounded-xl z-20  bg-purple  text-yellow     overflow-hidden backdrop:bg-gradient-to-t backdrop:from-[#00000080] backdrop:via-[#00000080] backdrop:top-1 backdrop:to-[#00000000] p-8`} ref={dialogRef}>
        <button className={`absolute right-0 top-0  text-yellow bg- rounded-full   m-4`} onClick={() => { dialogRef.current.close() }} ><svg className="rotate-45" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" width="5" height="21" fill="currentColor" />
            <rect y="13" width="5" height="21" transform="rotate(-90 0 13)" fill="currentColor" />
        </svg></button>

        <div className={`text-yellow   rounded-2xl bg-neutral-900 flex flex-col  w- text-center `}>
            <h1 className="text-2xl font-headline text-shadow-3d text-turquoise">{title}</h1>
            {content && content}
            {children}
        </div>
    </dialog >
}

export default BaseModal