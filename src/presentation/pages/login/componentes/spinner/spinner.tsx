import React from 'react'

import Style from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner = (props:Props) => {
  return(
    <div {...props} className={[Style.spinner, props.className].join(' ')}>
      <div/>
      <div/>
      <div/>
      <div/>
    </div>
  )
}

export default Spinner