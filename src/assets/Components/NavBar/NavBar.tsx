import { NavLink } from "react-router-dom"
import style from './NavBar.module.scss'

const NavBar = () => {

  return (
    <nav className= { style.wrapper }>
      <NavLink 
        className={ style.navItem }
        to = "/home" 
        style={({ isActive }) => isActive ? {backgroundColor: "rgb(72, 86, 92)"} : {}}>
        Home
      </NavLink>
      <NavLink 
        className={ style.navItem }
        to = "/restaurants" 
        style={({ isActive }) => isActive ? {backgroundColor: "rgb(72, 86, 92)"} : {}}>
        Restaurant reviews
      </NavLink>
      <NavLink 
        className={ style.navItem }
        to = "/new" 
        style={({ isActive }) => isActive ? {backgroundColor: "rgb(72, 86, 92)"} : {}}>
        New restaurant review
      </NavLink>
    </nav>
  )
}

export default NavBar