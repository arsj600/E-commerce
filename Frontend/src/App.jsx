import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Orders'
import Navbar from './components/Navbar'
import './index.css'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'
import PromptFilter from './components/PromptFilter'


function App() {

  return (
  <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <ToastContainer/>
    <Navbar/>
    <PromptFilter/>
    <SearchBar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/place-order' element={<PlaceOrder/>}/>
      <Route path='/orders' element={<Order/>}/>
      <Route path="/verify" element={<Verify/>} />
   </Routes>
   <Footer/>
  </div>
  )
}

export default App
