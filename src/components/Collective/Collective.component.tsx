import React, { FunctionComponent, useMemo } from 'react'
import { csvParse } from 'd3-dsv'
import { Typography } from '@material-ui/core'

import styles from './Collective.module.scss'
import Content from '@Components/Content'
import Teacher from 'types/Teacher'
import TeacherCard from '@Components/TeacherCard'

const CSV_TEACHERS = `
Директор,Зам. Директор,Психолог,Педалогически съветник,Български език и литература,Английски език,Немски език,Френски език,Математика,Физика и астрономия,Химия и ООС,Биология и ЗО,История и цивилизация,География и икономика,Философски цикъл,Музика,Изобразително изкуство,Информатика,Физкултура и спорт
1 Веселина Карапеева,7 Алина Сомова,85 Пламена Борисова,6 Любомира Димитрова,8 Бистра Иванова,16 Дани Симеонова,28 Василка Цвяткова,31 Невена Маринова,32 Наталия Хубчева,46 Боряна Генева,48 Валентина Иванова,50 Ангел Панайотов,52 Атанаска Колева,54 Камен Джамбазов,56 Петя Михова,58 Мария Панева,59 Ваня Шипчанова,63 Бистра Танева,79 Антон Илков
,3 Ганка Петрова,,,9 Здравка Гайдаджиева,17 Атанаска Мерджанова,29 Галина Ганчева,,33 Васил Симеонов,47 Илиана Иванова,49 Емилия Иванова,51 Атанаска Мухтарева,53 Катя Белкинова,55 Мария Томова,57 Росица Антонова,,60 Милена Бочукова,64 Виолета Маринова,80 Асен Попов
,5 Ирена Душкова,,,10 д-р Невена Ичевска,18 Веселина Петрова,30 Мирослава Йовкова,,34 Виолета Вазова,,,87 Стойна Николова,2 Румен Иванов,,,,61 Павлина Тотева,65 Гергина Гешева,81 Вержиния Гарабедян
,39 Лалка Лилова,,,11 Павлин Бакалов,4 Гергана Петрова,,,35 Дафинка Андреева,,,,,,,,62 Румен Манолов,66 Дарина Брънчева,82 Галина Серафимова
,,,,12 д-р Пенчо Раянов,19 Димка Цоковска,,,36 Димитринка Огнянова,,,,,,,,,67 Живко Радев,83 Георги Найденов
,,,,13 д-р Милена Видралска,20 Емилия Трифонова,,,37 Елка Вълканова,,,,,,,,,68 Иван Илиев,84 Недко Каблешков
,,,,14 д-р Шинка Дичева,21 Илиан Друмев,,,38 Кремена Симеонова,,,,,,,,,69 Йорданка Тръмбева,
,,,,15 Петър Спасов,22 Калинка Николова,,,40 Лидия Трупчева,,,,,,,,,70 Лиляна Русенова,
,,,,,23 Лилия Неделева,,,41 Николинка Бъчварова,,,,,,,,,71 Магдалена Златанова,
,,,,,24 Стоянка Дермеджиева,,,42 Петя Велкова,,,,,,,,,72 Мария Василева,
,,,,,25 Тодорка Донова,,,43 Радка Златанова,,,,,,,,,73 Недялка Кузева,
,,,,,26 Христинка Минчева,,,44 Татяна Мерджанова,,,,,,,,,74 Пепа Илкова,
,,,,,27 Цветелин Цветков,,,45 Христина Златанова,,,,,,,,,75 Росен Вълчев,
,,,,,,,,,,,,,,,,,76 Хриси Плачкова,
,,,,,,,,,,,,,,,,,77 д-р Цветана Димитрова,
,,,,,,,,,,,,,,,,,78 д-р Янислав Картелов,`.trim()

const ADMINISTRATION = [
  'Директор',
  'Зам. Директор',
  'Психолог',
  'Педалогически съветник',
]

export interface TeacherMap {
  [key: string]: Teacher[]
}

function parseTeachers() {
  const parsed = csvParse(CSV_TEACHERS)
  const columns = parsed.columns
  const teacherRgx = /^(\d+)\s(.+)$/

  // This function converts an array to an object with keys the array elements
  const toHash = (p: TeacherMap, c: string) => ((p[c] = []), p)

  const adminsTable: TeacherMap = columns
    .filter(c => ADMINISTRATION.indexOf(c) >= 0)
    .reduce(toHash, {})
  const teachersTable: TeacherMap = columns
    .filter(c => ADMINISTRATION.indexOf(c) === -1)
    .reduce(toHash, {})

  for (let i = 0; i < parsed.length; i++) {
    const row = parsed[i]
    for (let j = 0; j < columns.length; j++) {
      const column = columns[j]
      const value = row[column]
      if (!value) continue

      const [, id, name] = teacherRgx.exec(value)!

      const teacher = {
        id,
        name,
        subject: column,
      }
      if (ADMINISTRATION.indexOf(column) >= 0) {
        adminsTable[column].push(teacher)
      } else {
        teachersTable[column].push(teacher)
      }
    }
  }

  return { adminsTable, teachersTable }
}

const Collective: FunctionComponent = () => {
  const { adminsTable, teachersTable } = useMemo(parseTeachers, [])

  return (
    <Content>
      <Typography variant='h1' className={styles.heading}>
        Колектив
      </Typography>
      <div>
        <Typography variant='h3' className={styles.subheading}>
          Ръководство
        </Typography>
        <div>
          {Object.keys(adminsTable).map(subject => (
            <div key={subject}>
              <Typography variant='h4' className={styles.subheading}>
                {subject}
              </Typography>
              <div className={styles.teacherContainer}>
                {adminsTable[subject].map(t => (
                  <TeacherCard key={t.id} {...t} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Typography variant='h3' className={styles.subheading}>
          Учители
        </Typography>
        <div>
          {Object.keys(teachersTable).map(subject => (
            <div key={subject}>
              <Typography variant='h4' className={styles.subheading}>
                {subject}
              </Typography>
              <div className={styles.teacherContainer}>
                {teachersTable[subject].map(t => (
                  <TeacherCard key={t.id} {...t} />
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
