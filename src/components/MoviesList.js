import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, Button, SafeAreaView, Image, StyleSheet, FlatList } from 'react-native';
import axios from 'axios'
import { environment } from '../helpers/environment'

const styles = StyleSheet.create({
  movie: {
    flex: 1,
    height: 320
  }
});

function Movie({ movie, navigation }) {

  return (
    <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.7} onPress={() => {
      navigation.navigate('MovieDetail', { movie: movie })
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

export default function MoviesList({ route, navigation }) {
  const { isPopular } = route.params

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: result } = await axios.get(`${environment.api.base_url}${(isPopular
        ? environment.routes.popular_movies
        : environment.routes.top_rated_movies)}?api_key=${environment.api.api_key}`)
      setData(result)
      console.log(`network call ${(isPopular ? 'popular' : 'top rated')} movies`)
    })();
  }, [])

  return (
    <FlatList
      data={data.results}
      renderItem={({ item }) => <Movie movie={item} navigation={navigation} />}
      keyExtractor={item => `${item.id}`}
      numColumns={2}
    />
  );
}

