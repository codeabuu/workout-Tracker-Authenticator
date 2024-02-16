import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {useAuthCon} from './hooks/useAuth'
//pages and components
import Login from "./pages/login"
import Signup from "./pages/signup"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"

function App() {
  const {user} = useAuthCon()
  return (
    <div className="App">
      <BrowserRouter>
	<Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home />: <Navigate to='/login'/>} />
          </Routes>
           <Routes>
            <Route path="/login" element={!user ? <Login />: <Navigate to='/'/>} />
          </Routes>
           <Routes>
            <Route path="/signup" element={!user ? <Signup />: <Navigate to='/'/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
