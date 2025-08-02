import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const ProductItem = ({id,image,name,price}) => {
    
  const {currency} =useContext(ShopContext);
     const imgSrc = (Array.isArray(image) && image.length > 0)  ? image[0] : assets.place_holder

    return (
    <div>
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={imgSrc}/>
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
    </div>
  )
}

export default ProductItem