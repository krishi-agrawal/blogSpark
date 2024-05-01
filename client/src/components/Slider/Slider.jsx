import React, { useState, useEffect } from "react";
import "./Slider.css";

const Slider = () => {
    const data = [
        "../../../img/1.png",
        "../../../img/2.png",
        "../../../img/3.png"
    ];

    const [currentSlide, setSlide] = useState(0);
    
    // Function to go to the next slide
    const nextSlide = () => {
        setSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
    }

    // useEffect to set the timer for automatic slide change
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(slideInterval);
    }, [currentSlide]); // Dependency array includes currentSlide to reset interval if slide manually changed

    return (
        <div className="slider">
            <div className="container" style={{transform: `translateX(-${currentSlide * 100}vw)`}}>
                {data.map((src, index) => (
                    <img key={index} src={src} alt={`slide ${index}`} />
                ))}
            </div>
        </div>
    );
}

export default Slider;
