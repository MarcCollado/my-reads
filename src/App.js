import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false,
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
    console.log(`newShelf === ${newShelf}`);
    console.log(`bookId === ${bookId}`);
    BooksAPI.update(bookId, newShelf)
      .then((bookList) => {
        console.log(bookList);
      });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks
              books={this.state.books}
              onShelfChange={this.onShelfChange}
            />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
