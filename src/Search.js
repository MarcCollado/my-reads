import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchResult: [],
    };
  }

  handleChange = (e) => {
    this.callAPI(e);
    this.setState({
      query: e,
    });
  }

  callAPI = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query)
      .then((books) => {
        console.log(`query => ${query} \n API => ${books}`);
        this.setState({
          searchResult: books,
        });
      });
    }
  }

  displaySearchResults() {
    const { searchResult } = this.state;
    if (searchResult) {
      return (
        searchResult.map(book => (
          <Book
            key={book.id}
            authors={book.authors}
            id={book.id}
            imageURL={book.imageLinks.thumbnail}
            shelf={book.shelf}
            title={book.title}
            onShelfChange={this.props.onShelfChange}
          />
        ))
      );
    }
  }

  render() {
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              className="search-books"
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.displaySearchResults()}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
