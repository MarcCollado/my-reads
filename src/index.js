import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';
import BooksApp from './App';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <BooksApp />
    </MuiThemeProvider>
  </BrowserRouter>, document.getElementById('root'));
