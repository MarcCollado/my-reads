import React, { Component } from 'react';
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

  handleChange = (e) => {
    this.callAPI(e);
    this.setState({
      query: e,
      isLoading: true,
    });
  }

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
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <BeatLoader
            size={15}
            color={'#36D7B7'}
            loading={this.state.isLoading}
          />
        </div>
      );
    }
    return (
      this.state.searchResult.map(book => (
        <Book
          key={book.id}
          authors={book.authors}
          id={book.id}
          imageURL={book.imageLinks.thumbnail}
          //shelf={book.shelf}
          title={book.title}
          onShelfChange={this.props.onShelfChange}
        />
      ))
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
