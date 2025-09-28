import './App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MovieDetails from './pages/MovieDetails'
import PersonDetails from './pages/PersonDetails'
import GenrePage from './pages/GenrePage'
import SearchResults from './components/SearchResults'

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route 
          path='/profile' 
          element={
            <Profile />
          } 
        />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path="/person/:id" element={<PersonDetails />} /> 
        <Route path='/genre/:id' element={<GenrePage />} />
        <Route path='/search/:query' element={<SearchResults />} />
      </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
