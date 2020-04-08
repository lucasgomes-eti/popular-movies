export const environment = {
    api: {
        base_url: 'http://api.themoviedb.org/3',
        images_base_url: 'https://image.tmdb.org/t/p/w500',
        youtube_thumb_base_url: 'https://img.youtube.com/vi',
        youtube_video_base_url: 'https://www.youtube.com/watch?v=',
        api_key: '1db4f4cccc63b2f2bdb0cdf1aa97dd4f'
    },
    routes: {
        popular_movies: '/movie/popular',
        top_rated_movies: '/movie/top_rated'
    },
    storage_keys: {
        movies: '@movies'
    }
}