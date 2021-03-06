import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import reducers
import bookmarks from './bookmarks';
import presentations from './presentations';
import selectedPresentationIndex from './selectedPresentation';
import sockets from './socketReducers';
import notes from './noteReducers';

// pass reducers into combineReducers (in first object)
const rootReducer = combineReducers({
  // ES6 method for adding in key-value pairs
  notes,
  sockets,
  presentations,
  selectedPresentationIndex,
  bookmarks,
  routing: routerReducer
});

export default rootReducer;
