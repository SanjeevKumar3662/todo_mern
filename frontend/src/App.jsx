import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <h1>This Is A MERN Todo List</h1>

        <form action="" method="get">
          <div className="input-field">
            <label htmlFor="name">Title : </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Subject Title"
            />
          </div>

          <div className="input-field">
            <label htmlFor="discription">Enter Discription : </label>
            <textarea
              name="discription"
              id=""
              cols="30"
              rows="2"
              placeholder="You can write anything here"
              maxLength={2000}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
