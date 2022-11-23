import Image from "next/image";
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ZoomImageContainer = ({ image, activeIndex }) => {

    const [scale, setScale] = useState(1)

    let imageReset = () => { }
    useEffect(() => {
        imageReset()
    }, [activeIndex])



    return <TransformWrapper
        initialScale={1} panning={{ disabled: scale == 1 }} wheel={{ disabled: true }} cssMode={true} >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
            imageReset = resetTransform

            setScale(rest.state.scale)
            return (<>
                <div className="absolute bottom-5 right-5 z-50">
                    {/* Zoom out button */}
                    {rest.state.scale !== 1 && <button onClick={() => resetTransform()} className=" h-11 w-11 text-purple bg-turquoise  rounded-full  p-3 scale-75" ><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="13" width="5" height="21" transform="rotate(-90 0 13)" fill="currentColor" />
                    </svg></button>}
                    {/* Zoom in button */}
                    <button className="  h-11 w-11 text-purple bg-turquoise rounded-full  p-3 scale-75" onClick={() => zoomIn()}><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" width="5" height="21" fill="currentColor" />
                        <rect y="13" width="5" height="21" transform="rotate(-90 0 13)" fill="currentColor" />
                    </svg></button>
                </div>
                <TransformComponent>
                    <Image className=" self-center w-auto  rounded-md  aspect-[395/493] object-cover" width={5750} height={711} key={image.image.publicUrlTransformed} src={image.image.publicUrlTransformed} ></Image>
                </TransformComponent>
            </>
            )
        }}
    </TransformWrapper>
}

export default ZoomImageContainer