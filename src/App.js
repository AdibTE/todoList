import React from 'react';
import './App.css';
import Filters from './components/Filters';
import List from './components/List';
import NewTodo from './components/NewTodo';
import {Provider} from 'react-redux';
import store from './store';

const App = () => {
  return (
    <div className="Main">
      <Provider store={store}>
      <Filters />
      <List />
      <NewTodo />
      </Provider>
    </div>
  );
}

export default App;
