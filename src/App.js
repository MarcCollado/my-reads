import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';
import * as BooksAPI from './utils/BooksAPI';
import * as StorageAPI from './utils/StorageAPI';
import './App.css';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (StorageAPI.getFile('localBooks')) {
      this.setState(() => ({
        books: StorageAPI.getFile('localBooks'),
        isLoading: false,
      }));
    } else {
      BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            books,
            isLoading: false,
          }));
          // Save a copy to LocalStorage
          StorageAPI.saveFile('localBooks', this.state.books);
        });
    }
  }

  onShelfChange = (newShelf, bookId) => {
    const partialStateCb = currentState => ({
      books: currentState.books.map((book) => {
        if (book.id === bookId) {
          book.shelf = newShelf;
          return book;
        }
        return book;
      }),
    });
    this.setState(partialStateCb, () => {
      StorageAPI.saveFile('localBooks', this.state.books);
    });
  }

  appSwitcher = () => {
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <p>Getting things ready...</p>
        </div>
      );
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <ListBooks
          books={this.state.books}
          onShelfChange={this.onShelfChange}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={this.appSwitcher}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search />
          )}
        />
        <Link
          to="/search"
          className="open-search"
        >Add a book
        </Link>
      </div>
    );
  }
}

export default BooksApp;
