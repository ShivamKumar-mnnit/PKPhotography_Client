import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ placeholder }) {

  const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(
		() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);
  
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized', // Default category
    content: '',
    image: null,
  });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = () => {
    if (!file) {
      setImageUploadError("Please select an image to upload");
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", file);
    formDataToUpload.append("upload_preset", "unsigned_preset"); // Replace with your Cloudinary upload preset

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dihpvnfdx/image/upload"; // Replace with your Cloud Name

    const xhr = new XMLHttpRequest();

    xhr.open("POST", cloudinaryUrl, true);

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setImageUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setFormData((prev) => ({ ...prev, image: data.secure_url })); // Update formData with the image URL
        setImageUploadProgress(null);
        setImageUploadError(null);
      } else {
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      }
    };

    xhr.onerror = () => {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    };

    xhr.send(formDataToUpload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if title and content are provided
    if (!formData.title || !formData.content) {
      setPublishError("Please fill in the title and content.");
      return;
    }

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || "An error occurred while publishing the post.");
        return;
      }

      if (res.ok) {
        setPublishError(null);
        // Clear the form data after successful submission
        setFormData({
          title: '',
          category: 'uncategorized',
          content: '',
          image: null,
        });
        setFile(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="Photography">Photography</option>
            <option value="Videography">Videography</option>
            <option value="Products">Products</option>
            <option value="Shoot">Shoot</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded"
            className="w-full h-72 object-contain"
          />
        )}

<JoditEditor
			ref={editor}
			value={formData.content}
			config={config}
			tabIndex={1} 
			onBlur={(newContent) => setContent(newContent)} 
			onChange={(value) => setFormData({ ...formData, content: value })}
		/>


        {/* <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        /> */}
        <Button type="submit" gradientDuoTone="purpleToPink" size="lg">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
