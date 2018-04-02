import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {

  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <li>
                  <Book />
                </li>
                <li>
                  <Book />
                </li>
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <li>
                  <Book />
                </li>
                <li>
                  <Book />
                </li>
                <li>
                  <Book />
                </li>
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <li>
                  <Book />
                </li>
                <li>
                  <Book />
                </li>
                <li>
                  <Book />
                </li>
                <li>
                  <Book />
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;
