import React, { useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useWidth } from '../../hook';

import './swiper.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

function SwiperNew({ books }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const isMobile = useWidth();

  return (
    <React.Fragment>
      <Swiper
        data-test-id='slide-big'
        spaceBetween={30}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => `<span class="dot ${className}"></span>`,
        }}
        className='mySwiper2'
      >
        {books.map((value) => (
          <SwiperSlide key={value.url}>
            <img src={`https://strapi.cleverland.by${value.url}`} alt='card' />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='custom-pagination' />
      {isMobile && (
        <Swiper
          data-test-id='slide-mini'
          onSwiper={setThumbsSwiper}
          spaceBetween={30}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`mySwiper ${books.length === 2 ? 'swiper-wrapper_center' : ''}`}
        >
          {books.map((value) => (
            <SwiperSlide key={value.url}>
              <img src={`https://strapi.cleverland.by${value.url}`} alt='card' />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </React.Fragment>
  );
}

export { SwiperNew };
