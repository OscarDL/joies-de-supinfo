export const reducer = (state, action) => {
  // action -> type, [payload]

  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };

    case 'SET_GIFS':
      return {
        ...state,
        gifs: action.gifs
      };

    default:
      return state;
  };
};
