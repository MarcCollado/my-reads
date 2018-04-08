import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Book from './Book';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
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
          // No matching results => API throws an error
          console.log('HANDLE: API ERROR');
        }
      });
  }

  appStateController = () => {
    const { isLoading, query, searchResults } = this.state;
    // Get from props the books that already are in the userLibrary
    const { books: userLibrary } = this.props;

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
    if (query) {
      return (
        // Loop through the book results fetched from the API
        searchResults.map((searchResult) => {
          // Check if the searchResult already exists in userLibrary
          const localIndex = userLibrary.findIndex(localBook => localBook.id === searchResult.id);
          if (localIndex === -1) {
            // If it is not in userLibrary, return the searchResult with the
            // shelf value set to none because the user has not changed it yet
            return (
              <Book
                key={searchResult.id}
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
          const localBook = userLibrary[localIndex];
          return (
            <Book
              key={localBook.id}
              authors={localBook.authors}
              id={localBook.id}
              imageURL={localBook.hasOwnProperty('imageLinks') && localBook.imageLinks.thumbnail}
              shelf={localBook.shelf}
              title={localBook.title}
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
