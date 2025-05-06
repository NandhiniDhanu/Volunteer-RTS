// src/pages/DashboardPage.jsx
import React from 'react';
import AssignedTasksBlock from '../components/TaskBlocks/AssignedTasksBlock';
import '../components/TaskBlocks/TaskBlocks.css';

const DashboardPage = () => {
  const assignedTasks = [
    { id: 1, title: 'Update documentation', dueDate: 'Tomorrow' },
    { id: 2, title: 'Fix styling issues', dueDate: 'Friday' },
    { id: 3, title: 'Code review', dueDate: 'Today' }
  ];

  return (
    <div className="dashboard-container">
      <h1>Volunteer Dashboard</h1>
      <div className="task-blocks-container">
        <AssignedTasksBlock 
          count={assignedTasks.length}
          tasks={assignedTasks}
          onBlockClick={() => console.log('Assigned tasks clicked')}
        />
        {/* Add other blocks here when ready */}
      </div>
    </div>
  );
};

export default DashboardPage;