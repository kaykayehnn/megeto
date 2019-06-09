import React, { FunctionComponent } from "react"

import styles from "./TeacherCard.module.scss"
import { Card, Avatar, CardHeader } from "@material-ui/core"

export interface TeacherCardProps {
  id: string
  name: string
  subject: string
}

const TeacherCard: FunctionComponent<TeacherCardProps> = ({ id, name }) => {
  return (
    <Card key={id} className={styles.teacher}>
      <CardHeader
        avatar={
          <Avatar
            src="/images/vasil_simeonov_compressed.jpg"
            alt={name}
            className={styles.avatar}
          />
        }
        title={name}
        titleTypographyProps={{ className: styles.teacherName }}
      />

      {/* <div className={styles.teacherDetails}>
        <Typography variant='body1' className={styles.teacherName}>
          {name}
        </Typography>
      </div> */}
    </Card>
  )
}

export default TeacherCard
