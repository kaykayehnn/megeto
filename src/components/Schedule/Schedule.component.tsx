import React, { FunctionComponent, useState } from "react"
import {
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  useMediaQuery,
} from "@material-ui/core"

import styles from "./Schedule.module.scss"
import Content from "@Components/Content"
import { Helmet } from "react-helmet"

const DAYS = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък"]

export interface ScheduleProps {
  data: {
    allScheduleJson: {
      edges: {
        node: {
          _0: string[]
          _1: string[]
          _2: string[]
          _3: string[]
          _4: string[]
          _5: string[]
          _6: string[]
          _7: string[]
          _8: string[]
        }
      }[]
    }
  }
}

const Schedule: FunctionComponent<ScheduleProps> = props => {
  const [dayIndex, setDayIndex] = useState(0)
  const scheduleObj = props.data.allScheduleJson.edges[dayIndex].node
  const columns = scheduleObj._0

  const scrollableTabs = useMediaQuery("(max-width: 640px)")

  const schedule = [
    scheduleObj._1,
    scheduleObj._2,
    scheduleObj._3,
    scheduleObj._4,
    scheduleObj._5,
    scheduleObj._6,
    scheduleObj._7,
    scheduleObj._8,
  ]

  return (
    <>
      <Helmet>
        <title>Програма</title>
      </Helmet>
      <Content>
        <Typography variant="h1" gutterBottom>
          Програма
        </Typography>
        <Tabs
          value={dayIndex}
          variant={scrollableTabs ? "scrollable" : "fullWidth"}
          scrollButtons={scrollableTabs ? "on" : "off"}
          indicatorColor="primary"
          onChange={(_event, newValue) => setDayIndex(newValue)}
        >
          {DAYS.map(d => (
            <Tab key={d} label={d} />
          ))}
        </Tabs>
        <Paper className={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Column for subject indices */}
                <TableCell className={styles.stickyCell} />
                {columns.map(c => (
                  <TableCell key={c}>{c}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((daySchedule, ix) => (
                <TableRow key={ix}>
                  {/* Subject index */}
                  <TableCell className={styles.stickyCell}>{ix + 1}</TableCell>
                  {columns.map((_, ix) => (
                    <TableCell key={ix} className={styles.tableCell}>
                      {daySchedule[ix]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Content>
    </>
  )
}

export default Schedule
