import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      });
  }

  onShelfChange = (newShelf, bookId) => {
    this.setState(currentState => ({
      books: currentState.books.map((book) => {
        if (book.id === bookId) {
          book.shelf = newShelf;
          return book;
        }
        return book;
      }),
    }));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <ListBooks
                books={this.state.books}
                onShelfChange={this.onShelfChange}
              />
            </div>
          )}
        />
        <Route exact path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link
                  to="/"
                  className="close-search"
                ><a>Close</a>
                </Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid" />
              </div>
            </div>
          )}
        />
        <Link
          to="/search"
          className="open-search"
        ><a>Add a book</a>
        </Link>
      </div>
    );
  }
}

export default BooksApp;
