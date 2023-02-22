import style from './Restaurant.module.scss'
import { Link } from 'react-router-dom'

type RestaurantProps = {
    id: number,
    name: string,
    foodStars: number,
    serviceStars: number,
    valueStars: number,
    atmosphereStars: number,
    image: string,
    onClick?: () => void
}

const Restaurant = ({id, name, foodStars, serviceStars, valueStars, atmosphereStars, image, onClick}: RestaurantProps) => {

    const stars = Math.round((foodStars+serviceStars+valueStars+atmosphereStars)/4)

    return (
        <Link 
            to = {`/restaurants/${id}`}
            className = { style.post }>
            <div className = { style.overlay }>
                <h1>
                    { name }
                </h1>
                <p className = { style.readMore }>
                    Click to view more
                </p>
            </div>
            <img src= { image } className = {style.cardImage}/>
            <div>
                { name }
            </div>
            {"⭐".repeat(stars)}
        </Link>
    )
}

export default Restaurant