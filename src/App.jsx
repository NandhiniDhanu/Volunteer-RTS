import { useState } from 'react'
import { Login, Dashboard, Signup, AdminDashboard, Unauthorized, Posts } from './container'
import { Navbar } from './components'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Mainlayout from './components/Mainlayout'
import RequireAuth from './components/RequireAuth'
import MentorPage from './components/pages/MentorPage'
import TeamAdminPage from './components/pages/TeamAdminPage'

import './App.css'

const ROLES = {
  'User': 2001,
  'Admin': 5150,
  'Mentor': 3001,
  'TeamAdmin': 4001
}

const App = () => {
  return (
      <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Signup />} />
              <Route path="unauthorized" element={<Unauthorized />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route element={<Mainlayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
              </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route element={<Mainlayout />}>
                  <Route path="admin_dashboard" element={<AdminDashboard />} />
              </Route>
          </Route>

          {/* Mentor Route */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route element={<Mainlayout />}>
                  <Route path="mentor" element={<MentorPage />} />
              </Route>
          </Route>

          {/* Team Admin Route */}
          <Route element={<RequireAuth allowedRoles={[ROLES.TeamAdmin]} />}>
              <Route element={<Mainlayout />}>
                  <Route path="team-admin" element={<TeamAdminPage />} />
              </Route>
          </Route>

          {/* Shared Protected Route for All Roles */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Mentor, ROLES.TeamAdmin]} />}>
              <Route element={<Mainlayout />}>
                  <Route path="posts" element={<Posts />} />
              </Route>
          </Route>
      </Routes>
  );
};
export default App;
