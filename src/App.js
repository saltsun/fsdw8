import React, { useState } from "react";
import "./styles.css";

const BookList = ({ books, onDelete }) => (
  <ul>
    {books.map((book, index) => (
      <li key={index}>
        <img src={book.image} alt={book.title} />
        <div>
          <strong>{book.title}</strong>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

const BookForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && imageUrl.trim() !== "") {
      onAdd({ title, image: imageUrl });
      setTitle("");
      setImageUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <button type="submit">Add Book</button>
    </form>
  );
};

const App = () => {
  const [books, setBooks] = useState([]);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const deleteBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  return (
    <div>
      <h1>Book List</h1>
      <BookForm onAdd={addBook} />
      <BookList books={books} onDelete={deleteBook} />
    </div>
  );
};

export default App;
