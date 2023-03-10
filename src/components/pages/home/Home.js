import './home.css';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

import Carousel from './Carousel';
import Hambuno from '../../../assets/img/burguerDoble.jpeg';
import Hambdos from '../../../assets/img/burguerLechuga.jpeg';
import Hambtres from '../../../assets/img/burguerQueso.jpeg';
import Hambcuatro from '../../../assets/img/burguerXxl.jpeg';
import Hambcinco from '../../../assets/img/burguerChocloPalta.jpeg';
import Hambseis from '../../../assets/img/burguerQuesoDos.jpeg';
import Mafut from '../../../assets/img/mafut.jpeg';
import Mauri from '../../../assets/img/mauri.jpg';
import Adriano from '../../../assets/img/adriano.jpeg';
import Tomi from '../../../assets/img/tomi.jpeg';

const Home = () => {

  const { darkMode } = useContext(ThemeContext);

  return (
    <div className='homeContainer'>
      <Carousel />
      <div className='welcomeContainer'>
        <div className='text-white welcome'>WELCOME</div>
        <div className='text-white under-welcome'>To Barrio Ciudadela, our home in Tucuman.</div>
      </div>
      <div className={darkMode ? 'homeBack-dark' : 'homeBack'}>
        <div className='d-flex flex-column align-items-center'>
          <h2 className='mt-4 mb-3 barrioCiudadela'>BARRIO CIUDADELA</h2>
          <div className='texto-home-container'>
            <span className='texto-home'>
              Welcome to Barrio Ciudadela, where we offer a one of a kind fine dining experience with the unique taste of San Miguel de Tucuman. Whether you are here for lunch or dinner, celebrating a special occasion, our menu offers something for everyone. You will be amazed by the taste and quality of our burguers, wich are made with the best patty meat of the region, the tastiest cheese, the freshest vegetables, and of course, with the amout of dedication and love required.
            </span>
          </div>
        </div>
        <div className='ps-5 pe-5 pb-4'>
          <div className='row mb-3 imgContainer'>
            <img className='col-12 col-md-4 img-burguer' alt='burguer' src={Hambuno} />
            <img className='col-12 col-md-4 img-burguer' alt='burguer' src={Hambdos} />
            <img className='col-12 col-md-4 img-burguer' alt='burguer' src={Hambtres} />
          </div>
          <div className='row imgContainer'>
            <img className='col-12 col-md-4 img-burguer' alt='burguer' src={Hambcuatro} />
            <img className='col-12 col-md-4 img-burguer' alt='burguer' src={Hambcinco} />
            <img className='col-12 col-md-4 img-burguer' alt='burguer' src={Hambseis} />
          </div>
        </div>
        <div>
          <div className='d-flex justify-content-center'>
            <h3 className='owners-title' id='aboutUs'>OWNERS</h3>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='owners-photo row'>
              <div className='owner-pic-zone col-12 col-md-3 d-flex justify-content-center align-items-center'>
                <div className='radius-owner d-flex justify-content-center align-items-center'>
                  <img className='picture-radius' alt='a member of the group' src={Mafut} />
                </div>
              </div>
              <div className=' d-flex flex-column justify-content-center align-items-center  col-12 col-md-9'>
                <h4 className='owners-name'>Thomas Mafut</h4>
                <p>Developer, music and videogames enthusiast, He is characterized by his constant search of progress and perfection. One of the founders of 'Barrio Ciudadela'.</p>
              </div>
            </div>
            <div className='owners-photo row'>
              <div className='owner-pic-zone col-12 col-md-3 d-flex justify-content-center align-items-center'>
                <div className='radius-owner d-flex justify-content-center align-items-center'>
                  <img className='picture-radius' alt='a member of the group' src={Mauri} />
                </div>
              </div>
              <div className=' d-flex flex-column justify-content-center align-items-center  col-12 col-md-9'>
                <h4 className='owners-name'>Mauricio Lenz</h4>
                <p>Developer, music and videogames enthusiast, He is characterized by his constant search of progress and perfection. One of the founders of 'Barrio Ciudadela'.</p>
              </div>
            </div>
            <div className='owners-photo row'>
              <div className='owner-pic-zone col-12 col-md-3 d-flex justify-content-center align-items-center'>
                <div className='radius-owner d-flex justify-content-center align-items-center'>
                  <img className='picture-radius' alt='a member of the group' src={Adriano} />
                </div>
              </div>
              <div className=' d-flex flex-column justify-content-center align-items-center  col-12 col-md-9 '>
                <h4 className='owners-name'>Adriano Adbelnur</h4>
                <p>Developer, music and videogames enthusiast, He is characterized by his constant search of progress and perfection. One of the founders of 'Barrio Ciudadela'.</p>
              </div>
            </div>
            <div className='owners-photo row mb-4'>
              <div className='owner-pic-zone col-12 col-md-3 d-flex justify-content-center align-items-center'>
                <div className='radius-owner d-flex justify-content-center align-items-center'>
                  <img className='picture-radius' alt='a member of the group' src={Tomi} />
                </div>
              </div>
              <div className=' d-flex flex-column justify-content-center align-items-center  col-12 col-md-9 '>
                <h4 className='owners-name'>Tomas Garcia</h4>
                <p>Developer, music and videogames enthusiast, He is characterized by his constant search of progress and perfection. One of the founders of 'Barrio Ciudadela'.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
