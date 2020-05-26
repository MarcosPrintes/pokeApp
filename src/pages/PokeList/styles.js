import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components';

export const Container = styled.View`
  background: #ccc;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScrollView = styled.ScrollView`
  padding: 0 16px;
  flex: 1;
  background: #ccc;
`;

export const ContainerAvatar = styled.View`
  align-items: center;
  justify-content: center;
`;

export const InlineContainer = styled(ContainerAvatar)`
  flex-direction: row;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  margin: 10px 0;
  border-radius: 4px;
  padding: 5px;
  background: #eee;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

export const Name = styled.Text`
`;

export const Amount = styled.Text`
  margin: 0 15px;
`;

export const IconButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
`;

export const RoundButton = styled(IconButton)`
  border-width: 1px;
  width: 32px;
  height: 32px;
  background: #debd29;
  border-radius: 16px;
`;
