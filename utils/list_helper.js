
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, {likes}) => total + likes, 0 );
}

const favoriteBlog = (blogs) => {
   return  blogs.sort( (a,b) => b.likes - a.likes)
}


module.exports = {
    dummy, totalLikes , favoriteBlog
}