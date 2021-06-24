import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ActivityIndicator, Alert} from 'react-native';
import * as PokeActions from '../../store/modules/pokedex/actions';
import PokeCard from '../../components/PokeCard';
import {Container, SizeButton, SizeIcon, SizeText} from './styles';
import api from '../../services/api';
import { RootStackParamList, Poke } from '../../routes';


type DetailsNavigationScreen = StackNavigationProp<RootStackParamList, 'Details'>;

export type Props = {
  navigation: DetailsNavigationScreen,
}

const Home:React.FC<Props> = ({navigation}) =>  {

  const [list, setList] = useState<Array<Poke>>([]);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const pokedex = useSelector((state) => state.pokedex)

  useEffect(() => {
    getPokemons();
  }, []);

  function handleAddPokemon(pokemon: any):void {
    const {actionAddPokemon} = PokeActions;
    dispatch(actionAddPokemon(pokemon));
  }

  async function getPokemons(): Promise<any> {
    try {
      const {data} = await api.get(`/pokemon?limit=20&offset=${offset}`);
    
      if (offset > 0) {
        setList([...list, data.results]);
        setOffset(offset + 20);
      } else {
        setList(data.results);
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
          <SizeButton onPress={() => navigation.navigate('Pokelist')}>
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
                goToDetails={() => navigation .navigate('Details', { 
                  pokemonParam: {
                    index: item.index, 
                    url: item.item.url, 
                    name: item.item.name
                  }, 
                }) 
              }
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