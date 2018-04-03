import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func,
  }

  generateShelf(shelfTitle, shelfId) {
    const { books } = this.props;
    const moveToBookShelf = bookShelf => books.filter(book => book.shelf === bookShelf);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {moveToBookShelf(shelfId).map(book => (
              <Book
                key={book.id}
                authors={book.authors}
                id={book.id}
                imageURL={book.imageLinks.thumbnail}
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
          {this.generateShelf('Currently Reading', 'currentlyReading')}
          {this.generateShelf('Want to Read', 'wantToRead')}
          {this.generateShelf('Read', 'read')}
        </div>
      </div>
    );
  }
}

export default ListBooks;
