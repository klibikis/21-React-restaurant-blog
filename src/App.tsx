import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/Home.page';
import RestaurantPage from './Pages/Restaurant/Restaurant.page';
import RestaurantsPage from './Pages/Restaurants/Restaurants.page'
import NavBar from './assets/Components/NavBar/NavBar';

function App() {



  return (
    <>
      <div className="App">
      
      </div>

      <NavBar/>
      <Routes>
        <Route path = '/' element = {<HomePage/>} />
        <Route path = '/restaurants' element = {<RestaurantsPage/>} />
        <Route path = '/restaurants/:id' element = {<RestaurantPage/>} />
        <Route path ="*" element = { <h1>Error 404 not found</h1> }></Route>
      </Routes>
    </>
  )
}

export default App
