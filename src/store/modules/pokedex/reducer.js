import produce from 'immer';

function pokedex(state = [], action) {
  switch (action.type) {
    case '@pokedex/ADD':
      // eslint-disable-next-line no-case-declarations
      const id = action.pokemon.url.split('/')[
        action.pokemon.url.split('/').length - 2
      ];
      return produce(state, (draft) => {
        const index = state.findIndex((item) => item.id === id);
        if (index >= 0) {
          draft[index].amount += 1;
        } else {
          draft.push({
            name: action.pokemon.name,
            id,
            amount: 1,
            url: action.pokemon.url,
          });
        }
      });
    case '@pokedex/REMOVE':
      return produce(state, (draft) => {
        const index = state.findIndex((item) => item.id === action.id);
        if (index >= 0) {
          draft.splice(index, 1);
        }
      });
    case '@pokedex/UPDATE':
      return produce(state, (draft) => {
        const index = draft.findIndex((item) => item.id === action.id);
        if (action.amount <= 0) return;

        if (index >= 0) {
          draft[index].amount = action.amount;
        }
      });
    default:
      return state;
  }
}

export default pokedex;
