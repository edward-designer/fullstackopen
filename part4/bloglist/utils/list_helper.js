const dummy = () => {
    return 1
}

const totalLikes = (blog) => {
    return blog.reduce((acc,post) => acc + post.likes, 0)
}

const favoriteBlog = (blog) => {
    let maxLikes = 0
    let mostLikedPostIndex = 0
    blog.forEach((post,index) => {
        if(post.likes>maxLikes){
            maxLikes = post.likes
            mostLikedPostIndex =  index
        }
    })
    return (blog[mostLikedPostIndex])
}

const mostBlogs = (blog) => {
    const authorList = blog.map(post => post.author).sort()
    let currentAuthor = ''
    let currentCount = 0
    let maxAuthor = ''
    let maxCount = 0
    authorList.forEach(author => {
        if(author!==currentAuthor){
            currentAuthor = author
            currentCount = 1
        }else{
            currentCount++
        }
        if(currentCount > maxCount){
            maxAuthor = currentAuthor
            maxCount = currentCount
        }
    })
    return ({ author:maxAuthor, blogs:maxCount })
}

const mostLikes = (blog) => {
    const authorList = blog.map(post => ({ author:post.author,likes:post.likes })).sort((a,b) => a.author-b.author)
    let currentAuthor = ''
    let currentLikes = 0
    let maxAuthor = ''
    let maxLikes = 0
    authorList.forEach(({ author,likes }) => {
        if(author!==currentAuthor){
            currentAuthor = author
            currentLikes = likes
        }else{
            currentLikes += likes
        }
        if(currentLikes > maxLikes){
            maxAuthor = currentAuthor
            maxLikes = currentLikes
        }
    })
    return ({ author:maxAuthor, likes:maxLikes })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}