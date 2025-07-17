import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Landing from './Pages/Landing'
import Login from './Pages/Login.tsx'
import SignUp from './Pages/SignUp.tsx'
import AddBook from './Pages/AddBook.tsx'
import AllBooks from './Pages/AllBooks.tsx'
import ProtectedRoute from './Component/ProtectedRoute.tsx'
import BookDetails from './Pages/BookDetails.tsx'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>}>
          </Route>
          <Route path={'/add-book'} element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>}>
          </Route>
          <Route path={'allBooks/'} element={
            <ProtectedRoute>
              <AllBooks types="all" />
            </ProtectedRoute>}>
          </Route>
          <Route path={'/uploads'} element={
            <ProtectedRoute>
              <AllBooks types="uploads" />
            </ProtectedRoute>}>
          </Route>
          <Route path={'/book/:id'} element={
            <ProtectedRoute>
              <BookDetails/>
            </ProtectedRoute>
          }>

          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path={'/signup'} element={<SignUp />}></Route>
        </Routes>
      </Router>
      <Toaster position='top-center' />
    </>
  )
}

export default App
