import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../Api/api"; // Adjust the import path as needed


export default function PostDetails() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = localStorage.getItem("role");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    fetchPost();
    fetchComments()
  }, [id]);

  const fetchPost = async () => {
    try {
      if (!id) return
      const response = await apiClient.get(`/api/get-content-by-id/${id}`);
      setPost(response?.data?.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };


  const fetchComments = async () => {
    try {
      if (!id) return
      const response = await apiClient.get(`/api/get-comments/${id}`);
      setComments(response?.data?.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await apiClient.post(`/api/post-comment`, {contentId: id, text: newComment });
      fetchComments()
      
    } catch (error) {
      
    }
    setNewComment("");
  };

  const renderCommentsSection = () => {
    if (!comments || comments.length === 0) {
      return null;
    }

    return (
      <div className="space-y-2 mb-4">
        {comments?.map((comment) => (
          <li key={comment.id} className="border-b pb-2 list-none">
            <p className="font-semibold">{comment.userName}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </div>
    );
  };

  const renderCommentInput = () => {
    if (role === "viewer" || role === "admin") {
      return (
        <div className="mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add comment"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      );
    } else if (!role) {
      return (
        <p className="text-gray-500 mt-2">
          Please <a style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }} href="/sign-in">login</a> to comment
        </p>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate(role === "admin" ? "/dashboard" : "/feed")}
          className="text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-4">
        <p>Post not found.</p>
        <button
          onClick={() => navigate(role === "admin" ? "/dashboard" : "/feed")}
          className="text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  if(!post) return "Loading..."
console.log(post, 'post')
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <button onClick={() => navigate(-1)} className="text-blue-600 underline">
        ← Back
      </button>
      <div className="bg-white border rounded-md overflow-hidden shadow">
        <div className="aspect-square bg-black">
          {post.file?.endsWith('.mp4') || post.file?.endsWith('.mov') ? (
            <video
              src={`${baseUrl}/${post.file}`}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={`${baseUrl}/${post.file}`}
              alt="Post"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-4 space-y-2">
          <p className="font-bold text-lg">{post.userName || "Unknown User"}</p>
          <p className="text-sm text-gray-600">{post.location}</p>
          <p>{post.caption}</p>
          <p className="font-semibold">{post.likes?.toLocaleString() || 0} likes</p>
        </div>
      </div>

      {
        <div className="bg-white p-4 rounded-md border shadow">
          <h2 className="font-semibold mb-2">Comments</h2>
          {renderCommentsSection()}
          {renderCommentInput()}
        </div>
      }
    </div>
  );
}