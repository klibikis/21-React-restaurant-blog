import style from './NewRestaurant.module.scss'
import { useState } from 'react'
import axios from 'axios'
import { useQuery, QueryClient, useQueryClient, useMutation } from '@tanstack/react-query'

type RestaurantProps = {
    name: string,
    description: string,
    foodStars: number,
    serviceStars: number,
    valueStars: number,
    atmosphereStars: number,
    image: string,
    location: string
    // status: "error" | "success" | "loading",
    // error: unknown
}

const NewRestaurant = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [foodStars, setFoodStars] = useState(1);
    const [serviceStars, setServiceStars] = useState(1);
    const [valueStars, setValueStars] = useState(1);
    const [atmosphereStars, setAtmosphereStars] = useState(1);


    const addReview = (review: RestaurantProps) => {
        return axios.post(`http://localhost:3000/restaurants`, review
    )}

    const postReview = () => {
        const queryClient =  useQueryClient()
        return useMutation(addReview, {
            onSuccess: () => {
                queryClient.invalidateQueries(["restaurants"])
            }
        })
    }

    const { mutate, isLoading, isError, error } = postReview()

    const handlePostSubmit = () => {
        const review = {name, description, image, location, foodStars, serviceStars, valueStars, atmosphereStars}
        mutate(review)
        setName("")
        setDescription("")
        setLocation("")
        setImage("")
        setFoodStars(1)
        setValueStars(1)
        setServiceStars(1)
        setAtmosphereStars(1)
        
        if(isLoading===true)<h1>Loading..........</h1>
        if(isError===true)<h1>{JSON.stringify(error)}</h1>
    }


    return (
        <div className = { style.container }>
            <h1 className={style.title}>Add new restaurant review:</h1>
            <form className={style.form}
                onSubmit = {(e) => {
                    e.preventDefault()
                    handlePostSubmit()
                    
                    console.log("render")
                }}>
                <div className={style.formInput}>
                    <label className={style.label} 
                        htmlFor = "name">
                        Restaurant name:
                    </label>
                    <input 
                        type = "text" 
                        value = {name} 
                        className={style.input} 
                        placeholder = "Lido" 
                        id = "name" 
                        autoFocus 
                        required
                        onChange = {(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className={style.formInput}>
                    <label className={style.label}>Review</label>
                    <input 
                    type = "text" 
                    value = {description} 
                    className={style.input} 
                    placeholder = "Some good or bad review" 
                    required 
                    onChange = {(e) => {
                            setDescription(e.target.value)
                    }}/>
                </div>
                <div className={style.formInput}>
                    <label 
                        className={style.label}>
                        Image
                    </label>
                    <input 
                        type = "text" 
                        value = {image} 
                        className={style.input} 
                        placeholder = "https://pic.la.lv/2021/07/LET_24588760-1-800x529.jpg" 
                        required
                        onChange = {(e) => {
                            setImage(e.target.value)
                        }}
                    />
                </div>
                <div className={style.formInput}>
                    <label 
                        className={style.label}>
                        Location
                    </label>
                    <input 
                        required
                        type = "text" 
                        value = {location} 
                        className={style.input} 
                        placeholder = "Krasta iela 76, Latgales priekšpilsēta, Riga" 
                        onChange = {(e) => {
                            setLocation(e.target.value)
                        }}
                    />
                </div>
                <div className={style.formInput}>
                    <label 
                        className={style.label} 
                        htmlFor = "foodStars">
                        Food ⭐
                    </label>
                    <select 
                        className={style.option} 
                        required
                        value = {foodStars} 
                        id = "foodStars"
                        onChange = {(e) => {
                        setFoodStars(+e.target.value)
                        }}>
                        <option value = "1">⭐</option>
                        <option value = "2">⭐⭐</option>
                        <option value = "3">⭐⭐⭐</option>
                        <option value = "4">⭐⭐⭐⭐</option>
                        <option value = "5">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <div className={style.formInput}>
                    <label 
                        className={style.label} 
                        htmlFor = "serviceStars">
                        Service ⭐
                    </label>
                    <select 
                        className={style.option} 
                        required
                        value = {serviceStars} 
                        id = "serviceStars"
                        onChange = {(e) => {
                            setServiceStars(+e.target.value)
                        }}>
                        <option value = "1">⭐</option>
                        <option value = "2">⭐⭐</option>
                        <option value = "3">⭐⭐⭐</option>
                        <option value = "4">⭐⭐⭐⭐</option>
                        <option value = "5">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <div className={style.formInput}>
                    <label 
                        className={style.label} 
                        htmlFor = "valueStars">
                        Value ⭐
                    </label>
                    <select 
                        className={style.option} 
                        required
                        value = {valueStars} 
                        id = "valueStars"
                        onChange = {(e) => {
                            setValueStars(+e.target.value)
                        }}>
                        <option value = "1">⭐</option>
                        <option value = "2">⭐⭐</option>
                        <option value = "3">⭐⭐⭐</option>
                        <option value = "4">⭐⭐⭐⭐</option>
                        <option value = "5">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <div className={style.formInput}>
                    <label 
                        className={style.label} 
                        htmlFor = "atmosphereStars">
                        Atmosphere ⭐
                    </label>
                    <select 
                        className={style.option} 
                        required
                        value = {atmosphereStars} 
                        id = "atmosphereStars"
                        onChange = {(e) => {
                            setAtmosphereStars(+e.target.value)
                        }}>
                        <option value = "1">⭐</option>
                        <option value = "2">⭐⭐</option>
                        <option value = "3">⭐⭐⭐</option>
                        <option value = "4">⭐⭐⭐⭐</option>
                        <option value = "5">⭐⭐⭐⭐⭐</option>
                    </select>
                </div>
                <button className={style.submit}>Submit</button>
            </form>
        </div>
    )
}



export default NewRestaurant