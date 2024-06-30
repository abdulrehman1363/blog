import {useEffect, useState} from 'react'
import Post from './Post'
import { getPosts } from '../services/api'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            setLoading(true);
            const data = await getPosts();
            setPosts(data);
            console.log(posts)
          } catch (error) {
            console.error('Error fetching posts:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
    }, []);
    
    
    if(loading){
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-bold text-blue-500">Loading .... </h1>
            </div>
        )
        
    }

    return (
        <div className="flex flex-wrap">
            {
                posts.map(post => (
                    <Post key={post.id} {...post} />
                ))
            }
        </div>
    )
}

export default Home