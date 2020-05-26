import React from 'react';

import {
  Container,
  Avatar,
  Name,
  ButtonIcon,
  ActionButton,
  ContainerButtons,
} from './styles';

const PokeCard = ({goToDetails, addPokemon, pokemon}) => {
  return (
    <Container>
      <Avatar
        source={{
          uri: `https://pokeres.bastionbot.org/images/pokemon/${
            pokemon.index + 1
          }.png`,
        }}
      />
      <Name>{pokemon.item.name}</Name>
      <ContainerButtons>
        <ActionButton onPress={() => goToDetails(pokemon.index + 1)}>
          <ButtonIcon name="remove-red-eye" color="#fff" />
        </ActionButton>
        <ActionButton onPress={() => addPokemon(pokemon)}>
          <ButtonIcon name="add" color="#fff" />
        </ActionButton>
      </ContainerButtons>
    </Container>
  );
};

export default PokeCard;
