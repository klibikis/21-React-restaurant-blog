import axios from "axios"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, QueryClient, useQueryClient} from "@tanstack/react-query"
import style from './Restaurant.page.module.scss'
import { v4 as uuid } from 'uuid';
import { useState } from "react";
import Comments from "../../assets/Components/Comments/Comments";


type RestaurantProps = {
    id: number,
    name: string,
    description: string,
    foodStars: number,
    serviceStars: number,
    valueStars: number,
    atmosphereStars: number,
    image: string,
    location: string
    comment: string,
    status: "error" | "success" | "loading",
    error: unknown
}
type ID = {
    id: string
}

const RestaurantPage = () => {

    const { id } = useParams<ID>()
    const [commentValue, setCommentValue] = useState("")

    const getRestaurant = () => {
        return axios.get<RestaurantProps>(`http://localhost:3000/restaurants/${id}`)
        .then(res => {
            return res.data
    })}



    // const getComments = () => {
    //     return axios.get<RestaurantProps>(`http://localhost:3000/comments/?id=${id}`)
    //     .then(res => {
    //         const comentari = res.data
    //         return comentari
    // })}
    
    // const createComment = (commentValue: string) => {
    //     return axios.post(`http://localhost:3000/restaurants/${id}/comments`, commentValue)
    //         .then(res => {
    //             res.data})}


    // const handleCommentSubmit = () => {
    //     // CreateComment()
    //     createComment(commentValue)
    //     setCommentValue("")
    // }

    // const CreateComment = () => {

    //     const queryClient = useQueryClient()
    //     const query = useQuery({ queryKey: ['comments']})
    //     const editPostMutation = useMutation({
    //         mutationFn: createComment,
    //         onSuccess: () => {
    //             queryClient.invalidateQueries({ queryKey: ['restaurants', id] })
    //         }
    //     })
    // }


    const {status, error, data: restaurant} = useQuery({
        queryKey: ["restaurants", id],
        queryFn: getRestaurant,
    })

    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>



    return (
        <div className = { style.container }>
            <h1 className= { style.title }>{ restaurant.name }</h1>
            <div className = { style.reviewContainer }>
                <div className = { style.review }>
                    {restaurant.description}
                    <h1>Food {"⭐".repeat(restaurant.foodStars)}</h1>
                    <h1>Service {"⭐".repeat(restaurant.serviceStars)}</h1>
                    <h1>Value {"⭐".repeat(restaurant.valueStars)}</h1>
                    <h1>Atmosphere {"⭐".repeat(restaurant.atmosphereStars)}</h1>
                </div>
                <div className = { style.review }>
                    <img src = {restaurant.image} className = {style.image}/>
                    <p>{restaurant.location}</p>
                </div>
            </div>
            <Comments
            key = {id}
            id = {id}
            />
        </div>
    )
}



export default RestaurantPage