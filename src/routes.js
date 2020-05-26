import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import PokeList from './pages/PokeList';
import Details from './pages/Details';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#debd29',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{title: 'Pokemons'}}
        />
        <Stack.Screen
          name="pokelist"
          component={PokeList}
          options={{title: 'Seus pokemos'}}
        />
        <Stack.Screen
          name="details"
          component={Details}
          options={{title: 'Detalhes'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
