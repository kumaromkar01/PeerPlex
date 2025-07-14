import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Uploads from './Pages/Uploads.tsx'
import Login from './Pages/Login.tsx'
import SignUp from './Pages/SignUp.tsx'
import AddBook from './Pages/AddBook.tsx'
import AllBooks from './Pages/AllBooks.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <Router>  
      <Routes>
        <Route path={'/'} element={<App/>}></Route>
        <Route path={'/add-book'} element={<AddBook/>}></Route>
        <Route path={'allBooks/'} element={<AllBooks/>}></Route>
        <Route path={'/uploads'} element={<Uploads/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path={'/signup'} element={<SignUp/>}></Route>
      </Routes>
    </Router>
  </StrictMode>,
)
