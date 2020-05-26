import {Animated, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const Container = styled(Animated.View)`
  flex: 1;
  align-items: center;
  background: #ccc;
`;

export const LoadContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled(Animated.Image)`
  width: 200px;
  height: 200px;
  margin-top: 5px;
`;

export const Text = styled.Text`
  margin-bottom: 10px;
  align-self: stretch;
  text-transform: capitalize;
`;

export const TextAbility = styled(Text)`
  border-width: 1px;
  border-color: red;
  align-self: flex-start;
  padding: 5px;
  border-radius: 4px;
  border-color: #3b4cca;
  margin-right: 5px;
`;

export const Bold = styled(Text)`
  font-weight: bold;
`;

export const BottomCard = styled(Animated.View)`
  background-color: #fff;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  position: absolute;
  top: 200px;
  height: 100%;
  width: 95%;
  z-index: -1;
  padding: 48px 16px 0;
  align-items: center;
`;

export const BottomCardHeader = styled.View`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const AbilityContainer = styled(BottomCardHeader)`
  justify-content: flex-start;
`;

export const BottomCardHeaderItem = styled.View`
  align-items: center;
  justify-content: space-between;
`;

export const RoundButton = styled(TouchableOpacity)`
  width: 62px;
  height: 62px;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  position: absolute;
  right: 30px;
  bottom: 220px;
  background: #debd27;
`;

export const Amount = styled(TouchableOpacity).attrs({
  borderless: true,
})`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  border-width: 2px;
  border-color: #3b4cca;
  position: absolute;
  top: 10px;
  left: 10px;
  align-items: center;
  justify-content: center;
`;

export const AmoutText = styled.Text`
  color: #3b4cca;
`;

export const PokedexButton = styled(TouchableOpacity)`
  margin-top: 150px;
  align-items: center;
  justify-content: center;
`;

export const Pokedex = styled(Animated.Image)`
  width: 70px;
  height: 70px;
`;
