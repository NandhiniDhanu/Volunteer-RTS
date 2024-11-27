import React, { useState } from 'react';
import './posts.css';
import { Cards } from '../../components';
import Description from './Description';

const Posts = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Volunteer Opportunity 1", description: "Join us to plant trees in the community. Join us to plant trees in the community. Join us to plant trees in the community.", date: "11/25/2024" },
    { id: 1, title: "Volunteer Opportunity 2", description: "Join us to plant trees in the community.", date: "11/26/2024" },
    { id: 1, title: "Volunteer Opportunity 3", description: "Assist at the local food bank this weekend.", date: "11/27/2024" },
    { id: 1, title: "Volunteer Opportunity 4", description: "Help organize a community charity event.", date: "11/28/2024" },
    { id: 1, title: "Volunteer Opportunity 4", description: "Help organize a community charity event.", date: "11/28/2024" },
    { id: 1, title: "Volunteer Opportunity 4", description: "Help organize a community charity event.", date: "11/28/2024" },
    { id: 1, title: "Volunteer Opportunity 4", description: "Help organize a community charity event.", date: "11/28/2024" },
    { id: 1, title: "Volunteer Opportunity 4", description: "Help organize a community charity event.", date: "11/28/2024" },
    { id: 1, title: "Volunteer Opportunity 4", description: "Help organize a community charity event.", date: "11/28/2024" },
    { id: 1, title: "Volunteer Opportunity 4", description: "Help organize a community charity event.", date: "11/28/2024" },

  ]);

  return (
    <div className="posts__container">
      <div className='all__posts'>
        <h1 className="posts__title">Volunteer Opportunities</h1>
        <Cards data={posts} variant="grid" />
      </div>
      <div className='posts__information'>
        <Description/>
      </div>
    </div>

  );
};

export default Posts;
