import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as PokedexActions from '../../store/modules/pokedex/actions';
import {
  ScrollView,
  Row,
  Container,
  Avatar,
  IconButton,
  Name,
  ContainerAvatar,
  InlineContainer,
  Amount,
  RoundButton,
} from './styles';

const PokeList = ({navigation}) => {
  const pokemonList = useSelector(state => state.pokedex);
  const dispatch = useDispatch();

  function handleDelete(id) {
    const {actionRemovePokemon} = PokedexActions;
    dispatch(actionRemovePokemon(id));
  }

  function handleUpdate(id, amount) {
    const {actionUpdatePokemon} = PokedexActions;
    dispatch(actionUpdatePokemon(id, amount));
  }

  return (
    <>
      {pokemonList.length > 0 ? (
        <>
          <ScrollView>
            {pokemonList.map((item) => (
              <Row key={item.name}>
                <ContainerAvatar>
                  <Avatar
                    source={{
                      uri: `https://pokeres.bastionbot.org/images/pokemon/${item.id}.png`,
                    }}
                  />
                  <Name>{item.name}</Name>
                </ContainerAvatar>
                <InlineContainer>
                  <RoundButton onPress={() => handleUpdate(item.id, item.amount - 1) } >
                    <Icon name="remove" color="#fff" size={22} />
                  </RoundButton>

                  <Amount>{item.amount}</Amount>

                  <RoundButton onPress={() =>  handleUpdate(item.id, item.amount + 1) } >
                    <Icon name="add" color="#fff" size={22} />
                  </RoundButton>
                </InlineContainer>
                <IconButton onPress={() => handleDelete(item.id)}>
                  <Icon name="delete" color="#CC0000" size={22} />
                </IconButton>
              </Row>
            ))}
          </ScrollView>
        </>
      ) : (
        <Container>
          <Avatar
            source={{
              uri: `https://i1.pngguru.com/preview/72/848/862/pkmn-ash-sad-1-png-clipart.jpg`,
            }}
          />
          <Button
            onPress={() => navigation.goBack()}
            title="Adicionar"
            color="#debd29"
          />
        </Container>
      )}
    </>
  );
}

export default PokeList;
