import { DialogHTMLAttributes, useState } from "react";
import Web3 from "web3";
import { useCurrentChat } from "../../context/currentChatContext";
import { useUserMetamask } from "../../context/userContextMetamask";
import createNewChat from "../../firebase/createNewChat";
import BaseModal from "./BaseModal";
import Image from "next/image";


const NewChatModal = ({ className }) => {

    const { userMetamask, }: any = useUserMetamask()
    const [address, setAddress] = useState<string>("")
    const { setCurrentChat, setChatId }: any = useCurrentChat()

    const [isAddress, setIsAddress] = useState<boolean>(true);


    const handleClick = (event) => {
        event.preventDefault()
        if (Web3.utils.isAddress(address)) {
            setIsAddress(true)
            createNewChat([userMetamask, address], setChatId)
            setCurrentChat(address);
            setAddress("");
            (document.querySelector("." + className) as any).close()

        } else {
            setIsAddress(false)
        }
    }

    const onChange =
        (e) => {
            setAddress(e.target.value)
            setIsAddress(true)
        }

    return <BaseModal className={className} title="New Conversation" content="Enter an Ethereum address below">
        <form className="relative flex flex-col gap-y-4 text-left">

            <input className={` mb-4 bg-neutral-700 p-2 focus:outline-none focus:ring-primary-500 focus:ring-1 rounded ${!isAddress && "ring-negative-500 ring-1"}`} value={address} onChange={onChange} placeholder="0x2D3f907b0cF2C7D3c2BA4Cbc72971081FfCea963" >

            </input>
            {!isAddress && <div className="absolute flex gap-2 text-xs top-12 text-negative-500"><span>Not a valid address </span> <Image src={"/error.svg"} width="16" height={16} /> </div>}


            <button className="btn" disabled={address === ""} onClick={handleClick}>Create New Chad</button>
        </form>

    </BaseModal>
}

export default NewChatModal