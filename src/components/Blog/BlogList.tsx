import React, { useState, useEffect } from 'react';
// import { Button } from 'antd';
import { fetchBlogs } from './blogApi';
import { Blog } from './Blog';
import BlogCard from './BlogCard';

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetchBlogs()
            .then(data => setBlogs(data))
            .catch(error => console.error('Error:', error));
    }, []);


    return (
        <>
            <BlogCard blogs={blogs} />
        </>
    );
};

export default BlogList;
