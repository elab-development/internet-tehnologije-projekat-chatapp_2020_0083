import { useEffect,useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser=(chat,user)=>{
    const [recipientUser, setRecipientUser]=useState(null)
    const[error, setError]=useState(null)

    const recicipientId= chat?.members.find((id)=> id!==user.id?._id)
    useEffect(()=>{
        const getUser = async()=>{
            if(!recicipientId) return null;
            const response = await getRequest(`${baseUrl}/users/find/${recicipientId}`)
            if(response.error){
                return setError(error)
            }
            setRecipientUser(response)
        }

        getUser()

    },[]);

    return {recipientUser}
}