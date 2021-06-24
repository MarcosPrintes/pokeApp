import React, {useState, useEffect} from 'react';
import {Animated, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as PokeActions from '../../store/modules/pokedex/actions';
import api from '../../services/api';
import {
  Container,
  BottomCard,
  Avatar,
  Text,
  TextAbility,
  Bold,
  RoundButton,
  Pokedex,
  PokedexButton,
  LoadContainer,
  BottomCardHeader,
  BottomCardHeaderItem,
  AbilityContainer,
  // Amount,
  // AmoutText,
} from './styles';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Poke } from '../../routes';
import { RouteProp } from '@react-navigation/native';


let offset = 0;
const translateY = new Animated.Value(0);
const animatedEvent = Animated.event(
  [
    {
      nativeEvent: {
        translationY: translateY,
      },
    },
  ],
  {useNativeDriver: true},
);

type PokelistRouteProp = RouteProp<RootStackParamList, 'Pokelist'>
type PokelistNavigationScreen = StackNavigationProp<RootStackParamList, 'Pokelist'>;

export type Props = {
  route:PokelistRouteProp
  navigation: PokelistNavigationScreen,
}

type Pokemon = {
  id: number|string,
  name: string,
  url: string,
  height: number,
  weight: number,
  abilities: string,
  back_default: string,
}

const Details:React.FC<Props> = ({route, navigation}) => {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const amount = useSelector(state => state.pokedex.find((el) => el.name === route.params.pokemonParam.name))

  useEffect(() => {
    offset = 0;
    translateY.setValue(0);
    const {pokemonParam} = route.params;
    navigation.setOptions({title: pokemonParam.name});
    setLoading(true);

    async function getPokemonDetails() {
      try {
        const response = await api.get(`/pokemon/${pokemonParam.name}/`);
        
        setPokemon({
          id: response.data.id,
          name: pokemonParam.name,
          url: pokemonParam.url,
          height: response.data.height / 10,
          weight: response.data.weight / 10,
          abilities: response.data.abilities,
          back_default: response.data.sprites.back_default,
        });

        setLoading(false)
      } catch (error) {
        setLoading(false);
      }
    }

    getPokemonDetails();
  }, []);

  function handlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const {translationY} = event.nativeEvent;
      offset += translationY;
      translateY.setOffset(offset);
      translateY.setValue(0);
    }
  }

  function handleAdd(pokemon) {
    const {actionAddPokemon} = PokeActions;
    dispatch(actionAddPokemon(pokemon));
  }

  return (
    <Container>
      {loading ? (
        <LoadContainer>
          <ActivityIndicator color="#debd27" size={36} />
        </LoadContainer>
      ) : (
        <>
          {/*
              <Amount onPress={() => navigation.navigate('pokelist')}>
                <AmoutText>{amount && amount}</AmoutText>
              </Amount>
            */}
          <Avatar
            style={{
              opacity: translateY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, 200],
                    outputRange: [0, 30],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
            source={{
              uri: pokemon?.id ? `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png` : 'https://i.imgur.com/kxd89UN.gif',
            }}
          />
          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={handlerStateChange}>
            <BottomCard
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [-180, 0, 200],
                      outputRange: [-180, 0, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}>
              <BottomCardHeader>
                <BottomCardHeaderItem>
                  <Bold>Nome</Bold>
                  <Text>{pokemon?.name}</Text>
                </BottomCardHeaderItem>
                <BottomCardHeaderItem>
                  <Bold>Peso</Bold>
                  <Text>{pokemon?.weight}kg</Text>
                </BottomCardHeaderItem>
                <BottomCardHeaderItem>
                  <Bold>Altura</Bold>
                  <Text>{pokemon?.height > 1 ? `${pokemon?.height}m` : `${pokemon?.height}cm` }</Text>
                </BottomCardHeaderItem>
              </BottomCardHeader>
              <Bold>Habilidades</Bold>
              <AbilityContainer>
                {pokemon?.abilities !== undefined &&
                  pokemon?.abilities.map((item) => (
                    <TextAbility
                      key={
                        item.ability.name
                      }>{`${item.ability.name}`}</TextAbility>
                  ))}
              </AbilityContainer>
              <RoundButton
                onPress={() => handleAdd({name: pokemon?.name, url: pokemon?.url}) }>
                <Icon name="add" color="#fff" size={32} />
              </RoundButton>
              <PokedexButton onPress={() => navigation.navigate('Pokelist')}>
                <Pokedex
                  onPress={() => navigation.navigate('Pokelist')}
                  style={{
                    opacity: translateY.interpolate({
                      inputRange: [0, 100],
                      outputRange: [1, 0],
                      extrapolate: 'clamp',
                    }),
                    transform: [
                      {
                        translateY: translateY.interpolate({
                          inputRange: [0, 200],
                          outputRange: [0, 50],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  }}
                  source={{
                    uri: `https://lh3.googleusercontent.com/proxy/EX4DQWqjmSes1eyy7swlSrSZytEJ1BKvq7aeYpSZXSDu6iV-x7FEbhVuOnmUjDd6kPNgeOpNYSnCMrn4McOvPkcffjfeDbB_uAAnvD8gDJaMvlORgqg8`,
                  }}
                />
              </PokedexButton>
            </BottomCard>
          </PanGestureHandler>
        </>
      )}
    </Container>
  );
};

export default Details;
