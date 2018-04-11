import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';
import * as BooksAPI from './utils/BooksAPI';
import * as LocalStorageAPI from './utils/LocalStorageAPI';
// UI Kit Components
import LoadSpinner from './ui/CircularProgress';
// Styles
import './App.css';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLibrary: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    // Check if there's already a userLibrary in localStorage
    if (LocalStorageAPI.getFile('localBooks')) {
      // Set the userLibrary state with localStorage
      this.setState(() => ({
        userLibrary: LocalStorageAPI.getFile('localBooks'),
        isLoading: false,
      }));
    } else {
      // If there's no userLibrary in localStorage,
      // get initial set the userLibrary from the API and set the state
      BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
            userLibrary: books,
            isLoading: false,
          }));
        });
    }
  }

  componentDidUpdate() {
    console.log('AppDidUpdate');
  }

  // When component unmounts, back up a local copy of the userLibrary
  componentWillUnmount() {
    LocalStorageAPI.saveFile('localBooks', this.state.userLibrary);
  }

  onShelfChange = (newShelf, book) => {
    // Either if it was an existing book from the userLibrary or
    // fetched from searchResults, update the state
    this.setState((prevState) => {
      // Check if the book was already in the userLibrary
      if (prevState.userLibrary.some(libBook => libBook.id === book.id)) {
        // If it already was in userLibrary, just update its shelf
        return ({
          userLibrary: prevState.userLibrary.map((libBook) => {
            if (libBook.id === book.id) {
              // Update shelf
              libBook.shelf = newShelf;
              return libBook;
            }
            return libBook;
          }),
        })
      }
      // If the book was not in userLibrary, it comes from searchResults,
      // then assign it the new shelf and add it to userLibrary
      book.shelf = newShelf;
      return ({
        userLibrary: prevState.userLibrary.concat(book),
      });
    }, () => {
      LocalStorageAPI.saveFile('localBooks', this.state.userLibrary);
    });
  }

  appStateController = () => {
    const { isLoading, userLibrary } = this.state;
    // Show userLibrary after the application has finished loading
    if (isLoading) {
      return (
        <div className="loading">
          <LoadSpinner />
        </div>
      );
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <ListBooks
          books={userLibrary}
          onShelfChange={this.onShelfChange}
        />
      </div>
    );
  }

  render() {
    const { userLibrary } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={this.appStateController}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              books={userLibrary}
              onShelfChange={this.onShelfChange}
            />
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
