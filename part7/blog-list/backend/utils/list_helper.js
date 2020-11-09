const lodash  =  require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs)  =>  {
  const  summ  =  (accumulator, currentValue)  =>  accumulator +  currentValue.likes
  const total = blogs.reduce( summ,0)
  return total
}


const favouriteBlog = (blog)  =>  {
  if (blog.length===0){return('')}
  const findLikes  =  (newBlog, oldBlog)  =>  {
    if (typeof oldBlog === 'number') {return newBlog}
    return newBlog.likes>oldBlog.likes?newBlog:oldBlog
  }
  const fav =  blog.reduce(findLikes,0)
  return fav
}

const mostBlogs  =  (blogs)  =>  {
  if  (blogs.length  ===  0)  {return ''}
  const blogsSorted  =  lodash.groupBy(blogs, 'author')
  const arr =  []
  lodash.forOwn(blogsSorted,(value,key)  =>  {arr.push({ blogs:value.length,author:key })})
  const  author  =  lodash.orderBy(arr,'blogs','desc')
  return author[0]
}

const mostLikes  =  (blogs)  =>  {
  if  (blogs.length  ===  0)  {return''}
  const author  =  lodash.orderBy(blogs,'likes','desc')
  return {
    author: author[0].author,
    likes: author[0].likes
  }
}
module.exports= {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}