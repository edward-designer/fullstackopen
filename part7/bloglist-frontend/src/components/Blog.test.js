import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', function () {
  const blog = {
    author: 'Edward',
    id: '62a639c81c23f88506d521c7',
    likes: 101,
    title: 'New Blog',
    url: 'https://haanga.hk',
    user: '62a6496bc3b22737ebf30603'
  }
  const user = [0,0,0]
  const addLike = jest.fn()
  const deleteBlog = jest.fn()

  test('renders default content with title and author only', () => {
    render(<Blog blog={blog} />)

    //screen.debug()
    const title = screen.getByText('New Blog')
    expect(title).toBeDefined()

    const author = screen.findByText('Edward')
    expect(author).toBeDefined()

    const url = screen.queryByText('https://haanga.hk')
    expect(url).toBeNull()
  })

  test('clicking the div to show the details', async () => {
    render(<Blog blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />)

    //screen.debug()
    const tester = userEvent.setup()
    const expandDiv = screen.getByTestId('toggle-visibility')
    await tester.click(expandDiv)

    const url = screen.getByText('@')
    expect(url).toBeDefined()

    const likes = screen.queryByText('👍')
    expect(likes).toBeDefined()
  })

  test('clicking the like icon calls event handler once', async () => {
    render(<Blog blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />)

    const tester = userEvent.setup()
    const expandDiv = screen.getByTestId('toggle-visibility')
    await tester.click(expandDiv)

    const button = screen.getByTestId('like-icon')
    await tester.click(button)
    await tester.click(button)
    expect(addLike.mock.calls).toHaveLength(2)
  })
})