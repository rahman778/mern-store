import React from 'react'
import Product from '../components/Product'

const dummyData = [
  {
    id:1,
    name: "Nike Air Max",
    slug: "nike-air-max",
    imageUrl: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "A comfortable and stylish shoe with Air Max cushioning technology.",
    stock: 10,
    price: 119.99,
    isActive: true,
    brand: "Nike",
    category: "men",
    discount: null
  },
  {
    id:2,
    name: "Adidas Ultra Boost",
    slug: "adidas-ultra-boost",
    imageUrl: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "A high-performance running shoe with a responsive and cushioned feel.",
    stock: 5,
    price: 149.99,
    isActive: true,
    brand: "Adidas",
    category: "men",
    discount: null
  },
  {
    id:3,
    name: "Converse Chuck Taylor",
    slug: "converse-chuck-taylor",
    imageUrl: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "A classic and versatile canvas shoe with a rubber sole.",
    stock: 15,
    price: 59.99,
    isActive: true,
    brand: "Converse",
    category: "women",
    discount: null
  },
  {
    id:4,
    name: "Timberland 6-Inch Premium",
    slug: "timberland-6-inch-premium",
    imageUrl: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "A durable and waterproof leather boot with a padded collar and insole.",
    stock: 8,
    price: 199.99,
    isActive: true,
    brand: "Timberland",
    category: "men",
    discount: null
  }
];


function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-8">
      {dummyData.map(product => (
        <Product productData={product}/>
      ))}
    </div>
    
  )
}

export default ProductList