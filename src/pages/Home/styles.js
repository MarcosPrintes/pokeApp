import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 16px;
  background: #ccc;
  align-items: center;
`;

export const SizeButton = styled(RectButton)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #b3a125;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SizeIcon = styled(Icon)`
  color: #fff;
  margin-right: 2px;
`;

export const SizeText = styled.Text`
  color: #fff;
`;
