import Img1 from "./assets/img/img1.png";
import Event from "./Event";
function App() {
  const name = "Raju";
  const color = {
    color: "red",
    fontSize: "50px",
  };
  return (
    <>
      <div>
        <img
          src={Img1}
          alt="Image"
          style={{ borderRadius: "20px", width: "200px" }}
        />
        <h1>
          Hello <span style={color}>{name}</span> from React!
        </h1>
        <p>New para</p>
      </div>
      <div>
        <Event />
      </div>
    </>
  );
}

export default App;
