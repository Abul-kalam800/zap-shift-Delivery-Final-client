import React from "react";
import logo1 from "../../assets/brands//amazon_vector.png";
import logo2 from "../../assets/brands//amazon.png";
import logo3 from "../../assets/brands//casio.png";
import logo4 from "../../assets/brands//moonstar.png";
import logo5 from "../../assets/brands//randstad.png";
import logo6 from "../../assets/brands//start.png";
import logo7 from "../../assets/brands//start-people 1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
const BrandSection = () => {
  return (
    <section className="bg-base-200 py-12 overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Partners</h2>

        <div className="card bg-base-100 shadow-md p-7">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            speed={50} // Adjust speed for smoother scroll
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            allowTouchMove={false} // Disable swipe manually
          >
            <SwiperSlide>
              <div className="flex gap-10 animate-swiper-scroll flex-nowrap items-center justify-start ">
                {[...logos, ...logos].map((logo, index) => (
                  <figure key={index} className="w-[200px] h-[100px]">
                    <img
                      src={logo}
                      alt={`Brand ${index + 1}`}
                      className="w-[200px] h-[600px] object-contain grayscale hover:grayscale-0 transition"
                    />
                  </figure>
                ))}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
