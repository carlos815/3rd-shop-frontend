import { useState } from "react";
import Web3 from "web3";
import { useCurrentChat } from "../../context/currentChatContext";
import { useUserMetamask } from "../../context/userContextMetamask";
import createNewChat from "../../firebase/createNewChat";
import { RequestStatus } from "../../helpers/types";
import BaseModal from "./BaseModal";
import Image from "next/image";


const LoginModal = ({ }) => {
    const { reqStatus, requestUser, loginAsGuest }: any = useUserMetamask()

    return <BaseModal className="top-1/2 -translate-y-1/2" title="Welcome to ETH CHAT" content="Did you ever wanted to send messages to other Ethereum addresses? Yeah, me neither. But you can do that now with ETH Chat!" important open>
        <>
            {reqStatus === RequestStatus.error && <div>Couln't connect ot metamask</div>}
            <button
                className="btn flex items-center justify-center"
                onClick={() => {
                    requestUser()
                }}>
                {reqStatus === RequestStatus.loading ? <Image className="animate-spin" src={"/spinner.svg"} width="24" height={24} /> : "Login with Metamask"}
            </button>
            <button className="underline text-xs" onClick={loginAsGuest}>Or enter as guest (that's cool too...)</button>
        </>
    </BaseModal>
}

export default LoginModal