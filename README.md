# MyReads: A Book Tracking App
React Fundamentals Project — Udacity React Developer Nanodegree

Of course, you are free to start this project from scratch if you wish! Just be sure to use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap the project.

## Setting Things Up
To get started right away:
* Install all project dependencies with `npm install`
* Start the development server with `npm start`
* Open the browser at `localhost:3000`


## How It Works
Once the server has started with `npm start` the user will be routed, by default, to the *User Library* `/`.

### User Library
At launch, `BooksApp` will check if the client already has a `localStorage` copy of the library. If it does, it'll update the `state` with the local data — i.e. that's usually the case when the user reloads the browser.

If a `localStorage` library is not found, the app will fetch the initial set of books from the API and update its `state` with its response.

After the data has been successfully retrieved, either from `localStorage` or the API, the path `'/'` will render the *User Library* right away.

The *User Library* is composed of both books retrieved during the first update and also books the user has, at some point, fetched from the API through the *Search* functionality — see *Search* below.

The *User Library* features three distinct Shelves that match each book status: `Currently Reading`, `Want to Read` and `Read`.

### Change Shelf
Within the *User Library*, books can be moved across the three aforementioned shelves (`Currently Reading`, `Want to Read` and `Read`) through the inline book switcher.

Updates will happen in real time and are not affected by browser refresh because a backup of the app `state` is always stored in the client `localStorage` at `componentWillUnmount`.

### Search
The *Search* functionality is triggered through the (+) button located at the bottom right of the screen.

This button will route the user to `/search`, which at launch displays a blank screen with a search input layered on top, where the user can perform queries.

Once the user starts typing, up to 20 search results are fetched from the API and shown in real time.

The user will be able to add any of the queried books to the *User Library* through the same switcher used to change shelves.

* Book results that are not yet in the *User Library* will show a default value of `None`.
* Book results that happen to be already in the *User Library*, will correctly show its matching shelf.

After the user changes a book shelf and goes back to the *User Library* through the back (←) button (located at the top left of the *Search* screen), the book will be successfully updated in the right shelf.

Finally, if the API is not able to fetch matching results to the user criteria, the app will prompt a warning message informing of the situation.


## Main Files
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
