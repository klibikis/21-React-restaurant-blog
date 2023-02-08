import axios from "axios"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, QueryClient, useQueryClient} from "@tanstack/react-query"
import style from './Restaurant.page.module.scss'
import { useState } from "react";
import Comments from "../../assets/Components/Comments/Comments";
import NavBar from "../../assets/Components/NavBar/NavBar";
import RestaurantForm from "../../assets/Components/RestaurantForm/RestaurantForm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
}
type ID = {
    id: string
}

const RestaurantPage = () => {

    const { id } = useParams<ID>()
    const [commentValue, setCommentValue] = useState("")
    const [isHidden, setIsHidden] = useState(true)
    let user = localStorage.getItem('user')

    const getRestaurant = () => {
        return axios.get<RestaurantProps>(`http://localhost:3000/restaurants/${id}`)
        .then(res => {
            return res.data
    })}
    const editRestaurant = ({id, name, description, foodStars, serviceStars, valueStars, atmosphereStars, image, location}: RestaurantProps) => {
        return axios.patch<RestaurantProps>("http://localhost:3000/restaurants/" + id, {
            name,
            description,
            foodStars,
            serviceStars,
            valueStars,
            atmosphereStars,
            image,
            location
        });
    }

    const UpdateRestaurant = () => {
        const queryClient =  useQueryClient()
        return useMutation(editRestaurant, {
            onSuccess: () => {
                queryClient.invalidateQueries(["restaurants"])
            }
        })
    }

    const { mutate: updateMutate, isLoading: updateIsLoading, isError: updateIsError, error: updateError } = UpdateRestaurant()
    const handleFormSubmit = (restaurantEditData: RestaurantProps) => {
        updateMutate(restaurantEditData);
        toast.success('Succesfully updated', {
            position: "bottom-left",
            autoClose: 2300,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "dark",
            });
        setTimeout(()=> {
            setIsHidden(!isHidden)
        }, 3000)
    }

    const {status, error, data: restaurant} = useQuery({
        queryKey: ["restaurants", id],
        queryFn: getRestaurant,
    })

    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>


    return (
        <>
            
            {!isHidden && <div className={style.editReviewModal}>

                <div className={style.editReviewContainer}>
                    <RestaurantForm
                    onFormSubmit = {(restaurantEditData) => {
                        handleFormSubmit(restaurantEditData)
                    }}
                    formTitle = "Edit review"/>
                    <button  className={style.closeEdit} onClick = {()=> {
                            setIsHidden(!isHidden)
                            }}>
                                x
                        </button>
                </div>
            </div>}
            
            <NavBar/>
            <div className = { style.container }>
                
                <div className={style.editContainer}>
                    <h1 className= { style.title }>{ restaurant.name }</h1>
                    {user === "Admin" && 
                        <button className={style.editButton} 
                            onClick = {() => {
                            setIsHidden(!isHidden)
                            }}>EDIT
                        </button>}
                </div>
                
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
        </>
    )
}



export default RestaurantPage