import React, { FunctionComponent } from "react"

import styles from "./Content.module.scss"

export interface ContentProps {
  maxWidth?: string
}

const Content: FunctionComponent<ContentProps> = ({ children, maxWidth }) => {
  return (
    <div className={styles.content}>
      <div style={{ maxWidth }} className={styles.container}>
        {children}
      </div>
    </div>
  )
}

export default Content
