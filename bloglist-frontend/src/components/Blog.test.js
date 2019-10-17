import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom' 
import Blog from './Blog'

const blog = {
  title: "paska blogi",
  author: "sonkkeli",
  url: "www.google.fi",
  likes: 4,
  user: {
    username: "sonkkeli",
    name: "sonja",
    id: "5"
  },
  id: "6"
}

describe('<Blog />', () => {
  const mockAddLike = jest.fn()
  const mockDeleteBlog = jest.fn() 
  let c

  beforeEach(() => {
    c = render(
      <Blog blog={blog} addLike={mockAddLike} deleteBlog={mockDeleteBlog} />
    )
  })

  // 5.15*: blogilistan testit, step3
  test('renders blog so that likes are first not showing', () => {  
    expect(c.container).toHaveTextContent('paska blogi')
    expect(c.container).toHaveTextContent('sonkkeli')
    const div = c.getByTestId("blogs-toggleablepart")
    expect(div).toHaveStyle('display: none')
    // c.debug()
  })

  // 5.15*: blogilistan testit, step3
  test('after clicking the name, likes part will show up and liking works', () => {
    const text = c.getByText('paska blogi by sonkkeli')
    fireEvent.click(text)
    const div = c.getByTestId("blogs-toggleablepart")
    expect(div).not.toHaveStyle('display: none')

    const button = c.getByTestId('likebtn')
    fireEvent.click(button)
    expect(mockAddLike.mock.calls.length).toBe(1)
  })
})
