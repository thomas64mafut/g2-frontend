import './carousel.css';

import Carousel from 'react-bootstrap/Carousel';

import Hamburguesauno from '../../../assets/img/burguerXxl.jpeg';
import Hamburguesados from '../../../assets/img/burguerHuevo.jpeg';
import Hamburguesatres from '../../../assets/img/burguerLechuga.jpeg';

function UncontrolledExample() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={Hamburguesauno}
            alt="First slide burguer"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={Hamburguesados}
            alt="Second slide burguer"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-carousel"
            src={Hamburguesatres}
            alt="Third slide burguer"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default UncontrolledExample;
