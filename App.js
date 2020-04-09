import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoviesList from './src/modules/MoviesList';
import MovieDetail from './src/modules/MovieDetail'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from './src/helpers/colors';
import { useDarkMode } from 'react-native-dark-mode';

const Tab = createBottomTabNavigator();

const PopularMoviesStack = createStackNavigator();

function PopularMoviesListStackScreen() {
  return (
    <PopularMoviesStack.Navigator screenOptions={{ headerShown: false }}>
      <PopularMoviesStack.Screen name="PopularMovies" component={MoviesList} initialParams={{ movieListType: MoviesListType.POPULAR }} />
      <PopularMoviesStack.Screen name="MovieDetail" component={MovieDetail} options={({ route }) => ({ title: route.params.movie.title })} />
    </PopularMoviesStack.Navigator>
  )
}

const TopRatedMoviesStack = createStackNavigator();

function TopRatedMoviesListStackScreen() {
  return (
    <TopRatedMoviesStack.Navigator screenOptions={{ headerShown: false }}>
      <TopRatedMoviesStack.Screen name="TopRatedMovies" component={MoviesList} initialParams={{ movieListType: MoviesListType.TOP_RATED }} />
      <TopRatedMoviesStack.Screen name="MovieDetail" component={MovieDetail} options={({ route }) => ({ title: route.params.movie.title })} />
    </TopRatedMoviesStack.Navigator>
  )
}

const FavoriteMoviesStack = createStackNavigator();

function FavoriteMoviesListStackScreen() {
  return (
    <FavoriteMoviesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoriteMoviesStack.Screen name="FavoriteMovies" component={MoviesList} initialParams={{ movieListType: MoviesListType.FAVORITES }} />
      <FavoriteMoviesStack.Screen name="MovieDetail" component={MovieDetail} options={({ route }) => ({ title: route.params.movie.title })} />
    </FavoriteMoviesStack.Navigator>
  )
}

export default function App() {
  const isInDarkMode = useDarkMode()
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          switch (route.name) {
            case 'PopularMovies':
              iconName = 'star'
              break;
            case 'TopRatedMovies':
              iconName = 'thumbs-up'
              break;
            case 'FavoriteMovies':
              iconName = 'heart'
              break;
            default:
              break;
          }
          return <Icon name={iconName} size={size} color={color} solid={focused} />
        }
      })}
        tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'gray', style: { backgroundColor: colors.background(isInDarkMode) } }}>
        <Tab.Screen name="PopularMovies" component={PopularMoviesListStackScreen} options={{ title: 'Popular' }} />
        <Tab.Screen name="TopRatedMovies" component={TopRatedMoviesListStackScreen} options={{ title: 'Top Rated' }} />
        <Tab.Screen name="FavoriteMovies" component={FavoriteMoviesListStackScreen} options={{ title: 'Favorites' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export const MoviesListType = {
  POPULAR: 'popular',
  TOP_RATED: 'top_rated',
  FAVORITES: 'favorites'
}