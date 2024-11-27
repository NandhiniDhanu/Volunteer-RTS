import React, { useState, useEffect } from "react";
import "./posts.css";
import { Cards } from "../../components";
import Description from "./Description";
import { MdAdd } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import AdminForm from "./AdminForm";
const Posts = () => {
  const { auth } = useAuth(); // Retrieve auth data from the context
  const [posts, setPosts] = useState([]); // Dynamic posts from backend
  const [newPost, setNewPost] = useState({ title: "", description: "" }); // New post state
  const [showAddForm, setShowAddForm] = useState(false); // Toggle form visibility

  const isAdmin = auth?.roles?.includes(5150);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/posts");
  
        const formattedPosts = response.data.map((post) => ({
          ...post,
          formattedDate: new Date(post.date).toLocaleDateString(), // Ensure this formats correctly
        }));
  
        console.log(formattedPosts); // Debug to confirm formattedDate is set correctly
        setPosts(formattedPosts); // Set formatted posts in state
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
  
    fetchPosts();
  }, []);

  // Handle adding a new post
  const handleAddPost = async (postData) => {
    if (!postData.title || !postData.description) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8000/posts", {
        ...postData,
        createdBy: auth?.user?.email, // Use logged-in admin's email
      });
  
      // Add the newly created post with a formatted date
      const addedPost = {
        ...response.data.post,
        formattedDate: new Date(response.data.post.date).toLocaleDateString(), // Format the date
      };
  
      setPosts((prevPosts) => [addedPost, ...prevPosts]); // Add new post to the list
      setShowAddForm(false); // Close the form
    } catch (err) {
      console.error("Error adding post:", err);
      alert("Failed to add post. Please try again.");
    }
  };
  

  return (
    <div className="posts__container">
      <div className="all__posts">
        <div className="posts__header">
          <h1 className="posts__title">Volunteer Opportunities</h1>
          {isAdmin && (
            <button
              className="addpost__button"
              onClick={() => setShowAddForm((prev) => !prev)} // Toggle add form
              aria-label="Add Post"
            >
              <MdAdd className="add-icon-posts" />
            </button>
          )}
        </div>
        {showAddForm && (
          <AdminForm
          onClose={() => setShowAddForm(false)} 
          onSubmit={handleAddPost} 
        />
        )}

        <Cards data={posts} variant="grid" />
      </div>
      <div className="posts__information">
        <Description />
      </div>
    </div>
  );
};

export default Posts;
