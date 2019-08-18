import React, { FunctionComponent } from "react"
import Helmet from "react-helmet"
import { Typography } from "@material-ui/core"

import Content from "@Components/Content"
import styles from "./Documents.module.scss"

export interface DocumentsProps {}

const Documents: FunctionComponent<DocumentsProps> = () => {
  return (
    <>
      <Helmet>
        <title>Документи</title>
      </Helmet>
      <Content>
        <Typography variant="h1">Документи</Typography>
      </Content>
    </>
  )
}

export default Documents
