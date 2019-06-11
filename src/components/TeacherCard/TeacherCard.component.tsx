import React, { FunctionComponent } from "react"

import styles from "./TeacherCard.module.scss"
import { Card, Avatar, CardHeader } from "@material-ui/core"
import Teacher from "types/Teacher"

export interface TeacherCardProps extends Teacher {}

const TeacherCard: FunctionComponent<TeacherCardProps> = ({
  id,
  name,
  photoUrl,
}) => {
  return (
    <Card key={id} className={styles.teacher}>
      <CardHeader
        avatar={<Avatar src={photoUrl} alt={name} className={styles.avatar} />}
        title={name}
        titleTypographyProps={{ variant: "h5" }}
      />
    </Card>
  )
}

export default TeacherCard
