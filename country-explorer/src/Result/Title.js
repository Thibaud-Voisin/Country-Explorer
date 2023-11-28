import React from 'react';

const Title = ({ name, flag, arms, subName }) => {
  return (
    <div className='ml-[2vw] sub_title_results'>
      <div className="flex items-center title">
        {name}
        <img className='w-[4vw] ml-[1vw]' src={flag} alt='flag'/>  
        <img className='w-[3vw] ml-[1vw]' src={arms} alt='arms'/> 
      </div>
      <div className='-mt-[1vw]'>
        {subName}
      </div>
    </div>
  );
};

export default Title;
