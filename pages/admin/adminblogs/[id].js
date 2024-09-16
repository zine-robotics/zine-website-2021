import { doc, getDoc, deleteDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateNewBlog from "../../../components/Members/Admin/createblog";
// import BlogList from "../../components/Members/Admin/displayblogs";
// const Editor = dynamic(() => import("../../../Members/Admin/BlogEditor"), { ssr: false });
import Link from "next/link";
import dynamic from "next/dynamic";
const Blog = ({ blog }) => {

    const [subBlogs, setSubBlogs] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [content, setcontent] = useState([])
    const [existingBlogId, setexistingBlogId] = useState('')
    const router = useRouter();
    const { id } = router.query;
    console.log('Blog', blog)

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteDoc(doc(db, "blogs", blog.id));
        router.push('/admin/adminblogs');
    };

    const fetchBlogs = async () => {
        const q = query(collection(db, 'blogs'), where('parent_blog', '==', blog.id));
        const querySnapshot = await getDocs(q);
        setSubBlogs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    useEffect(() => {
        if (id) {
            fetchBlogs();
            settitle(blog.title);
            setdescription(blog.description)
            setcontent(blog.content || '')
            setexistingBlogId(blog.id);
        }
    }, [id]);

    const renderContent = (content) => {
        if (!content || !content.blocks) return null;

        return content.blocks.map((block) => {
            switch (block.type) {
                case 'paragraph':
                    return <p key={block.id} className="my-2 m-2">{block.data.text}</p>;
                case 'header':
                    return <h4 key={block.id} className="text-xl font-bold my-2 m-2">{block.data.text}</h4>;
                case 'image':
                    return <img key={block.id} src={block.data.file.url} alt={block.data.caption} className="my-2 m-2" />;
                default:
                    return null;
            }
        });
    };

    //   const renderSubBlogs = (subBlogs) => {
    //     return subBlogs.map((subBlog) => (

    //     ));
    //   };
    const BlogCard = (blogs) => {
        console.log(blogs)
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8 mt-12 lg:mx-16 xl:mx-32">
                {blogs.map((blog) => (
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
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <img src={blog.dp} alt={blog.title} className="w-full h-auto object-cover mb-4" />
            <p className="text-lg mb-4">{blog.description}</p>
            {renderContent(blog.content)}
            <button
                onClick={handleDelete}
                className={`mt-2 bg-red-600 text-white rounded-md p-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete Blog'}
            </button>
            <h4 className="mt-4 text-2xl font-semibold">Sub Blogs</h4>
            <CreateNewBlog title={title} content={content} description={description} existingBlogId={existingBlogId} />
            {BlogCard(subBlogs)}
        </div>
    );
};

export const getStaticPaths = async () => {
    const querySnapshot = await getDocs(collection(db, 'blogs'));
    return {
        paths: querySnapshot.docs.map((doc) => ({
            params: { id: doc.id },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({ params }) => {
    const { id } = params;
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    const blogData = { id: docSnap.id, ...docSnap.data() };
    return {
        props: {
            blog: blogData,
        },
    };
};

export default Blog;
