import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import AddBlog from './AddBlog'

test('<AddBlog /> mocking adding a new blog', async () => {
  const addBlogHandler =  jest.fn()
  const setMessageHandler =  jest.fn()
  const blogFormRef =  jest.fn()
  const user = userEvent.setup()

  render(<AddBlog addBlogHandler={addBlogHandler} setMessage={setMessageHandler} blogFormRef={blogFormRef} />)

  const input = screen.getAllByRole('textbox')

  await user.type(input[0], 'testing1' )
  await user.type(input[1], 'testing2' )
  await user.type(input[2], 'https://www.google.com' )

  const button = screen.getByText('Add')
  await user.click(button)

  expect(addBlogHandler).toHaveBeenCalledTimes(1)
  expect(addBlogHandler.mock.calls[0][0]).toBe('testing1')
})