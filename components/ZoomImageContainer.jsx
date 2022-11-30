import Image from "next/image";
import { useEffect, useState } from "react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MinusButton, PlusButton } from "./Buttons";

const ZoomImageContainer = ({ image, activeIndex }) => {

    //TODO: zoom functionality disabled for now. Buggy AF. Returning a simpler Image component
    return <Image className=" self-center w-full  rounded-lg  aspect-[395/493]  h-auto object-cover" width={1000} height={711} key={image.image.publicUrlTransformed} src={image.image.publicUrlTransformed} alt={image.altText} ></Image >

    // const [scale, setScale] = useState(1)

    // let imageReset = () => { }
    // useEffect(() => {
    //     imageReset()
    // }, [activeIndex])


    // return <TransformWrapper
    //     initialScale={1} panning={{ disabled: scale == 1 }} wheel={{ disabled: true }} cssMode={true} >
    //     {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
    //         imageReset = resetTransform

    //         setScale(rest.state.scale)
    //         return (<>
    //             <div className="absolute bottom-5 right-5 z-50">
    //                 {/* Zoom out button */}
    //                 {rest.state.scale !== 1 && <MinusButton onClick={resetTransform} />}
    //                 {/* Zoom in button */}
    //                 <PlusButton onClick={zoomIn} />
    //             </div>
    //             <TransformComponent contentClass="w-full" wrapperClass="w-full" >
    //                 <Image className=" self-center w-full  rounded-md  aspect-[395/493]  h-auto object-cover" width={1000} height={711} key={image.image.publicUrlTransformed} src={image.image.publicUrlTransformed} alt={image.altText} ></Image>
    //             </TransformComponent>
    //         </>
    //         )
    //     }}
    // </TransformWrapper>


}

export default ZoomImageContainer