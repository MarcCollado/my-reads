import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './utils/BooksAPI';
// UI Kit Components
import LoadSpinner from './ui/CircularProgress';
// Styles
import './App.css';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      apiError: false,
      isLoading: false,
      query: '',
      searchResults: [],
    };
  }

  componentDidUpdate() {
    console.log('SearchDidUpdate');
  }

  handleChange = (e) => {
    if (e) {
      this.callAPI(e);
      this.setState({
        query: e,
        isLoading: true,
      });
    } else {
      // Handle empty queries
      this.setState({
        query: e,
        isLoading: false,
      });
    }
  }


  callAPI = (userInput) => {
    // Fetch API with the userInput
    BooksAPI.search(userInput)
      .then((books) => {
        if (books) {
          this.setState({
            isLoading: false,
            query: userInput,
            searchResults: books,
          });
        } else {
          this.setState({
            apiError: true,
            isLoading: false,
            query: '',
            searchResults: [],
          });
        }
      });
  }

  appStateController = () => {
    const { apiError, isLoading, query, searchResults } = this.state;
    // Get from props the books that already are in the userLibrary
    const { books: userLibrary } = this.props;
    if (query === '' && apiError) {
      return (
        <div>
          <h2>Your query didn't get any results</h2>
          <p>It seems we don't have any no books matching your search criteria.</p>
          <p>Please, type a new query in the Search Box.</p>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="loading">
          <LoadSpinner />
        </div>
      );
    }
    if (query) {
      return (
        // Loop through the book results fetched from the API
        searchResults.map((searchResult) => {
          // Check if the searchResult already exists in userLibrary
          const i = userLibrary.findIndex((libBook) => {
            return libBook.id === searchResult.id;
          });
          if (i === -1) {
            // If it is not in userLibrary, return the searchResult with the
            // shelf value set to none because the user has not changed it yet
            return (
              <Book
                key={searchResult.id}
                book={searchResult}
                authors={searchResult.authors}
                id={searchResult.id}
                imageURL={searchResult.hasOwnProperty('imageLinks') && searchResult.imageLinks.thumbnail}
                shelf="none"
                title={searchResult.title}
                onShelfChange={this.props.onShelfChange}
              />
            );
          }
          // If the searchResult already exists in userLibrary display the
          // local copy instead with shelf value set to its current state
          const libBook = userLibrary[i];
          return (
            <Book
              key={libBook.id}
              book={libBook}
              authors={libBook.authors}
              id={libBook.id}
              imageURL={libBook.hasOwnProperty('imageLinks') && libBook.imageLinks.thumbnail}
              shelf={libBook.shelf}
              title={libBook.title}
              onShelfChange={this.props.onShelfChange}
            />
          );
        })
      );
    }
    return null;
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
            {this.appStateController()}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
