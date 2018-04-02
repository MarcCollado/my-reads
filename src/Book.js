import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
  }

  render() {
    const { imageURL, title, authors } = this.props;

    const displayAuthors = (authors) => {
      let str = '';
      authors.forEach((author, i) => {
        str += i === authors.length - 1
          ? `${author}`
          : `${author} & `;
      });
      return str;
    };

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${imageURL})`,
            }}
          />
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading" selected>Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{displayAuthors(authors)}</div>
      </div>
    );
  }
}

export default Book;
