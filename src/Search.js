import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Book from './Book';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: '',
      searchResult: [],
    };
  }

  static propTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func,
  }

  handleChange = (e) => {
    this.callAPI(e);
    this.setState({
      query: e,
      isLoading: true,
    });
  }

  componentDidUpdate() {}

  callAPI = (query) => {
    if (query) {
      BooksAPI.search(query)
        .then((books) => {
          console.log(`query => ${query} \n API => `, books);
          if (books) {
            this.setState({
              isLoading: false,
              query,
              searchResult: books,
            });
          } else {
            console.log('API ERROR!');
          }
        });
    } else {
      console.log(`query => ${query} \n EMPTY QUERY`);
    }
  }

  appState = () => {
    const { isLoading, searchResult } = this.state;
    const { books: localBooks } = this.props;

    if (isLoading) {
      return (
        <div className="loading">
          <BeatLoader
            size={15}
            color={'#36D7B7'}
            loading={isLoading}
          />
        </div>
      );
    }
    return (
      searchResult.map(cloudBook => {
        const localIndex = localBooks.findIndex(localBook => {
          return localBook.id === cloudBook.id;
        })
        if (localIndex !== -1) {
          const localBook = localBooks[localIndex];
          return (
            <Book
              key={localBook.id}
              authors={localBook.authors}
              id={localBook.id}
              imageURL={localBook.imageLinks.thumbnail}
              shelf={localBook.shelf}
              title={localBook.title}
              onShelfChange={this.props.onShelfChange}
            />
          )
        } else {
          return (
            <Book
              key={cloudBook.id}
              authors={cloudBook.authors}
              id={cloudBook.id}
              imageURL={cloudBook.imageLinks.thumbnail}
              shelf='none'
              title={cloudBook.title}
              onShelfChange={this.props.onShelfChange}
            />
          )
        }
      })
    );
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
            {this.appState()}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
