import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <h1>This Is A MERN Todo List</h1>
        <form action="" method="get">
          <div className="input-field">
            <label htmlFor="name">Enter your Name : </label>
            <input type="text" id="name" name="name" placeholder="Enter Name" />
          </div>

          <div className="input-field">
            <label htmlFor="age">Enter Age : </label>
            <input
              type="number"
              name="age"
              id="age"
              min="0"
              max="200"
              defaultValue={0}
              placeholder="Enter Age"
            />
          </div>

          <div className="input-field">
            <label htmlFor="location">Enter Location : </label>
            <input
              type="text"
              name="location"
              id="location"
              defaultValue={"New Delhi"}
              placeholder="Enter Location"
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Enter Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter  Email"
              defaultValue={"test@example.com"}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
