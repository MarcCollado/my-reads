# A Book Tracking App 📚
React Project — Udacity React Developer Nanodegree

This is the first project of the [React Developer Nanodegree](https://eu.udacity.com/course/react-nanodegree--nd019). Below you'll find the rest of the Nanodegree projects and I also wrote a [short post](https://www.collado.io/blog/2018/udacity-rdnd) in my blog about the course experience.

* [MyReads](https://github.com/MarcCollado/my-reads) — React Project
* [Magis](https://github.com/MarcCollado/magis), formerly [Would You Rather](https://www.collado.io/blog/2018/magis-10) — React & Redux Project
* [Flashcards](https://github.com/MarcCollado/flashcards) — React Native Project
  * [Flashcards API](https://github.com/MarcCollado/flashcards-api) — Flashcards' backend

ℹ️ This project was developed in 2018 during the Nanodegree and it is no longer maintained. If you'd like to see what I'm currently working on, please, visit my [now page](https://www.collado.io/now).


## About
This project consists in a small application built in React, that allows the user to manage her own book library.

![img](/public/images/books.png)

At launch the user is presented with a default collection of books categorized in three shelves:

* `Currently Reading`
* `Want to Read`
* `Read`

The user can move the books across shelves, according to their reading state.

The user is also able to search for new books through a custom API and add them to the library.


## Tech Stack
* [React](https://reactjs.org/)
* [React Router](https://github.com/ReactTraining/react-router)


## Installation
* Clone or download the repo
* `npm install` to install the project dependencies
* `npm start` will launch the app at `localhost:3000`


## Getting Started
### User Library
At launch, the app will check if the client already has a `localStorage` copy of the library. If it does, it'll update the `state` with the local data available. If a `localStorage` library is not found, the app will fetch the initial set of books from the API and seed its `state` with the response.

After the data has been successfully retrieved, either from `localStorage` or the API, the User Library will render at `/`.

The User Library is composed of the aforementioned three shelves, populated with books both retrieved during the first fetch, and also books the user has added through the Search functionality — see Search below.

### Changing Shelves
Within the User Library books can be moved across shelves (`Currently Reading`, `Want to Read` and `Read`) through the inline book switcher.

![img](/public/images/switcher.jpg)

Updates happen in real time and are not affected by browser refresh because a backup of the app `state` is always stored in the client `localStorage` through the `componentWillUnmount` lifecycle method.

### Search
The Search functionality is triggered through the (+) button located at the bottom right of the screen.

This button will route the user to `/search`, which displays a search box where the user can perform queries.

Once the user starts typing, up to 20 results are fetched from the API.

![img](/public/images/search.png)

Queried books can be added to the User Library through the same switcher used to change shelves.

* Book results that are not yet in the User Library will show a default value of `None`.
* Book results that happen to be already in the User Library, will correctly show its matching shelf.

After the user changes the book's shelf and goes back to the User Library through the back (←) button, the book will render in the right shelf.

Finally, if the API is not able to fetch matching results to the user criteria, the app will prompt a warning message informing of the situation.
