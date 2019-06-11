import React, { FunctionComponent, useMemo } from "react"
import { csvParse } from "d3-dsv"
import { Typography } from "@material-ui/core"

import styles from "./Collective.module.scss"
import Content from "@Components/Content"
import TeacherCard from "@Components/TeacherCard"
import useCollective from "@Hooks/useCollective"

const ADMINISTRATION = [
  "Директор",
  "Зам. Директор",
  "Психолог",
  "Педалогически съветник",
]

export interface CollectiveProps {}

const Collective: FunctionComponent<CollectiveProps> = () => {
  const collective = useCollective()

  return (
    <Content>
      <Typography variant="h1" className={styles.heading}>
        Колектив
      </Typography>
      <div>
        <Typography variant="h3" className={styles.subheading}>
          Ръководство
        </Typography>
        <div>
          {collective
            .filter(([role]) => ADMINISTRATION.indexOf(role) >= 0)
            .map(([role, people]) => (
              <div key={role}>
                <Typography variant="h4" className={styles.subheading}>
                  {role}
                </Typography>
                <div className={styles.teacherContainer}>
                  {people.map(p => (
                    <TeacherCard key={p.id} {...p} />
                  ))}
                </div>
              </div>
            ))}
        </div>
        <Typography variant="h3" className={styles.subheading}>
          Учители
        </Typography>
        <div>
          {collective
            .filter(([role]) => ADMINISTRATION.indexOf(role) === -1)
            .map(([subject, people]) => (
              <div key={subject}>
                <Typography variant="h4" className={styles.subheading}>
                  {subject}
                </Typography>
                <div className={styles.teacherContainer}>
                  {people.map(p => (
                    <TeacherCard key={p.id} {...p} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Content>
  )
}

export default Collective
