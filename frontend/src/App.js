import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

/* components */
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

/* pages */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'
import Container from './components/layout/Container'

function App() {
  return (
   <Router>
      <Navbar />

      <Container>

        <Routes>

          <Route path="/login" element={<Login />} />
                
          <Route path="/register" element={<Register /> } />
                  
          <Route path='/' exact element={<Home />} />

        </Routes>

      </Container>
      
      <Footer />
    </Router>

  );
}

export default App;
