import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesList from './src/components/MoviesList';
import MovieDetail from './src/components/MovieDetail'
import { Ionicons } from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

const PopularMoviesStack = createStackNavigator();

function PopularMoviesListStackScreen() {
  return (
    <PopularMoviesStack.Navigator screenOptions={{ headerShown: false }}>
      <PopularMoviesStack.Screen name="PopularMovies" component={MoviesList} initialParams={{ isPopular: true }} />
      <PopularMoviesStack.Screen name="MovieDetail" component={MovieDetail} options={({ route }) => ({ title: route.params.movie.title })} />
    </PopularMoviesStack.Navigator>
  )
}

const TopRatedMoviesStack = createStackNavigator();

function TopRatedMoviesListStackScreen() {
  return (
    <TopRatedMoviesStack.Navigator screenOptions={{ headerShown: false }}>
      <TopRatedMoviesStack.Screen name="TopRatedMovies" component={MoviesList} initialParams={{ isPopular: false }} />
      <TopRatedMoviesStack.Screen name="MovieDetail" component={MovieDetail} options={({ route }) => ({ title: route.params.movie.title })} />
    </TopRatedMoviesStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'PopularMovies') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
      >
        <Tab.Screen name="PopularMovies" component={PopularMoviesListStackScreen} options={{ title: 'Popular' }} />
        <Tab.Screen name="TopRatedMovies" component={TopRatedMoviesListStackScreen} options={{ title: 'Top Rated' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}