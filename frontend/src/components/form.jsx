import { useState } from "react";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setShowPopup(true); // show popup
        setTitle(""); // clear form
        setDescription("");
        // hide popup after 2 seconds
        setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onTitleChange = (e) => {
    setTitle(() => e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(() => e.target.value);
  };

  // console.log(description);
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className="input-field">
          <label htmlFor="title">Title : </label>
          <input
            onChange={onTitleChange}
            type="text"
            id="title"
            name="title"
            placeholder="Enter Subject Title"
            value={title}
          />
        </div>

        <div className="input-field">
          <label htmlFor="description">Enter Description : </label>
          <textarea
            onChange={onDescriptionChange}
            name="description"
            id=""
            cols="30"
            rows="2"
            placeholder="You can write anything here"
            maxLength={2000}
            value={description}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* Popup */}
      {showPopup && (
        <div>
          <h1>Todo created successfully!</h1>
        </div>
      )}
    </>
  );
};

export default Form;
