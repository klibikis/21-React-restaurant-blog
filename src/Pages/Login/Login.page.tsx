import style from './Login.page.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

declare global {
    interface Window {
        user:any;
    }
}

const LoginPage = () => {

const [user, setUser] = useState("")
const navigate = useNavigate()

const onSubmit = () => {
    // window.user = user
    localStorage.setItem('user', user);
    navigate("/home")
}




    return (
        <div className={style.container} style={{marginTop: "100px"}}>
            <h1 className={style.title}>Free shared use restaurant review platform</h1>
            <form className={style.loginContainer}
                onSubmit = {(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
                >
                <div className={style.flexRow}>
                    <label htmlFor='login' className={style.loginLabel}>Your name</label>
                    <input 
                    required
                    id = 'login' 
                    value = {user}
                    className={style.loginInput}
                    onChange = {(e) => {
                        setUser(e.target.value)
                    }}
                    />
                </div>
                <button className={style.loginButton}>Enter page</button>
            </form>
            
            
            <div className={style.allImages}>
                <div
                className = {style.imageContainer}>
                        <img src = "https://www.gov.il/BlobFolder/news/top-50-best-restaurants-in-the-middle-east/en/restaurant.jpg" className={style.image}>
                        </img>
                        <div className={style.imageOverlay}></div>
                </div>
                <div
                className = {style.imageContainer}>
                        <img src = "https://www.gov.il/BlobFolder/news/top-50-best-restaurants-in-the-middle-east/en/restaurant.jpg" className={style.image}>
                        </img>
                        <div className={style.imageOverlay}></div>
                </div>
                <div
                className = {style.imageContainer}>
                        <img src = "https://www.gov.il/BlobFolder/news/top-50-best-restaurants-in-the-middle-east/en/restaurant.jpg" className={style.image}>
                        </img>
                        <div className={style.imageOverlay}></div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage