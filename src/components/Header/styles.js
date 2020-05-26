import styled from 'styled-components';

export const Container = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding: 0 16px;
  background-color: #7159c1;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 80px;
  border-width: 1px;
  border-color: #000;
  height: 40px;
`;

export const CartAmount = styled.View`
  flex-direction: row;
  align-items: center;
`;
