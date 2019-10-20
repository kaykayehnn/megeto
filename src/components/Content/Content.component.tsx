import React, { FunctionComponent } from "react"

import styles from "./Content.module.scss"

export interface ContentProps {
  maxWidth?: string
}

const Content: FunctionComponent<ContentProps> = ({ children, maxWidth }) => {
  return (
    <div className={styles.content}>
      <main style={{ maxWidth }} className={styles.container}>
        {children}
      </main>
    </div>
  )
}

export default Content
