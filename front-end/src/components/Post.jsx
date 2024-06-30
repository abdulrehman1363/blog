import { useNavigate } from 'react-router-dom';

const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
};

const Post = ({ _id, title, content, author, createdAt }) => {
    const navigate = useNavigate();
    const handleReadMore = () => {
        navigate(`/post/${_id}`);
    };
  return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                <a href="#">
                    <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{title}</h5>
                    </a>
                    <p className="font-normal text-gray-700 mb-3">{truncateContent(content, 15)}</p>
                    <a onClick={handleReadMore} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="javascript:void(0)">
                        Read more
                    </a>
                </div>
            </div>
        </div>
  )
}

export default Post