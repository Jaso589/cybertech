import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from '@/styles/SliderHome.module.css'
import Image from "next/image";

const Slider = ({slides}) => {
  const [autoplay, setAutoplay] = useState(true);

  const handleToggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  return (
    <div className={styles.carousel_wrapper}>
      <Carousel
        autoPlay={autoplay}
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        interval={3000}
        stopOnHover={true}
      >
        {
          slides.map((slide) => (
            <div className={styles.slide_card} key={slide.alt}>
              <div className={styles.card_text}>
                <h2>{slide.title}</h2>
                <p>Lorem ipsum dolor sit amet consectetur. Justo non ornare viverra urna sagittis sapien sed vitae ipsum. Pulvinar id urna gravida donec.</p>
              </div>
              <div className={styles.slide_img}>
                <Image
                  src={slide.src}
                  fill
                  alt={slide.alt}
                />
                {/* <img src={slide.src} alt={slide.alt} /> */}
              </div>
            </div>
            
          ))
        }
      </Carousel>
      <div className="controls">
        {/* <button onClick={handleToggleAutoplay}>
          {autoplay ? "Pausar" : "Iniciar"} Autoplay
        </button> */}
      </div>
    </div>
  );
};


export default Slider;