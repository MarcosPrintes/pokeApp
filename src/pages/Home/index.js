import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {FlatList, ActivityIndicator} from 'react-native';
import * as PokeActions from '../../store/modules/pokedex/actions';
import PokeCard from '../../components/PokeCard';
import {Container, SizeButton, SizeIcon, SizeText} from './styles';
import api from '../../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      offset: 0,
    };
  }

  async componentDidMount() {
    this.getPokemons();
  }

  async getPokemons() {
    const {offset, list} = this.state;
    try {
      const response = await api.get(`/pokemon?limit=20&offset=${offset}`);
      if (offset > 0) {
        this.setState({
          list: [...list, response.data.results],
          offset: offset + 20,
        });
      } else {
        this.setState({list: response.data.results, offset: offset + 20});
      }
    } catch (error) {
      console.log('error => ', error);
    }
  }

  handleAddPokemon(pokemon) {
    const {actionAddPokemon} = this.props;
    actionAddPokemon(pokemon);
  }

  render() {
    const {list} = this.state;
    const {navigation, size} = this.props;
    return (
      <Container>
        {list.length > 0 ? (
          <>
            <SizeButton onPress={() => navigation.navigate('pokelist')}>
              <SizeIcon name="shopping-cart" />
              <SizeText>{size}</SizeText>
            </SizeButton>
            <FlatList
              onEndReached={() => {}}
              onEndReachedThreshold={1}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={list}
              renderItem={(item) => (
                <PokeCard
                  goToDetails={() => {
                    navigation.navigate('details', {
                      pokemon: item.item,
                    });
                  }}
                  addPokemon={(pokemon) => this.handleAddPokemon(pokemon.item)}
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    size: state.pokedex.length,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PokeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
