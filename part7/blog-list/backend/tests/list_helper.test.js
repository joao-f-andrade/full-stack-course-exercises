const listHelper = require('../utils/list_helper')
const list_helper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
}, {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}, {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
}, {
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
}, {
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0
}, {
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favouriteBlog',  ()  =>  {
  test('of empty list returns empty', ()  =>  {
    expect(listHelper.favouriteBlog([])).toBe('')
  })

  test('of one blog returns same',()  =>  {
    expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('of several blogs resturns blogObject with most likes',  ()  =>  {
    expect(list_helper.favouriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('mostBlogs',  ()  =>  {
  test('of empty list returns empty', ()  =>  {
    expect(listHelper.mostBlogs([])).toBe('')
  })

  test('of one blog returns same',()  =>  {
    const  blogCounter = {
      author:  'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(blogCounter)
  })

  test('of several blogs returns the author with most blogs and how many',  ()  =>  {
    const blogCounter  =  {
      author:  'Robert C. Martin',
      blogs:  3
    }
    expect(list_helper.mostBlogs(blogs)).toEqual(blogCounter )
  })
})
describe('mostLikes',  ()  =>  {
  test('of empty list returns empty', ()  =>  {
    expect(listHelper.mostLikes([])).toBe('')
  })

  test('of one blog returns same',()  =>  {
    const  likeCounter = {
      author:  'Edsger W. Dijkstra',
      likes: 5
    }
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(likeCounter)
  })

  test('of several blogs returns the author with most likes and how many',  ()  =>  {
    const likeCounter  =  {
      author:  'Edsger W. Dijkstra',
      likes:  12
    }
    expect(list_helper.mostLikes(blogs)).toEqual(likeCounter )
  })
})