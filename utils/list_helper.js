
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, {likes}) => total + likes, 0 )
}

const favoriteBlog = (blogs) => {
   const result = blogs.sort( (a,b) => b.likes - a.likes)
   return  result[0]
}


module.exports = {
    dummy, totalLikes , favoriteBlog
}