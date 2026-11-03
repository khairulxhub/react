
import './App.css'
import Nav from './Nav'
import Foot from './Foot'
// import Home from './pages/Home'
import { Outlet } from 'react-router'

function App() {


  return (
    <>
      <Nav />
      <hr />
      <div className="container mx-auto">
 
 <Outlet />
      </div>
     
      <hr />
      <Foot />
    </>
  )
}

export default App
