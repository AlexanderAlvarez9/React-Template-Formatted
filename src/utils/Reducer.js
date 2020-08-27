const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        profile: [...state.profile, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;