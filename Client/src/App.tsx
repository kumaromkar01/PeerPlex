import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Landing from './Pages/Landing'
import Uploads from './Pages/Uploads.tsx'
import Login from './Pages/Login.tsx'
import SignUp from './Pages/SignUp.tsx'
import AddBook from './Pages/AddBook.tsx'
import AllBooks from './Pages/AllBooks.tsx'
import ProtectedRoute from './Component/ProtectedRoute.tsx'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<ProtectedRoute><Landing/></ProtectedRoute>}></Route>
          <Route path={'/add-book'} element={<AddBook />}></Route>
          <Route path={'allBooks/'} element={<AllBooks />}></Route>
          <Route path={'/uploads'} element={<Uploads />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path={'/signup'} element={<SignUp />}></Route>
        </Routes>
      </Router>
      <Toaster position='top-center' />
    </>
  )
}

export default App
