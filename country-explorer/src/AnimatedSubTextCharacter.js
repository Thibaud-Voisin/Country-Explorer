import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const AnimatedSubTextCharacter = ({ text }) => {
  const letters = Array.from(text)

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.008, delayChildren: 0.02 * i }
    })
  }
  const child = {
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 6,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 6,
        stiffness: 100
      }
    }
  }

  // Rendering the animated text
  return (
    <motion.div className={'mt-[4.5vh] xl:text-[1.5vw] text-[2.5vw] Comfortaa}'}
      style={{ overflow: 'hidden', display: 'flex' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

AnimatedSubTextCharacter.propTypes = {
  text: PropTypes.string.isRequired
}

export default AnimatedSubTextCharacter
