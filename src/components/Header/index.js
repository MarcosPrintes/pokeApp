import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../assets/images/logo.png';
import {Container, CartAmount, Logo} from './styles';

const Header = () => {
  return (
    <Container>
      <Logo source={logo} />
      <CartAmount>
        <Icon name="shopping-cart" />
        <Text>0</Text>
      </CartAmount>
    </Container>
  );
};

export default Header;
