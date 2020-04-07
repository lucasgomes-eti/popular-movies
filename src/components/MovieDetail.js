import React, { useState, useEffect } from 'react'
import { Image, Text, TouchableOpacity, StyleSheet, View, FlatList, Linking } from 'react-native'
import { environment } from '../helpers/environment'
import axios from 'axios'
import { useDarkMode } from 'react-native-dark-mode'

export default function MovieDetail({ route }) {

    const { movie } = route.params

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        (async () => {
            const { data: result } = await axios.get(`${environment.api.base_url}/movie/${movie.id}/videos?api_key=${environment.api.api_key}`)
            setVideos(result)
            console.log('network call videos')
        })();
    }, [])

    renderHeader = () => {
        return (
            <View>
                <Image
                    style={styles.movieBanner}
                    source={{
                        uri: environment.api.images_base_url + movie.poster_path,
                    }} />
                <View>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.body}>{movie.overview}</Text>
                    <View style={styles.movieScoreContainer}>
                        <Text style={[styles.movieScore, { backgroundColor: movie.vote_average >= 7 ? 'lime' : 'yellow' }]}>{movie.vote_average}</Text>
                        <View>
                            <Text style={styles.subtitle}>Release Date</Text>
                            <Text style={styles.releaseDate}>{new Date(movie.release_date).toDateString()}</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Videos</Text>
                </View>
            </View>
        )
    };

    const isDarkMode = useDarkMode()

    return (
        <View>
            <FlatList
                data={videos.results}
                renderItem={({ item }) => <Video video={item} />}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
            />
        </View>
    );
}

function Video({ video }) {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => {
            Linking.openURL(environment.api.youtube_video_base_url + video.key)
        }}>
            <View>
                <Text style={styles.subtitle}>{video.name}</Text>
                <Image
                    style={styles.thumb}
                    source={{
                        uri: `${environment.api.youtube_thumb_base_url}/${video.key}/hqdefault.jpg`
                    }}
                />
            </View>
        </TouchableOpacity>

    );
}


const styles = StyleSheet.create({
    movieBanner: {
        height: 480
    },
    title: {
        fontSize: 24,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    body: {
        fontSize: 14,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    subtitle: {
        fontSize: 16,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    releaseDate: {
        fontSize: 14,
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16
    },
    movieScoreContainer: {
        flexDirection: 'row'
    },
    movieScore: {
        minWidth: 56,
        fontSize: 24,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,

        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        overflow: 'hidden',
        textAlign: 'center'

    },
    thumb: {
        width: 224,
        height: 126,
        margin: 16
    }
})