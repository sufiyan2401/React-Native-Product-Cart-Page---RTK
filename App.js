/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Carts from './screens/Carts';
import {Provider} from 'react-redux';
import {store} from './src/Slices/store';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{title: 'Products'}}
          />
          <Drawer.Screen
            name="Carts"
            component={Carts}
            options={{title: 'Carts'}}
          />
        </Drawer.Navigator>
        {/* <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerTitle: 'Products',
          headerRight: () => (
            <View>
              <Text onPress={() => navigation.navigate('Carts')}>Cart</Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="ProInf"
        component={Carts}
        options={({navigation}) => ({
          headerTitle: 'Cart',
          headerRight: () => (
            <View>
              <Text onPress={() => navigation.navigate('Home')}>Home</Text>
            </View>
          ),
        })}
      /> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
