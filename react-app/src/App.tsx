
import img1 from './assests/khairul.jpeg';
import Event from './Event';

function App() {

const name = 'Comrade';
const color ={
  color:"red",
  backgroundColor:"yellow"

}
  return (
    <>
    <div>
      <img src={img1} alt="image" style={{borderRadius:"50%"}} width="200px" />
       <h1>Hello <span style={color}>{name}</span> From React!!!</h1>
       <p>React is a JavaScript library for building user interfaces.</p>
    </div>
     <div>
     <Event />
     </div>
    </>
  )
}

export default App
