# MyReads: A Book Tracking App
React Fundamentals Project — Udacity React Developer Nanodegree

This is the first project of the [React Developer Nanodegree](https://eu.udacity.com/course/react-nanodegree--nd019).

* [MyReads](https://github.com/MarcCollado/my-reads) — React Fundamentals Project
* [Would You Rather](https://github.com/MarcCollado/would-you-rather) — React & Redux Project
* TBD — React Native Project


## TL;DR
This project consists in a small application, of course built in React, that allows you to manage your own book library.

![img](/public/images/books.png)

At launch the user is presented with a default collection of books categorized in three shelves (`Currently Reading`, `Want to Read` and `Read`). Then books can be moved around the shelves, according to their state.

On top of that, the user is also able to search for new books through a custom API and add them to the library.


## Tech Stack
* [React](https://reactjs.org/)
* [React Router](https://github.com/ReactTraining/react-router)


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

![img](/public/images/switcher.jpg)

Updates will happen in real time and are not affected by browser refresh because a backup of the app `state` is always stored in the client `localStorage` at `componentWillUnmount`.

### Search
The *Search* functionality is triggered through the (+) button located at the bottom right of the screen.

This button will route the user to `/search`, which at launch displays a blank screen with a search input layered on top, where the user can perform queries.

Once the user starts typing, up to 20 search results are fetched from the API and shown in real time.

![img](/public/images/search.png)

The user will be able to add any of the queried books to the *User Library* through the same switcher used to change shelves.

* Book results that are not yet in the *User Library* will show a default value of `None`.
* Book results that happen to be already in the *User Library*, will correctly show its matching shelf.

After the user changes a book shelf and goes back to the *User Library* through the back (←) button (located at the top left of the *Search* screen), the book will be successfully updated in the right shelf.

Finally, if the API is not able to fetch matching results to the user criteria, the app will prompt a warning message informing of the situation.
