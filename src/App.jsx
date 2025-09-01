import './App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import Favourite from './pages/Profile'
import NavBar from './components/NavBar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Favourite />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      </main>
    </MovieProvider>
    
  )
}

export default App
