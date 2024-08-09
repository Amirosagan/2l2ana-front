import { compareDesc, parseISO } from "date-fns"

// filter(boolean) becuase the array maybe empty (null , undefined), cx to avoid multible classes
export const cx = (...classNames) => classNames.filter(Boolean).join("")

export const sortBlogs = (blogs) => {
    return blogs.slice().sort((a,b)=> compareDesc(parseISO(a.publishedAt),parseISO(b.publishedAt)))
}
export const featuredBlogs = (blogs) => {
    // Assuming `sortBlogs` is a function that sorts blogs, we need to pass the `blogs` parameter to it
    return sortBlogs(blogs)
        // Assuming `isFeatured` is a property that indicates whether a blog post is featured
.filter(blog => blog.isfeatured === true);
}


