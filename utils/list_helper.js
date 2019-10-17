const dummy = ( blogs ) => {
  return 1
}

const totalLikes = ( blogs ) => {
  var likes = 0
  for ( var i = 0 ; i < blogs.length ; i++ ){
    likes += blogs[i].likes
  }
  return likes
}

const favouriteBlog = ( blogs ) => {
  if (blogs.length === 0) return ''

  var maxLikes = 0
  var favBlog = ''
  for ( var i = 0 ; i < blogs.length ; i++ ){
    if (blogs[i].likes > maxLikes){
      maxLikes = blogs[i].likes
      favBlog = blogs[i]
    }
  }

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return ''

  var bloggers = [...new Set(blogs.map(b => b.author))]
  var bloggersWithBlogs = []
  for ( var i = 0; i < bloggers.length; i++){
    bloggersWithBlogs.push({
      author: bloggers[i],
      blogs: blogs.filter( a => a.author == bloggers[i]).length
    })
  }

  return bloggersWithBlogs.reduce((previous, current) => (previous.blogs > current.blogs) ? previous : current )
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return ''

  var bloggers = [...new Set(blogs.map(b => b.author))]
  var bloggersWithLikes = []
  for ( var i = 0; i < bloggers.length; i++){
    var bloggersBlogs = blogs.filter( a => a.author == bloggers[i])
    bloggersWithLikes.push({
      author: bloggers[i],
      likes: bloggersBlogs.reduce((previous, current) => previous + current.likes, 0) // muista alkuarvo tai kämmää
    })
  }

  return bloggersWithLikes.reduce((previous, current) => (previous.likes > current.likes) ? previous : current )
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}