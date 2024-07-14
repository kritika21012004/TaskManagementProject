import React from "react";

const Loading = () => {
  return (
    <div data-testid='dots-container' className='dots-container'>
      <div data-testid='dot' className='dot'></div>
      <div data-testid='dot' className='dot'></div>
      <div data-testid='dot' className='dot'></div>
      <div data-testid='dot' className='dot'></div>
      <div data-testid='dot' className='dot'></div>
    </div>
  );
};
  
  export default Loading;