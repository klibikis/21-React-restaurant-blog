import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/Home.page';
import RestaurantPage from './Pages/Restaurant/Restaurant.page';
import RestaurantsPage from './Pages/Restaurants/Restaurants.page'
import NavBar from './assets/Components/NavBar/NavBar';
import NewRestaurant from './Pages/NewRestaurant/NewRestaurant';

function App() {



  return (
    <>
      <div className="App">
      
      </div>

      <NavBar/>
      <Routes>
        <Route path = '/' element = {<HomePage/>} />
        <Route path = '/restaurants' element = {<RestaurantsPage/>}>
          <Route path = '/restaurants/*' element = { <div className='errorContainer'><h1 className="error">Error 404 not found</h1></div> } />
        </Route>
        <Route path = '/restaurants/:id' element = {<RestaurantPage/>} />
        <Route path = '/new' element = {<NewRestaurant/>} />
        <Route path = "/*" element = { <div className='errorContainer'><h1 className="error">Error 404 not found</h1></div> }></Route>
      </Routes>
    </>
  )
}

export default App
