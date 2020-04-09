import axios from 'axios'
import { environment } from '../helpers/environment'
import { MoviesListType } from '../../App'
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function useMovies(movieListType, getFavorites) {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMovies = (async () => {
        try {

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
                setLoading(true)
                const { data: result } = await axios.get(`${environment.api.base_url}${route}?api_key=${environment.api.api_key}`)
                setData(result.results)
                setLoading(false)
                console.log(`network call ${movieListType} movies`)
            } else {
                setLoading(true)
                const result = await getFavorites()
                setData(result)
                setLoading(false)
                console.log('favorites')
            }

        } catch (error) {
            console.log(error)
        }

    })

    useEffect(() => {

        (async () => {

            await loadMovies()

        })();

    }, []);


    useFocusEffect(
        useCallback(() => {
            if (movieListType === MoviesListType.FAVORITES) {
                (async () => {
                    await loadMovies()
                })();
            }
        }, [])
    );


    return [data, setData, loading, () => { }];
}