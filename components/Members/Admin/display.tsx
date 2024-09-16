import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc , query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BlogList = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    
    const fetchAllBlogs = async () => {
        try {
            const blogsCollection = collection(db, 'blogs');
            const q = query(blogsCollection, where('parent_blog', '==', null));
            const blogsSnapshot = await getDocs(q);
            const blogsList = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Fetched blogs list:', blogsList);
            return blogsList;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            const blogsList = await fetchAllBlogs();
            setBlogs(blogsList);
            console.log('Fetched blogs:', blogsList);
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id: number | undefined) => {
        try {
            await deleteDoc(doc(db, 'blogs', id));
            setBlogs(blogs.filter(blog => blog.id !== id));
            console.log(`Blog with id ${id} deleted`);
            router.push('/admin/blogsdisplay')
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const renderContent = (content) => {
        if (!content || !content.blocks) return null;

        return content.blocks.map(block => {
            switch (block.type) {
                case 'paragraph':
                    return <p key={block.id} className="my-2 m-2">{block.data.text}</p>;
                case 'header':
                    return <h2 key={block.id} className="text-xl font-bold my-2 m-2">{block.data.text}</h2>;
                case 'image':
                    return <img key={block.id} src={block.data.file.url} alt={block.data.caption} className="my-2 m-2" />;
                default:
                    return null;
            }
        });
    };

    const renderSubBlogs = (parentBlogId) => {
        return blogs
            .filter(blog => blog.parent_blog === parentBlogId)
            .map(subBlog => (
                <div key={subBlog.id} className="ml-5 border-l-2 border-gray-200 pl-4">
                    <h4 className="text-lg font-semibold">{subBlog.title}</h4>
                    <p className="text-gray-700">{subBlog.description}</p>
                    {renderContent(subBlog.content)}
                    <button
                        onClick={() => handleDelete(subBlog.id)}
                        className="mt-2 text-red-600 hover:text-red-800"
                    >
                        Delete
                    </button>
                    {renderSubBlogs(subBlog.id)}
                </div>
            ));
    };

    const BlogCard = ({ blogs }) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 mt-12 lg:mx-16 xl:mx-32">
                {blogs.map((blog) => (
                    console.log(blog),
                    console.log('blogdp',blog.dp),
                    <Link key={blog.id} href={`/admin/adminblogs/${blog.id}`} passHref>
                        <div className="col-span-1 shadow-xl p-4 flex flex-col rounded-lg hover:bg-gray-100 cursor-pointer">
                            <img src={blog.dp} className="w-full h-auto object-cover" alt={blog.title} />
                            <h1 className="text-xl my-4 px-2">{blog.title}</h1>
                            <p className="flex-1 px-2">{blog.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <BlogCard blogs={blogs} />
        </div>
    );
};

export default BlogList;
