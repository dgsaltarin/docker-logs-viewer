import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

export const Router = () => (
  const [isLoggedIn, setIsLoggedIn] = useState(login);
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ResponsiveDrawer />} />
    </Routes>
  );
);
