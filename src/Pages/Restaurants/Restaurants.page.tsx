import Restaurant from "../../assets/Components/Restaurant/Restaurant"
import axios from 'axios'
import { useQuery } from "@tanstack/react-query"
import style from './Restaurants.page.module.scss'

type Restaurants = {
    id: number,
    name: string,
    foodStars: number,
    serviceStars: number,
    valueStars: number,
    atmosphereStars: number,
    image: string,
    onClick?: () => void
}

const RestaurantsPage = () => {

    const getRestaurants = () => {
        return axios
            .get("http://localhost:3000/restaurants")
            .then(res => {
                return res.data
        })
    }

    const characterList = useQuery({
        queryKey: ["characters"],
        queryFn: getRestaurants,
    })

    if (characterList.status === "loading") return <h1>Loading...</h1>
    if (characterList.status === "error") return <h1>{JSON.stringify(characterList.error)}</h1>

    return (
        <div className={ style.cardWrapper }>
                {characterList.data.map(({id, name, foodStars, serviceStars, valueStars, atmosphereStars, image}: Restaurants) => (
                    <Restaurant
                        id = { id }
                        key = { id }
                        name = { name }
                        image = { image }
                        foodStars = { foodStars }
                        serviceStars = {serviceStars}
                        valueStars = {valueStars}
                        atmosphereStars = {atmosphereStars}
                        onClick = {() => {
                            console.log(id)
                        } }
                    />
                ))}
        </div>
    )
}



export default RestaurantsPage