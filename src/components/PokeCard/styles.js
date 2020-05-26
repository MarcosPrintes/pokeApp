import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  padding: 16px;
  width: 140px;
  background-color: #fff;
  border-radius: 4px;
  margin: 10px 0;
  margin-right: 10px;
  height: 200px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  background: #eee;
  margin-bottom: 5px;
`;

export const Name = styled.Text`
  color: #000;
  text-align: center;
  margin: 10px 0;
  text-transform: capitalize;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ActionButton = styled.TouchableHighlight.attrs({
  underlayColor: '#debd27',
})`
  width: 36px;
  height: 36px;
  border-radius: 22px;
  background-color: #debd29;
  align-items: center;
  justify-content: center;
`;

export const ButtonIcon = styled(Icon)``;
