import React from 'react';
import { Carousel, Icon } from 'antd';
import './ImageDisplay.css'

class ImageDisplay extends React.Component {
    state = {
        carousel: React.createRef(),
        index: 0
    }

    // move to previous slide
    previous = () => {
        this.state.carousel.current.prev()
    }
    // move to next slide
    next = () => {
        this.state.carousel.current.next()
    }
    // move to specified slide
    goTo = (index) => {
        this.state.carousel.current.goTo(index)
    }
    // called when slide is about to change
    handleChange = (from, index) => {
        this.setState({index: index})
    }

    
    render() {
        const {carousel, index } = this.state;
        const { media_links } = this.props;

        if (!media_links) return null;
            return (
                <div className="carousel-container">
                    <Carousel
                        ref={carousel}
                        dots={false}
                        beforeChange={this.handleChange}
                    >
                        {media_links.map((link, id) => {
                            return (
                                <div key={id} className="carousel-image-container">
                                    <img alt="Carousel" src={link.url}/>
                                </div>
                            );
                        })}
                    </Carousel>

                    {/* Carousel Controls */}
                    { media_links.length > 1 ?
                        <div style={{textAlign: "center"}}>
                            <Icon type="left-circle" style={{fontSize: "2rem", margin: "0 1rem"}} onClick={this.previous} />
                            { media_links.map((m, i) =>
                                <div
                                    key={i}
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "text-bottom",
                                        width: "2rem",
                                        height: "2rem",
                                        backgroundColor: i === index ? "rgba(0,0,0,0.65)" : "white",
                                        borderColor: "rgba(0,0,0,0.65)",
                                        borderRadius: "50%",
                                        borderStyle: i === index ? "none" : "solid",
                                        borderWidth: "0.18rem",
                                        cursor: "pointer",
                                        margin: "0 1rem"
                                    }}
                                    onClick={() => this.goTo(i)}
                                />
                            )}
                            <Icon type="right-circle" style={{fontSize: "2rem", margin: "0 1rem"}} onClick={this.next}/>
                        </div>
                    : null }
                </div>
        );

    }
    
}

export default ImageDisplay;