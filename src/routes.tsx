import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import PokeList from './pages/PokeList';
import Details from './pages/Details';

export type Poke = {
  index: number|undefined|null,
  name: string,
  url: string,
}

export type RootStackParamList = {
  Home: undefined,
  Pokelist: {
    params: any|undefined
  },
  Details: {
    pokemonParam: Poke
  }
}

const RootStack = createStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#debd29',
          },
          headerTintColor: '#fff',
        }}>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{title: 'Pokemons'}}
        />
        <RootStack.Screen
          name="Pokelist"
          component={PokeList}
          options={{title: 'Seus pokemos'}}
        />
        <RootStack.Screen
          name="Details"
          initialParams={{ pokemonParam: {name: ''} }}
          component={Details}
          options={{title: 'Detalhes'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
