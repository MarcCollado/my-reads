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
    };
  }
  // componentWillMount() => false && this.state.books != []
  componentDidMount() {
    console.log(this.state.books);
    if (this.state.books != []) {
      const localBooks = StorageAPI.getFile('localBooks');
      this.setState(() => ({
        books: localBooks,
      }));
    } else {
      BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
        }));
        StorageAPI.saveFile('localBooks', this.state.books);
      });
    }
  }

  // onShelfChange = (newShelf, bookId, callback) => {
  //   const callbak = currentState => ({
  //     books: currentState.books.map((book) => {
  //       if (book.id === bookId) {
  //         book.shelf = newShelf;
  //         return book;
  //       }
  //       return book;
  //     }),
  //   })
  //   const newState = this.setState(callback);
  //   setTimeout(() => {
  //     StorageAPI.saveFile('localBooks', this.state.books);
  //   }, 500);
  // }

  onShelfChange = (newShelf, bookId) => {
    const updateBookCb = (currentState) => ({
      books: currentState.books.map((book) => {
        if (book.id === bookId) {
          book.shelf = newShelf;
          return book;
        }
        return book;
      }),
    });
    const updateLocalCb = () => {
      StorageAPI.saveFile('localBooks', this.state.books);
    }
    this.setState(updateBookCb, updateLocalCb);
  }

  render() {
    // Save
    // if (this.state.books) {
    //   StorageAPI.saveFile('localBooks', this.state.books);
    // }

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            // if (this.state.loading) {
            //   <p>loading...</p>
            // }
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
