import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  // 5.16*: blogilistan testit, step4
  test('if no user logged, blogs are not rendered', async () => {
    const c = render(<App />)
    c.rerender(<App />)
    await waitForElement(() => c.getByText('login'))

    expect(c.container).not.toHaveTextContent('testi by sonkkeli')
    expect(c.getByTestId('loginform')).toBeDefined()
  })

  // 5.17*: blogilistan testit, step5
  test('renders all blogs it gets from backend', async () => {
    const user = {
      "token": "6468g4e68gd46g8rth4sr6t8hsr31hrsj8sr6t8j",
      "username": "sonkkeli",
      "name": "Sonja Laurila"
    }

    localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
    const c = render(<App />)
    c.rerender(<App />)
    await waitForElement(() => c.getAllByTestId('blog-item'))

    expect(c.getAllByTestId('blog-item').length).toBe(2) 
    expect(c.container).toHaveTextContent('testi by sonkkeli')
    expect(c.container).toHaveTextContent('Hyvää huumoria by pieruperse')
  })
})