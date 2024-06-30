import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPost } from '../services/api';

const SinglePost = () => {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const data = await getPost(id);
          setPost(data);
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-blue-500">Loading .... </h1>
            </div>
        )
    }
    
    if (!post) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-blue-500">Post Not Found </h1>
            </div>
        )
    }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg mb-5">
        <img className="w-full rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
        <div className="p-8">
          <h1 className="text-gray-900 font-bold text-3xl tracking-tight mb-5">{post.title}</h1>
          <div className="text-sm font-light text-gray-500 mb-5">
          {`${post.author.firstName} ${post.author.lastName}`} - {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <p className="font-normal text-gray-700 mb-5">{post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default SinglePost