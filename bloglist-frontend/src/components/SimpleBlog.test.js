import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: "paska blogi",
  author: "sonkkeli",
  url: "www.google.fi",
  likes: 4
}

describe('<SimpleBlog />', () => {
  const mockClick = jest.fn()
  let c

  beforeEach(() => {
    c = render(
      <SimpleBlog blog={blog} onClick={mockClick}/>
    )
  })

  // 5.13: blogilistan testit, step1
  test('renders title, author and likes', () => {  
    expect(c.container).toHaveTextContent('paska blogi')
    expect(c.container).toHaveTextContent('sonkkeli')
    expect(c.container).toHaveTextContent('blog has 4 likes')
  })

  // 5.14: blogilistan testit, step2
  test('liking twice works', () => {    
    const button = c.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockClick.mock.calls.length).toBe(2)
  })
})
