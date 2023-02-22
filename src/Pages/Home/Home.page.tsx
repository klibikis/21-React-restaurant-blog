import style from './Home.page.module.scss'
import { Link } from 'react-router-dom'
import NavBar from '../../assets/Components/NavBar/NavBar'

const HomePage = () => {

    return (
        <>
            <NavBar/>
            <div className={style.container}>
                <h1 className={style.title}>Free shared use restaurant review platform</h1>
                <p>Feel free to add a restaurant review or comment to one of existing reviews on restaurant review page</p>
                <div className={style.allImages}>
                    <Link to = {`/restaurants/`}
                    className = {style.imageContainer}>
                        <img src = "https://www.gov.il/BlobFolder/news/top-50-best-restaurants-in-the-middle-east/en/restaurant.jpg" className={style.image}>
                        </img>
                        <div className={style.imageOverlay}></div>
                    </Link>
                    <Link to = {`/restaurants/`}
                    className = {style.imageContainer}>
                        <img src = "https://www.gov.il/BlobFolder/news/top-50-best-restaurants-in-the-middle-east/en/restaurant.jpg" className={style.image}>
                        </img>
                        <div className={style.imageOverlay}></div>
                    </Link>
                    <Link to = {`/restaurants/`}
                    className = {style.imageContainer}>
                        <img src = "https://www.gov.il/BlobFolder/news/top-50-best-restaurants-in-the-middle-east/en/restaurant.jpg" className={style.image}>
                        </img>
                        <div className={style.imageOverlay}></div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HomePage