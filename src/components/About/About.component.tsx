import React, { FunctionComponent } from "react"
import Helmet from "react-helmet"
import Content from "@Components/Content"
import { Typography } from "@material-ui/core"
import styles from "./About.module.scss"

export interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <Helmet>
        <title>За гимназията</title>
      </Helmet>
      <Content>
        <Typography variant="h1">За гимназията</Typography>
      </Content>
    </>
  )
}

export default About
