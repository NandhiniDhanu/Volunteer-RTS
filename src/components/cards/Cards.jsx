import React from 'react';
import './cards.css';
import { SlOptionsVertical } from 'react-icons/sl';
import { assets } from '../../assets/assets';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Cards = ({ data = [], variant = "grid" }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div 
      className={`card__container ${
        data.length < 3 ? 'card__container--few' : ''
      }`}
    >
      {variant === "slider" && data.length > 3 ? (
        <Slider {...settings} className='card__slider'>
          {data.map((card, index) => (
            <div key={index} className='card'>
              <div className='card__image'>
                <img src={assets.redBackgroundImage} alt='Card background' />
              </div>
              <div className='card__content'>
                <div className='card__header'>
                  <h3 className='card__title'>{card.title}</h3>
                  <SlOptionsVertical className='card__options' />
                </div>
                <p className='card__description'>{card.description}</p>
              </div>
              <div className='card__footer'>
                <span className='card__date'>{card.date}</span>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='card__row'>
          {data.map((card, index) => (
            <div key={index} className='card'>
              <div className='card__image'>
                <img src={assets.redBackgroundImage} alt='Card background' />
              </div>
              <div className='card__content'>
                <div className='card__header'>
                  <h3 className='card__title'>{card.title}</h3>
                  <SlOptionsVertical className='card__options' />
                </div>
                <p className='card__description'>{card.description}</p>
              </div>
              <div className='card__footer'>
                <span className='card__date'>{card.formattedDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;
