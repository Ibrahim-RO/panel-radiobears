import { useQuery } from '@tanstack/react-query'
import { getHostById } from '../../../api/hostsAPI'
import { Navigate } from 'react-router-dom'
import { UpdateHostForm } from './UpdateHostForm'
import type { HostType } from '../../../schemas/hostSchema'

type EditHostProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    id: HostType['id']
}

export const EditHost = ({ id, setShow } : EditHostProps) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["host", id],
        queryFn: () => getHostById(id)
    })

    if(isLoading) return 'Cargando'
    if(isError) return <Navigate to='/404' />
    if(data) return <UpdateHostForm data={data} id={id} setShow={setShow} />

}
