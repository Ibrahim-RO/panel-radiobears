import { Navigate } from "react-router-dom";
import { UpdateEvent } from "./UpdateEvent";
import { useQuery } from "@tanstack/react-query";
import type { EventType } from "../../schemas/eventSchema";
import { getEventById } from "../../api/eventsAPI";

type EditEventFormProps = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    id: EventType['id']
}

export const EditEventForm = ({ setShow, id } : EditEventFormProps) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEventById(id)
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404' />
    if(data) return <UpdateEvent data={data} id={id} setShow={setShow}/>
    
};
