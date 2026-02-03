

import { Routes, Route, Navigate } from 'react-router'
import HomePage from './pages/HomePage'

import ProblemsPage from './pages/ProblemsPage'
import { useUser } from '@clerk/clerk-react'
import { Toaster } from 'react-hot-toast'
import DashBoardPage from './pages/DashBoardPage'
import ProblemPage from './pages/ProblemPage'
import { SignIn, SignUp } from "@clerk/clerk-react";
import SessionPage from './pages/SessionPage'

function App() {

  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return null;
  return (
    <>



      <Routes>
         {/* Clerk Auth Routes */}
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

        <Route path='/' element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route
          path='/dashboard'
          element={isSignedIn ? <DashBoardPage /> : <Navigate to={"/"} />}
        />

        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path='/problems/:id' element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
         <Route path='/session/:id' element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />


      </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App


