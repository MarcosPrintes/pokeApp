import React from 'react';
import {Animated, ActivityIndicator} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
  Amount,
  AmoutText,
} from './styles';

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

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: {},
      loading: false,
    };
  }

  async componentDidMount() {
    offset = 0;
    translateY.setValue(0);
    const {route, navigation} = this.props;
    const {pokemon} = route.params;
    const id = pokemon.url.split('/')[pokemon.url.split('/').length - 2];
    navigation.setOptions({title: pokemon.name});
    this.setState({loading: true});
    try {
      const response = await api.get(`/pokemon/${pokemon.name}/`);
      this.setState({
        pokemon: {
          id,
          name: pokemon.name,
          url: pokemon.url,
          height: response.data.height / 10,
          weight: response.data.weight / 10,
          abilities: response.data.abilities,
          back_default: response.data.sprites.back_default,
        },
        loading: false,
      });
    } catch (error) {
      this.setState({loading: false});
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const {translationY} = event.nativeEvent;
      offset += translationY;
      translateY.setOffset(offset);
      translateY.setValue(0);
    }
  }

  handleAdd(pokemon) {
    const {actionAddPokemon} = this.props;
    actionAddPokemon(pokemon);
  }

  render() {
    const {pokemon, loading} = this.state;
    const {amount, navigation} = this.props;
    return (
      <Container>
        {loading ? (
          <LoadContainer>
            <ActivityIndicator color="#debd27" size={36} />
          </LoadContainer>
        ) : (
          <>
            <Amount onPress={() => navigation.navigate('pokelist')}>
              <AmoutText>{amount}</AmoutText>
            </Amount>
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
                uri: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
              }}
            />
            <PanGestureHandler
              onGestureEvent={animatedEvent}
              onHandlerStateChange={this.handlerStateChange}>
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
                    <Text>{pokemon.name}</Text>
                  </BottomCardHeaderItem>
                  <BottomCardHeaderItem>
                    <Bold>Peso</Bold>
                    <Text>{pokemon.weight}kg</Text>
                  </BottomCardHeaderItem>
                  <BottomCardHeaderItem>
                    <Bold>Altura</Bold>
                    <Text>{pokemon.height}m</Text>
                  </BottomCardHeaderItem>
                </BottomCardHeader>
                <Bold>Habilidades</Bold>
                <AbilityContainer>
                  {pokemon.abilities !== undefined &&
                    pokemon.abilities.map((item) => (
                      <TextAbility
                        key={
                          item.ability.name
                        }>{`${item.ability.name}`}</TextAbility>
                    ))}
                </AbilityContainer>
                <RoundButton
                  onPress={() =>
                    this.handleAdd({name: pokemon.name, url: pokemon.url})
                  }>
                  <Icon name="add" color="#fff" size={32} />
                </RoundButton>
                <PokedexButton onPress={() => navigation.navigate('pokelist')}>
                  <Pokedex
                    onPress={() => navigation.navigate('pokelist')}
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
  }
}

const mapStateToProps = (state, ownProps) => {
  const {url} = ownProps.route.params.pokemon;
  const id = url.split('/')[url.split('/').length - 2];
  const pokemon = state.pokedex.find((el) => el.id === id);
  return {
    amount: pokemon ? pokemon.amount : 0,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PokeActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Details);
