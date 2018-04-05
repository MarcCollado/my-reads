import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';
import * as BooksAPI from './utils/BooksAPI';
import * as LocalStorage from './utils/localStorage';
import './App.css';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    if (true) {
      const localBooks = LocalStorage.getFile('localBooks');

      console.log(typeof localBooks);

      // const printer = localBooks.forEach(char => {
      //   console.log(char);
      // })

      this.setState(() => ({
        books: localBooks,
      }));
    } else {
      BooksAPI.getAll()
      .then((books) => {
        LocalStorage.saveFile('localBooks', books);
        this.setState(() => ({
          books,
        }));
      });
    }
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
    LocalStorage.saveFile('localBooks', this.state.books);
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
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
