import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../../firebase";
import { writeBatch, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import FileResizer from "react-image-file-resizer";
import Image from "next/image";

const Editor = dynamic(() => import("./BlogEditor"), { ssr: false });

interface IBlogData {
  title?: string;
  description?: string;
  content?: any;
  existingBlogId?: string; 
  url?: string;
}

const CreateNewBlog = ({ title, description, content, existingBlogId, url }: IBlogData) => {
  const [width, setWidth] = useState(990);
  const [height, setHeight] = useState(500);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: title || '',
    description: description || '',
    content: content || [],
    dp: '',
    parent_blog: existingBlogId || '',
  });

  useEffect(() => {
    if (existingBlogId) {
      setFormData({
        title: title || '',
        description: description || '',
        content: content || [],
        dp: url !== undefined ? url : '',
        parent_blog: existingBlogId,
      });
    }
  }, [existingBlogId, title, description, content, url]);

  const renderContent = (content) => {
    if (!content || !content.blocks) return null;
    console.log("width ", width,"height", height)
    return content.blocks.map((block) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={block.id} className="my-2 m-2">{block.data.text}</p>;
        case 'header':
          return <h2 key={block.id} className="text-xl font-bold my-2 m-2">{block.data.text}</h2>;
        case 'image':
          return (
            <>
            <div className="flex justify-center flex-col">
              <img key={block.id} src={block.data.file.url} alt={block.data.caption} style={{ width: `${width}%`, height: `${height}%` }} className="my-2 m-2" />
              <div className="flex justify-center my-2">
                <button onClick={() => setWidth(width + 10)} className="px-2 py-1 mx-1 bg-blue-500 text-white rounded">Scale Up</button>
                <button onClick={() => setWidth(width - 10)} className="px-2 py-1 mx-1 bg-red-500 text-white rounded">Scale Down</button>
                <button onClick={() => setHeight(height + 10)} className="px-2 py-1 mx-1 bg-blue-500 text-white rounded">Height Up</button>
                <button onClick={() => setHeight(height - 10)} className="px-2 py-1 mx-1 bg-red-500 text-white rounded">Height Down</button>
              </div>
              </div>
            </>
          );
        default:
          return null;
      }
    });
  };

  const handleChange = useCallback((field) => (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: e.target.value,
    }));
  }, []);

  const handleContentChange = useCallback((content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content,
    }));
  }, []);

  const handleDpChange = async (e) => {
    const storage = getStorage();
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setFormData((prevFormData) => ({
          ...prevFormData,
          dp: url,
        }));
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      description: formData.description,
      dp: formData.dp,
      content: formData.content,
      parent_blog: formData.parent_blog || null,
    };

    const batch = writeBatch(db);
    if (existingBlogId) {
      const docRef = doc(db, "blogs", existingBlogId);
      batch.set(docRef, data);
    } else {
      const newBlogId = uuidv4();
      const docRef = doc(db, "blogs", newBlogId);
      batch.set(docRef, { ...data, id: newBlogId });
    }

    await batch.commit();
    router.push('/admin/blogsdisplay');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 m-2 bg-white rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange('title')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange('description')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content:
            <Editor
              data={formData.content}
              onChange={handleContentChange}
              holder="content"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Display Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handleDpChange}
              className="mt-1 block w-full text-gray-700"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Width:
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Height:
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-100"
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white text-sm font-bold rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
          >
            {existingBlogId ? 'Update Blog' : 'Submit'}
          </button>
        </div>
      </form>
      <div>
        <h5 className="text-2xl font-semibold p-2 m-2">Output</h5>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
          <Image
            src={formData.dp}
            alt={formData.title}
             width={width}
             height={height}
             layout="intrinsic"
            // sizes="(max-width: 768px) 100vw,
            //   (max-width: 1200px) 50vw,
            //   33vw"
            
            className="w-full h-auto object-cover mb-4"
          />
          <p className="text-lg mb-4">{formData.description}</p>
          {renderContent(formData.content)}
        </div>
      </div>
    </>
  );
};

export default CreateNewBlog;
