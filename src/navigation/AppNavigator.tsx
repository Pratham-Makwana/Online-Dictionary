// import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import DefinitionScreen from '../screens/DefinitionScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
// import Icon from '../components/Icon';

// export type RootStackParamList = {
//   Home: undefined;
//   Favorites: {screen?: string};
//   FavoritesList: undefined;
//   FavoritesHome: undefined;
//   Definition: {word: string};
// };

// const Stack = createStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{headerShown: false}}
//       />
//       <Stack.Screen
//         name="Definition"
//         component={DefinitionScreen}
//         options={({route}) => ({
//           title: route.params?.word,
//           headerTintColor: '#fff',
//           headerStyle: {
//             backgroundColor: '#5762B7',
//           },
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// const FavoritesStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="FavoritesHome"
//         component={FavoritesScreen}
//         options={{
//           title: 'Favorite Words',
//           headerTintColor: '#fff',
//           headerStyle: {
//             backgroundColor: '#5762B7',
//           },
//         }}
//       />
//       <Stack.Screen
//         name="FavoritesList"
//         component={FavoritesScreen}
//         options={{
//           title: 'Favorites List',
//           headerTintColor: '#fff',
//           headerStyle: {
//             backgroundColor: '#5762B7',
//           },
//         }}
//       />
//       <Stack.Screen
//         name="Definition"
//         component={DefinitionScreen}
//         options={({route}) => ({
//           title: route.params?.word,
//           headerTintColor: '#fff',
//           headerStyle: {
//             backgroundColor: '#5762B7',
//           },
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           tabBarIcon: ({focused, color, size}) => {
//             let iconName;

//             if (route.name === 'Dictionary') {
//               iconName = focused ? 'book' : 'book-outline';
//             } else if (route.name === 'Favorites') {
//               iconName = focused ? 'heart' : 'heart-outline';
//             }

//             return (
//               <Icon
//                 name={iconName || 'help-circle-outline'}
//                 size={size}
//                 color={color}
//                 iconFamily="Ionicons"
//               />
//             );
//           },
//           tabBarActiveTintColor: '#5762B7',
//           tabBarInactiveTintColor: 'gray',
//           tabBarHideOnKeyboard: true,
//         })}>
//         <Tab.Screen
//           name="Dictionary"
//           component={HomeStack}
//           options={{headerShown: false}}
//         />
//         <Tab.Screen
//           name="Favorites"
//           component={FavoritesStack}
//           options={{headerShown: false}}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigator;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DefinitionScreen from '../screens/DefinitionScreen';
import Icon from '../components/Icon';
import FavoritesScreen from '../screens/FavoritesScreen';
import SplashScreen from '../screens/SplashScreen';
import {Colors} from '../types/dictionaryTypes';

export type RootStackParamList = {
  Splash: undefined;
  Home: {screen?: string};
  Definition: {word: string};
};
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Definition"
          component={DefinitionScreen}
          options={({route}) => ({
            title: route.params?.word,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dictionary"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dictionary') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return (
            <Icon
              name={iconName || 'help-circle-outline'}
              size={size}
              color={color}
              iconFamily="Ionicons"
            />
          );
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="Dictionary"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorite Words',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Tab.Navigator>
  );
};
