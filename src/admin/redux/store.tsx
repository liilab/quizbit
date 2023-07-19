import { createStore } from 'redux';

// Define initial state
const initialState = {
  quizType: 'single_choice',
};

// Define reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUIZ_TYPE':
      return {
        ...state,
        quizType: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
