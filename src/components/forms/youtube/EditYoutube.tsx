import { useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom'
import type { YoutubeType } from '../../../schemas/youtubeSchema'
import { UpdateYoutubeForm } from './UpdateYoutubeForm'
import { getVideoById } from '../../../api/youtubeAPI'

type EditYoutubeProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    id: YoutubeType['id']
}

export const EditYoutube = ({ id, setShow } : EditYoutubeProps) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["youtubeVideos", id],
        queryFn: () => getVideoById(id)
    })

    if(isLoading) return 'Cargando'
    if(isError) return <Navigate to='/404' />
    if(data) return <UpdateYoutubeForm data={data} id={id} setShow={setShow} />

}
