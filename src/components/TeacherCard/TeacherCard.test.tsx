import React from 'react'
import { render } from '@testing-library/react'

import TeacherCard from '.'

describe('TeacherCard Component', () => {
  it('renders', () => {
    render(<TeacherCard id='0' name='Vasko' subject='Maths' />)
  })
})
