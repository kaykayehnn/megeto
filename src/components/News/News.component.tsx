import React, { FunctionComponent } from 'react'

import styles from './News.module.scss'
import Content from '@Components/Content'
import NewsGrid from '@Components/NewsGrid'

export interface NewsProps {}

const News: FunctionComponent<NewsProps> = () => {
  return (
    <Content>
      <NewsGrid />
    </Content>
  )
}

export default News
