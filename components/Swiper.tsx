"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

export default function SwiperWrapper() {
    return (
        <div className='container pb-5'>
        <Swiper 
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
        >
            <SwiperSlide>
                <Image src="/assets/images/slider1.webp" alt="Slide 1" width={1400} height={700} />
            </SwiperSlide>
        </Swiper>
        </div>
    );
}