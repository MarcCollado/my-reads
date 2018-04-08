import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import ListBooks from './ListBooks';
import Search from './Search';
import * as BooksAPI from './utils/BooksAPI';
import * as LocalStorageAPI from './utils/LocalStorageAPI';
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

  onShelfChange = (newShelf, bookId) => {
    // Either if it was an existing book from the userLibrary or
    // fetched from searchResults, update the state
    this.setState((prevState) => {
      // Check if the book was already in the userLibrary
      if (prevState.userLibrary.some(book => book.id === bookId)) {
        // If it already was in userLibrary, just update its shelf
        return ({
          userLibrary: prevState.userLibrary.map((book) => {
            if (book.id === bookId) {
              book.shelf = newShelf;
              return book;
            }
            return book;
          }),
        });
      }
      // If the book was not in userLibrary, it comes from searchResults,
      // then assign it a shelf and add it to userLibrary
      BooksAPI.get(bookId)
        .then((book) => {
          book.shelf = newShelf;
          return ({
            userLibrary: prevState.userLibrary.push(book),
          });
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
          <BeatLoader
            size={15}
            color="#26A69A"
            loading={isLoading}
          />
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
              books={this.state.userLibrary}
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
