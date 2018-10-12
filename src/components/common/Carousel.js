import React from 'react';
import Slider from 'react-slick';

class Carousel extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      fade: true
    };
    return (
      <Slider {...settings}>
        <div>
          <img src="https://images.pexels.com/photos/720742/pexels-photo-720742.jpeg?cs=srgb&dl=blur-blurred-background-bokeh-720742.jpg&fm=jpg" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/789305/pexels-photo-789305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/674252/pexels-photo-674252.jpeg?cs=srgb&dl=black-and-white-dark-droplets-674252.jpg&fm=jpg" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/219561/pexels-photo-219561.jpeg?cs=srgb&dl=adult-air-art-219561.jpg&fm=jpg" />
        </div>
        <div>
          <img src="https://images.pexels.com/photos/1300571/pexels-photo-1300571.jpeg?cs=srgb&dl=fashion-fashion-models-female-1300571.jpg&fm=jpg" />
        </div>
      </Slider>
    );
  }
}

export default Carousel;
