import React from 'react';

export const NothingSelected = () => {
  return (
    <div className='nothing__main-content'>
      <p>
        Select something <br /> Or create an entry
      </p>
      <lottie-player
        src='https://assets8.lottiefiles.com/packages/lf20_2qmtqq0y.json'
        background='transparent'
        speed='1'
        style={{ width: 300, height: 300 }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );
};
