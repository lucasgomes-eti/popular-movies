import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Button, SafeAreaView, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios'
import { environment } from '../helpers/environment'
import { MoviesListType } from '../../App'
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  movie: {
    flex: 1,
    height: 320
  }
});

function Movie({ movie, setData, navigation, isInFavoriteScreen }) {
  return (
    <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('MovieDetail', { movie: movie })
      }}
      onLongPress={() => {
        saveFavorite(movie, setData, isInFavoriteScreen)
      }}>
      <Image
        style={styles.movie}
        source={{
          uri: environment.api.images_base_url + movie.poster_path,
        }}
      />
    </TouchableOpacity>
  );
}

const saveFavorite = (async (movie, setData, isInFavoriteScreen) => {
  try {
    var favorites = await getFavorites()
    const favoritesIds = favorites.map(f => f.id)

    if (favoritesIds.includes(movie.id)) {
      favorites = favorites.filter(item => item.id !== movie.id)
      await AsyncStorage.setItem(environment.storage_keys.movies, JSON.stringify(favorites))
      if (isInFavoriteScreen)
        setData(favorites)
      alert(`You remove ${movie.title} from your favorites`)
    } else {
      favorites.push(movie)
      await AsyncStorage.setItem(environment.storage_keys.movies, JSON.stringify(favorites))
      alert(`You save ${movie.title} as your favorite`)
    }

  } catch (e) {
    alert(e)
  }
})

const getFavorites = (async () => {
  try {
    const valuesStr = await AsyncStorage.getItem(environment.storage_keys.movies)
    return JSON.parse(valuesStr)
  } catch (error) {
    console.log(error)
  }
})

export default function MoviesList({ route, navigation }) {
  const { movieListType } = route.params

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  const loadItems = (async () => {
    let route
    switch (movieListType) {
      case MoviesListType.POPULAR:
        route = environment.routes.popular_movies
        break;
      case MoviesListType.TOP_RATED:
        route = environment.routes.top_rated_movies
        break;
      default:
        break;
    }
    if (route) {
      try {
        setLoading(true)
        const { data: result } = await axios.get(`${environment.api.base_url}${route}?api_key=${environment.api.api_key}`)
        setData(result.results)
        setLoading(false)
        console.log(`network call ${movieListType} movies`)
      } catch (error) {
        alert(error)
        console.log(error)
      }
    } else {
      setLoading(true)
      const result = await getFavorites()
      setData(result)
      setLoading(false)
      console.log('favorites')
    }
  })

  useEffect(() => {
    (async () => {
      await loadItems()
    })();
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (movieListType === MoviesListType.FAVORITES) {
        (async () => {
          await loadItems()
        })();
      }
    }, [])
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Movie movie={item}
        navigation={navigation}
        setData={setData} 
        isInFavoriteScreen={movieListType === MoviesListType.FAVORITES} />}
      keyExtractor={item => `${item.id}`}
      onRefresh={() => { loadItems() }}
      refreshing={loading}
      numColumns={2}
    />
  );
}

