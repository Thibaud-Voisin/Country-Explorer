import React from 'react';

const Title = ({ Name, Flag, Arms, Sub_Name }) => {
  return (
    <div className='ml-[2vw] sub_title_results'>
      <div className="flex items-center title">
        {Name}
        <img className='w-[4vw] ml-[1vw]' src={Flag} alt='flag'/>  
        <img className='w-[3vw] ml-[1vw]' src={Arms} alt='arms'/> 
      </div>
      <div className='-mt-[2vw]'>
        {Sub_Name}
      </div>
    </div>
  );
};

export default Title;
