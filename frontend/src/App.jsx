import Form from "./components/form";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <div className="main">
          <h1>This Is A MERN Todo List</h1>
          <Form />
        </div>
      </div>
    </>
  );
}

export default App;
