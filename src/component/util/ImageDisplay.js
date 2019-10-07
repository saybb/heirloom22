import React from 'react';
import { Carousel } from 'antd';
import './ImageDisplay.css'

const ImageDisplay = (props) => {
    const { media_links } = props;

    if (!media_links) return null;
    return (
        <div className="carousel-container">
            <Carousel>
                {media_links.map((link, id) => {
                    return (
                        <div key={id} className="carousel-image-container">
                            <img alt="Carousel" src={link.url}/>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default ImageDisplay;