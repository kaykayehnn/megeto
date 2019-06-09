import React from 'react'
import { render } from '@testing-library/react'

import Home from '.'

describe('Home Component', () => {
  it('renders', () => {
    render(<Home />)
  })
})
