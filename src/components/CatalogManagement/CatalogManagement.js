import React, { useState, useEffect } from "react";
import axios from "../services/api"; // Import the Axios instance

function CatalogManagement() {
  const [books, setBooks] = useState([]); // State to store the list of books
  const [newBook, setNewBook] = useState(""); // State for new book title
  const [author, setAuthor] = useState(""); // State for new book author
  const [isbn, setIsbn] = useState(""); // State for ISBN
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [editBook, setEditBook] = useState(null); // State for book being edited

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books from the API
  const fetchBooks = (searchQuery = "") => {
    const url = searchQuery 
      ? `/books/?search=${encodeURIComponent(searchQuery)}`
      : '/books/';
    
    axios.get(url)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        alert("Error: " + (error.response?.data?.message || "Failed to fetch books. Is the backend running?"));
      });
  };

  // Function to generate a random 13-digit ISBN
  const generateRandomISBN = () => {
    let randomNumber = "";
    for (let i = 0; i < 13; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  };

  // Handle the form submission to add or update a book
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newBook.trim() === "") {
      alert("Book title cannot be empty!");
      return;
    }
    if (author.trim() === "") {
      alert("Author name cannot be empty!");
      return;
    }

    const bookData = {
      title: newBook,
      author: author,
      isbn: isbn || generateRandomISBN(),
      available: true
    };

    if (editBook) {
      // Update existing book
      axios
        .put(`/books/${editBook.id}/`, bookData)
        .then(() => {
          fetchBooks(searchTerm);
          setNewBook("");
          setAuthor("");
          setIsbn("");
          setEditBook(null);
          alert("Book updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating the book:", error);
          alert("Failed to update book. Please try again.");
        });
    } else {
      // Add new book
      axios
        .post("/books/", bookData)
        .then((response) => {
          fetchBooks(searchTerm);
          setNewBook("");
          setAuthor("");
          setIsbn("");
          alert("Book added successfully!");
        })
        .catch((error) => {
          console.error("Error adding the book:", error);
          alert("Failed to add book. Please try again.");
        });
    }
  };

  // Function to delete a book
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`/books/${id}/`)
        .then(() => {
          fetchBooks(searchTerm);
          alert("Book deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting the book:", error);
          alert("Failed to delete book. Please try again.");
        });
    }
  };

  // Function to handle editing a book
  const handleEdit = (book) => {
    setNewBook(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
    setEditBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to cancel edit mode
  const handleCancelEdit = () => {
    setNewBook("");
    setAuthor("");
    setIsbn("");
    setEditBook(null);
  };

  // Handle search
  const handleSearch = () => {
    fetchBooks(searchTerm);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    fetchBooks("");
  };

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Catalog Management
      </h2>

      {/* Form to add or update a book */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          placeholder="Enter book title"
          style={{ flex: 1, minWidth: "200px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          style={{ flex: 1, minWidth: "200px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN (auto-generated if empty)"
          style={{ flex: 1, minWidth: "200px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer",
            minWidth: "120px"
          }}
        >
          {editBook ? "Update Book" : "Add Book"}
        </button>
        {editBook && (
          <button 
            type="button"
            onClick={handleCancelEdit}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#f44336", 
              color: "white", 
              border: "none", 
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search Bar */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search books by title, author, or ISBN"
          style={{ 
            flex: 1, 
            padding: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "4px" 
          }}
        />
        <button 
          onClick={handleSearch}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#2196F3", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
        <button 
          onClick={handleClearSearch}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#9E9E9E", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Clear
        </button>
      </div>

      {/* Books List as a Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>Author</th>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "left" }}>ISBN</th>
            <th style={{ border: "1px solid #ddd", padding: "12px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ border: "1px solid #ddd", padding: "20px", textAlign: "center", color: "#999" }}>
                No books found. {searchTerm && "Try a different search term or "}Add a new book to get started.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id} style={{ backgroundColor: editBook?.id === book.id ? "#fffde7" : "white" }}>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>{book.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>{book.title}</td>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>{book.author}</td>
                <td style={{ border: "1px solid #ddd", padding: "12px" }}>{book.isbn}</td>
                <td style={{ border: "1px solid #ddd", padding: "12px", textAlign: "center" }}>
                  <button 
                    onClick={() => handleEdit(book)} 
                    style={{ 
                      marginRight: "10px", 
                      padding: "6px 12px",
                      backgroundColor: "#FF9800",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(book.id)} 
                    style={{ 
                      padding: "6px 12px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CatalogManagement;
