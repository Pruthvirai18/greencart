import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchQuery])

  return (
    <div className="mt-16 px-6 md:px-10 lg:px-20">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 uppercase">All Products</h2>
        <div className="mt-2 w-20 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
        {filteredProducts.filter((product)=> product.inStock).map((product,index) => (

            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  )
}

export default AllProducts
