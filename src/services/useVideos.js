import { useEffect, useState } from "react";
import axios from "axios";
import { environment } from "../helpers/environment";

export default function useVideos(movieId) {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data: result } = await axios.get(`${environment.api.base_url}/movie/${movieId}/videos?api_key=${environment.api.api_key}`)
                setVideos(result)
                console.log('network call videos')
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    return [videos]
}