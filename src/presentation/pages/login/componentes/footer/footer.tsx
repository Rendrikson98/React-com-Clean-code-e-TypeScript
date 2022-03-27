import React, { memo } from 'react'
import Styles from './footer-styles.scss'


const footer = () => {
  return (
    <footer className={Styles.footer}></footer>
  )
}

export default memo(footer)