import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ActivityIndicator, View, Text, Alert} from 'react-native';
import * as PokeActions from '../../store/modules/pokedex/actions';
import PokeCard from '../../components/PokeCard';
import {Container, SizeButton, SizeIcon, SizeText} from './styles';
import api from '../../services/api';

const Home = ({navigation}) =>  {

  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const pokedex = useSelector((state) => state.pokedex)

  useEffect(() => {
    getPokemons();
  }, []);

  function handleAddPokemon(pokemon) {
    const {actionAddPokemon} = PokeActions;
    dispatch(actionAddPokemon(pokemon));
  }

  async function getPokemons() {
    try {
      const response = await api.get(`/pokemon?limit=20&offset=${offset}`);
      if (offset > 0) {
        setList(...list, response.data.results);
        setOffset(offset + 20);
      } else {
        setList(response.data.results);
      }
    } catch (error) {
      Alert.alert(
        "Desculpe,",
        "Não conseguimos buscar a lista de pokemons, por favor, tente mais tarde.",
        [
          {
            text: "Cancelar", onPress: () => {}, style: "cancel"
          },
          { text: "OK", onPress: () => {}}
        ]
      );
    }
  }

  return (
    <Container>
      {list.length > 0 ? (
        <>
          <SizeButton onPress={() => navigation.navigate('pokelist')}>
            <SizeIcon name="shopping-cart" />
            <SizeText>{pokedex.length}</SizeText>
          </SizeButton>
          <FlatList
            onEndReached={() => { /* acrescentar loading e buscar mais pokemons */ }}
            onEndReachedThreshold={1}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={list}
            renderItem={(item) => (
              <PokeCard
                goToDetails={() => navigation.navigate('details', { pokemonParam: item.item, }) }
                addPokemon={(pokemon) => handleAddPokemon(pokemon.item)}
                pokemon={item}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        </>
      ) : (
          <ActivityIndicator color="#debd27" />
      )}
    </Container>
  )
}

export default Home;