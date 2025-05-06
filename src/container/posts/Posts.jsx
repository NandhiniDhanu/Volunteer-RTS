import React, { useState, useEffect } from "react";
import "./posts.css";
import { Cards } from "../../components";
import Description from "./Description";
import { MdAdd } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import AdminForm from "./AdminForm";

const Posts = () => {
  const { auth } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Changed to handle both types

  const isAdmin = auth?.roles?.includes(5150);

  // Mock tasks data
  const mockTasks ={ 
    myTasks: [
    {
      id: 1,
      title: "Food Section",
      description: "Manage food Distribution for the event",
      formattedDate: new Date().toLocaleDateString(),
      type: 'task'
    },
    {
      id: 2,
      title: "Safety Patrol",
      description: "Monitor event safety and security",
      formattedDate: new Date(Date.now() + 86400000).toLocaleDateString(),
      type: 'task'
    }
  ],

  assignedTasks: [
    {
      id: 3,
      title: "Setup Equipment",
      description: "Prepare all audio/visual equipment",
      formattedDate: new Date(Date.now() + 2 * 86400000).toLocaleDateString(),
      type: 'task'
    }
  ],
  completedTasks: [
    {
      id: 4,
      title: "Volunteer Recruitment",
      description: "Completed recruiting 20 volunteers",
      formattedDate: new Date(Date.now() - 86400000).toLocaleDateString(),
      type: 'task'
    }
  ],
  pendingTasks: [
    {
      id: 5,
      title: "Final Review",
      description: "Pending final approval from management",
      formattedDate: new Date(Date.now() + 3 * 86400000).toLocaleDateString(),
      type: 'task'
    }
  ]};

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/posts");
        const formattedPosts = response.data.map((post) => ({
          ...post,
          formattedDate: new Date(post.date).toLocaleDateString(),
          type: 'post' // Add type identifier
        }));
        setPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = async (postData) => {
    if (!postData.title || !postData.description) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/posts", {
        ...postData,
        createdBy: auth?.user?.email,
      });
      const addedPost = {
        ...response.data.post,
        formattedDate: new Date(response.data.post.date).toLocaleDateString(),
        type: 'post'
      };
      setPosts((prevPosts) => [addedPost, ...prevPosts]);
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding post:", err);
      alert("Failed to add post. Please try again.");
    }
  };

  return (
    <div className="posts__container">
      <div className="all__posts">
        {/* Volunteer Opportunities Section */}
        <div className="section-container">
          <div className="posts__header">
            <h1 className="posts__title">Volunteer Opportunities</h1>
            {isAdmin && (
              <button
                className="addpost__button"
                onClick={() => setShowAddForm((prev) => !prev)}
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
          <Cards data={posts} variant="grid" onCardClick={setSelectedItem} />
        </div>

        {/* Tasks Section */}
        <div className="section-container" style={{ marginTop: '40px' }}>
          <div className="posts__header">
            <h1 className="posts__title">My Tasks</h1>
            {isAdmin && (
              <button className="addpost__button" aria-label="Add Task">
                <MdAdd className="add-icon-posts" />
              </button>
            )}
          </div>
          <Cards data={mockTasks.myTasks} variant="grid" onCardClick={setSelectedItem} />
        </div>
        {/* Assigned Tasks Section */}
  <div className="section-container" style={{ marginTop: '40px' }}>
    <div className="posts__header">
      <h1 className="posts__title">Assigned Tasks</h1>
    </div>
    <Cards data={mockTasks.assignedTasks} variant="grid" onCardClick={setSelectedItem} />
  </div>

  {/* Completed Tasks Section */}
  <div className="section-container" style={{ marginTop: '40px' }}>
    <div className="posts__header">
      <h1 className="posts__title">Completed Tasks</h1>
    </div>
    <Cards data={mockTasks.completedTasks} variant="grid" onCardClick={setSelectedItem} />
  </div>

  {/* Pending Tasks Section */}
  <div className="section-container" style={{ marginTop: '40px' }}>
    <div className="posts__header">
      <h1 className="posts__title">Pending Tasks</h1>
    </div>
    <Cards data={mockTasks.pendingTasks} variant="grid" onCardClick={setSelectedItem} />
  </div>


      </div>

      <div className="posts__information">
        <Description item={selectedItem} /> {/* Changed prop name */}
      </div>
    </div>
  );
};

export default Posts;