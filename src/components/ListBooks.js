import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func,
  }

  createShelf(shelfTitle, shelfId) {
    const { books } = this.props;
    const moveToShelf = bookShelf => books.filter(book => book.shelf === bookShelf);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {moveToShelf(shelfId).map(book => (
              <Book
                key={book.id}
                book={book}
                authors={book.authors}
                id={book.id}
                imageURL={book.hasOwnProperty('imageLinks') && book.imageLinks.thumbnail}
                shelf={book.shelf}
                title={book.title}
                onShelfChange={this.props.onShelfChange}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          {this.createShelf('Currently Reading', 'currentlyReading')}
          {this.createShelf('Want to Read', 'wantToRead')}
          {this.createShelf('Read', 'read')}
        </div>
      </div>
    );
  }
}

export default ListBooks;
