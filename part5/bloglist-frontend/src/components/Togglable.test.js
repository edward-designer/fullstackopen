import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = screen.getByTestId('show-when-visible')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = screen.getByTestId('show-when-visible')
    expect(div).not.toHaveStyle('display: none')
  })

})