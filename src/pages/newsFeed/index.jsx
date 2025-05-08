import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../Api/api";
export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

  const handleClick = (post) => {
    navigate(`/post/${post._id}`, { state: { post } }); // Changed to post._id
  };

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
    <div className="p-4 flex flex-col gap-8 max-w-md mx-auto">
      {posts.length > 0 && posts.map((post) => (
        <div
          key={post._id} // Changed to post._id
          className="border rounded-md shadow-sm bg-white overflow-hidden"
          onClick={() => handleClick(post)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-white text-xs font-bold">
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
            <button className="text-gray-500 text-xl">⋮</button>
          </div>

          {/* Media */}
          <div className="aspect-square bg-black">
            {post.file.endsWith('.mp4') || post.file.endsWith('.mov') ? (
              <video
                src={`${baseUrl}/${post.file}`} // Adjust base URL as needed
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
              src={`${baseUrl}/${post.file}`} // Adjust base URL as needed
                alt="Post Media"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-4 py-2 text-xl">
            <div className="flex gap-4">
              <button>❤️</button>
              <button>💬</button>
            </div>
          </div>

          {/* Caption */}
          <div className="px-4 pb-4 text-sm">
            <p>
              <span className="font-semibold">{post.userName || "Unknown User"}</span>{" "}
              {post.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}