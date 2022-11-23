// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/navigation";
// import required modules
import { Pagination, Mousewheel, Navigation } from "swiper";

import ZoomImageContainer from "./ZoomImageContainer"
import { useRef, useState } from "react";


const ImageSwiper = ({ images }) => {

    const [activeIndex, setActiveIndex] = useState(0)
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return <Swiper
        onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }}
        spaceBetween={30}
        pagination={{
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + " bl" + ' ">' + "</span>";
            },
        }}
        modules={[Pagination, Mousewheel, Navigation]}
        onSlideChange={(event) => { setActiveIndex(event.activeIndex) }}
        className="flex items-center justify-center "
    >
        {images.map((image) =>
            <SwiperSlide key={image.id}>
                <div className="w-full  flex items-center justify-center overflow-visible  ">
                    <div className=" pr-2 pb-2 drop-shadow-lg ">
                        <ZoomImageContainer image={image} activeIndex={activeIndex} />
                    </div>
                </div>
            </SwiperSlide>

        )
        }
        <div ref={prevRef} className="absolute top-1/2  -translate-y-1/2 left-0 z-10 text-pink drop-shadow-lg overflow-visible p-2 scale-50 cursor-pointer duration-100">   <svg width="39" height="45" viewBox="0 0 39 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.04084e-07 22.5L19.125 11.4582L38.25 0.416352L38.25 22.5L38.25 44.5836L19.125 33.5418L3.04084e-07 22.5Z" fill="currentColor" />
        </svg>
        </div>
        <div ref={nextRef} className="absolute top-1/2  -translate-y-1/2 right-0 z-10 text-pink drop-shadow-lg overflow-visible p-2 scale-50 cursor-pointer  duration-100"><svg width="39" height="45" viewBox="0 0 39 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39 22.5L19.875 33.5418L0.749998 44.5836L0.749999 22.5L0.75 0.41635L19.875 11.4582L39 22.5Z" fill="currentColor" />
        </svg>
        </div>
    </Swiper>
}

export default ImageSwiper