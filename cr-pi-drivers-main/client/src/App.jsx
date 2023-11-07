// import './App.css'
import Cards from './components/Cards/Cards'
import { Routes, Route, useLocation} from "react-router-dom";
import Nav from './components/Nav/Nav';
import LandingPage from "./components/LandingPage/LandingPage";
import Form from "./components/Form/Form";
import Details from './components/Details/Details';
import HomePage from "./components/HomePage/HomePage";

function App() {
  const location = useLocation();
  return (
    <>
       {location.pathname !== "/" ? <Nav /> : null}
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/detail/:id' element={<Details/>}/>
        </Routes>
    </>
  )
}

export default App
