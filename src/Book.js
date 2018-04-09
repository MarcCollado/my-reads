import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    authors: PropTypes.array,
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func,
  }

  componentDidUpdate() {
    console.log('BookDidUpdate');
  }

  render() {
    const {
      book, authors, id, imageURL, shelf, title, onShelfChange,
    } = this.props;

    const urlValidator = (img) => {
      if (img) {
        return img;
      }
      return 'http://localhost:3000/images/book.png';
    };


    const displayAuthors = authorList => authorList.join(' & ');
    /*
    * This is how displayAuthors looked like before refactor,
    * I just left it here to pat myself on the back
    * on how to turn seven lines into a one liner
    * ```
    * let str = '';
    * authorList.forEach((author, i) => {
    *   str += i === authors.length - 1
    *     ? `${author}`
    *     : `${author} & `;
    * });
    * return str;
    * ```
    */

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url(${urlValidator(imageURL)})`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={e => onShelfChange(e.target.value, book)}
              >
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors && displayAuthors(authors)}</div>
        </div>
      </li>
    );
  }
}

export default Book;
