import { useState } from "react";

function UploadContent() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [metadata, setMetadata] = useState({
    title: "",
    caption: "",
    location: "",
    people: "",
    hashtags: [],
  });
  const [currentTag, setCurrentTag] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setMetadata({
      ...metadata,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const getMediaType = (file) => {
    if (!file) return null;
    return file.type.startsWith('video/') ? 'Video' : 'Image';
  };

  const handleTagChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const addTag = () => {
    if (currentTag.trim() && !metadata.hashtags.includes(currentTag.trim())) {
      setMetadata({
        ...metadata,
        hashtags: [...metadata.hashtags, currentTag.trim()]
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setMetadata({
      ...metadata,
      hashtags: metadata.hashtags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const mediaType = getMediaType(file);
    if (!mediaType) {
      alert("Unsupported file type!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", metadata.title);
    formData.append("caption", metadata.caption);
    formData.append("location", metadata.location);
    formData.append("people", metadata.people);
    formData.append("hashtags", JSON.stringify(metadata.hashtags));
    formData.append("mediaType", mediaType); // Added mediaType

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${baseUrl}/api/create-content`);
      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 201) {
            alert("Upload Successful!");
            setFile(null);
            setUploadProgress(0);
            setMetadata({ 
              title: "", 
              caption: "", 
              location: "", 
              people: "", 
              hashtags: []
            });
          } else {
            alert("Upload Failed!");
          }
        }
      };

      xhr.send(formData);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Media</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={metadata.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border rounded"
        />
        <textarea
          name="caption"
          value={metadata.caption}
          onChange={handleChange}
          placeholder="Caption"
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="location"
          value={metadata.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="people"
          value={metadata.people}
          onChange={handleChange}
          placeholder="People Present (comma separated)"
          className="w-full p-3 border rounded"
        />

        {/* Tags Input */}
        <div>
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={currentTag}
              onChange={handleTagChange}
              onKeyDown={handleKeyDown}
              placeholder="Add tags"
              className="flex-1 p-3 border rounded-l"
            />
            <button
              onClick={addTag}
              className="bg-blue-500 text-white px-4 py-3 rounded-r hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {metadata.hashtags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
              >
                <span>{tag}</span>
                <button 
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-dashed p-6 text-center rounded">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer text-blue-600">
            Upload a file or drag and drop
          </label>
          <p className="text-sm text-gray-500 mt-2">MP4, MOV, AVI, JPG, PNG up to 1GB</p>

          {file && (
            <p className="mt-4 text-green-600">
              Selected: {file.name} ({getMediaType(file)})
            </p>
          )}
        </div>

        {uploadProgress > 0 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm mt-2">Uploading... {uploadProgress}%</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadContent;