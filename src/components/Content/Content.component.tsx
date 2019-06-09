import React, { FunctionComponent } from 'react'

import styles from './Content.module.scss'

export interface ContentProps {}

const Content: FunctionComponent<ContentProps> = ({ children }) => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}

export default Content
