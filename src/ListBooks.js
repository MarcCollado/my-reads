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
    const { books } = this.props;
    const moveToBookShelf = bookShelf => books.filter(book => book.shelf === bookShelf);

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {moveToBookShelf('currentlyReading').map(book => (
                  <Book
                    key={book.id}
                    authors={book.authors}
                    imageURL={book.imageLinks.thumbnail}
                    shelf={book.shelf}
                    title={book.title}
                  />
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {moveToBookShelf('wantToRead').map(book => (
                  <Book
                    key={book.id}
                    authors={book.authors}
                    imageURL={book.imageLinks.thumbnail}
                    shelf={book.shelf}
                    title={book.title}
                  />
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {moveToBookShelf('read').map(book => (
                  <Book
                    key={book.id}
                    authors={book.authors}
                    imageURL={book.imageLinks.thumbnail}
                    shelf={book.shelf}
                    title={book.title}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListBooks;
