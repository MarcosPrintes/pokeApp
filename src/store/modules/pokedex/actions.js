export function actionAddPokemon(pokemon) {
  return {
    type: '@pokedex/ADD',
    pokemon,
  };
}

export function actionRemovePokemon(id) {
  return {
    type: '@pokedex/REMOVE',
    id,
  };
}

export function actionUpdatePokemon(id, amount) {
  return {
    type: '@pokedex/UPDATE',
    id,
    amount,
  };
}
