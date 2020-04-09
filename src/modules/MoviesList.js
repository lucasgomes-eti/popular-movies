import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Button, SafeAreaView, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios'
import { environment } from '../helpers/environment'
import { MoviesListType } from '../../App'
import AsyncStorage from '@react-native-community/async-storage';
import useMovies from '../services/useMovies';

const styles = StyleSheet.create({
  movie: {
    flex: 1,
    height: 320
  }
});

function Movie({ movie, setData, isInFavoriteScreen }) {
  const navigation = useNavigation();
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
    if (valuesStr == null)
      return []
    return JSON.parse(valuesStr)
  } catch (error) {
    console.log(error)
  }
})

export default function MoviesList({ route }) {
  const { movieListType } = route.params

  const [data, setData, loading] = useMovies(movieListType, getFavorites);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Movie movie={item}
        isInFavoriteScreen={movieListType === MoviesListType.FAVORITES} setData={setData} />}
      keyExtractor={item => `${item.id}`}
      refreshing={loading}
      numColumns={2}
    />
  );
}