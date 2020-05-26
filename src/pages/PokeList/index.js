import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-native';
import {bindActionCreators} from 'redux';
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

class PokeList extends React.Component {
  handleDelete(id) {
    const {actionRemovePokemon} = this.props;
    actionRemovePokemon(id);
  }

  render() {
    const {pokemonList, navigation, actionUpdatePokemon} = this.props;
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
                    <RoundButton
                      onPress={() =>
                        actionUpdatePokemon(item.id, item.amount - 1)
                      }>
                      <Icon name="remove" color="#fff" size={22} />
                    </RoundButton>
                    <Amount>{item.amount}</Amount>
                    <RoundButton
                      onPress={() =>
                        actionUpdatePokemon(item.id, item.amount + 1)
                      }>
                      <Icon name="add" color="#fff" size={22} />
                    </RoundButton>
                  </InlineContainer>
                  <IconButton onPress={() => this.handleDelete(item.id)}>
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
}

const mapStateToProps = (state) => ({
  pokemonList: state.pokedex,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PokedexActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);
