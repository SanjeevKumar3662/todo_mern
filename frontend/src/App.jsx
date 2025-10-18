import "./App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <div className="main">
          <h1>This is a "MERN" Todo List</h1>
          <Form />
          <Todos />
        </div>
      </div>
    </>
  );
}

export default App;
