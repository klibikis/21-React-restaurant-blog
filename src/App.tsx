import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home/Home.page';
import RestaurantPage from './Pages/Restaurant/Restaurant.page';
import RestaurantsPage from './Pages/Restaurants/Restaurants.page'
import NewRestaurant from './Pages/NewRestaurant/NewRestaurant';
import LoginPage from './Pages/Login/Login.page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <div className="App">
      </div>
      <Routes>
        <Route path = '/' element = {<LoginPage/>} />
        <Route path = '/home' element = {<HomePage/>} />
        <Route path = '/restaurants' element = {<RestaurantsPage/>}>
          <Route path = '/restaurants/*' element = { <div className='errorContainer'><h1 className="error">Error 404 not found</h1></div> } />
        </Route>
        <Route path = '/restaurants/:id' element = {<RestaurantPage/>} />
        <Route path = '/new' element = {<NewRestaurant/>} />
        <Route path = "/*" element = { <div className='errorContainer'><h1 className="error">Error 404 not found</h1></div> }></Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        newestOnTop={false}
        theme="dark"
        position="bottom-left"
      />
    </>
  )
}

export default App
