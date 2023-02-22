import style from './RestaurantForm.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

type RestaurantProps = {
    id: any,
    name: string,
    description: string,
    foodStars: number,
    serviceStars: number,
    valueStars: number,
    atmosphereStars: number,
    image: string,
    location: string
}

type RestaurantFormProps = {
    formTitle: string
    onFormSubmit: (submitProps: RestaurantProps) => void
}

const RestaurantForm = ({formTitle, onFormSubmit}: RestaurantFormProps) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [location, setLocation] = useState("");
    const [foodStars, setFoodStars] = useState(1);
    const [serviceStars, setServiceStars] = useState(1);
    const [valueStars, setValueStars] = useState(1);
    const [atmosphereStars, setAtmosphereStars] = useState(1);
    let { id } = useParams()

    const handlePostSubmit = () => {
        const submitProps = {id, name, description, image, location, foodStars, serviceStars, valueStars, atmosphereStars}
        onFormSubmit(submitProps)
    }

    useEffect(() => {
        axios.get<RestaurantProps>(`http://localhost:3006/restaurants/${id}`)
        .then(res => {
            setName(res.data.name) 
            setDescription(res.data.description) 
            setImage(res.data.image) 
            setLocation(res.data.location) 
            setFoodStars(res.data.foodStars) 
            setServiceStars(res.data.serviceStars) 
            setValueStars(res.data.valueStars) 
            setAtmosphereStars(res.data.atmosphereStars) 
    })
    }, [])

    return (
        <>
            <div className = { style.container }>
                <h1 className={style.title}>{formTitle}</h1>
                <form className={style.form}
                    onSubmit = {(e) => {
                        e.preventDefault()
                        handlePostSubmit()
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
        </>
    )
}

export default RestaurantForm