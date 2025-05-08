import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../Api/api";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleClick = () => {
    navigate(`/post/${post._id}`, { state: { post } });
  };

  return (
    <div className="bg-white border rounded-md overflow-hidden shadow-sm" onClick={handleClick}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 text-white text-xs font-bold flex items-center justify-center overflow-hidden">
            <img
              src={"https://avatar.iran.liara.run/public/boy"}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">{post.userName || "Unknown User"}</p>
            <p className="text-xs text-gray-500">{post.location}</p>
          </div>
        </div>
        <button className="text-gray-500">⋮</button>
      </div>

      {/* Media */}
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
            alt="Post Media"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Footer */}
      <div className="p-3 space-y-1 text-sm">
        <div className="flex justify-between text-xl">
          <div className="flex gap-4">
            <button>❤️</button>
            <button>💬</button>
          </div>
        </div>
        <p className="font-semibold">{post.likes?.toLocaleString() || 0} likes</p>
        <p className="line-clamp-2">
          <span className="font-semibold">{post.userName || "Unknown User"}</span>{" "}
          {post.caption}
        </p>
      </div>
    </div>
  );
};

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get("/api/get-all-content");
        setPosts(response?.data?.data?.reverse() || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}