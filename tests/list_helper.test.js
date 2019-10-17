const listHelper = require('../utils/list_helper')
const blogs = require('./test-data').blogs

// 4.3: apufunktioita ja yksikkötestejä, step1
describe('dummy', () => {
  test('returns one', () => {
    expect(listHelper.dummy([])).toBe(1)
  })
})

// 4.4: apufunktioita ja yksikkötestejä, step2
describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals likes of that', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

// 4.5*: apufunktioita ja yksikkötestejä, step3
describe('favourite blog', () => {

  test('of empty list is empty', () => {
    expect(listHelper.favouriteBlog([])).toEqual('')
  })

  test('of a bigger list is selected right', () => {
    const expt = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(listHelper.favouriteBlog(blogs)).toEqual(expt)
  })
})

// 4.6*: apufunktioita ja yksikkötestejä, step4
describe('most blogs', () => {

  test('of empty list is empty', () => {
    expect(listHelper.favouriteBlog([])).toEqual('')
  })

  test('of a bigger list is selected right', () => {
    const expt = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(listHelper.mostBlogs(blogs)).toEqual(expt)
  })
})

// 4.7*: apufunktioita ja yksikkötestejä, step5
describe('most likes', () => {

  test('of empty list is empty', () => {
    expect(listHelper.mostLikes([])).toEqual('')
  })

  test('of a bigger list is selected right', () => {
    const expt = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(listHelper.mostLikes(blogs)).toEqual(expt)
  })
})