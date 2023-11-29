import React from 'react'
import propTypes from 'prop-types'

const Title = ({ theme, name, flag, arms, subName }) => {
  return (
    <div className={`mt-[0vh] ml-[2vw] text-[2.5vw] font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-slate-950'} SuisseIntl`}>
      <div className={`flex items-center text-[5vw]  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {name}
        <img className='w-[4vw] ml-[1vw]' src={flag} alt='flag'/>
        <img className='w-[3vw] ml-[1vw]' src={arms} alt='arms'/>
      </div>
      <div className='-mt-[1vw]'>
        {subName}
      </div>
    </div>
  )
}

Title.propTypes = {
  theme: propTypes.string,
  name: propTypes.string,
  flag: propTypes.string,
  arms: propTypes.string,
  subName: propTypes.string
}

export default Title
