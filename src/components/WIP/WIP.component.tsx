import React, { FunctionComponent } from "react"

import styles from "./WIP.module.scss"
import Content from "@Components/Content"
import { Paper, Typography } from "@material-ui/core"

export interface WIPProps {}

const WIP: FunctionComponent<WIPProps> = () => {
  return (
    <Content>
      <div style={{ padding: "0.5em" }}>
        <Typography variant="h2" align="center" gutterBottom>
          Under construction
        </Typography>
        <img
          style={{ maxWidth: "100%" }}
          src="/images/sol-518339-unsplash_compressed.jpg"
        />
      </div>
    </Content>
  )
}

export default WIP
