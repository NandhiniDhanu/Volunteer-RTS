import { useState } from 'react'
import { Login, Dashboard, Signup, AdminDashboard, Unauthorized, Posts } from './container'
import { Navbar } from './components'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Mainlayout from './components/Mainlayout'
import RequireAuth from './components/RequireAuth'

import './App.css'

const ROLES = {
  'User': 2001,
  'Admin': 5150
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
           {/* Shared Protected Route for Both Roles */}
           <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
                <Route element={<Mainlayout />}>
                    <Route path="posts" element={<Posts />} />
                </Route>
            </Route>
      </Routes>
  );
};
export default App;
