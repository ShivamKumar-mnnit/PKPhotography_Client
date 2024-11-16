// // pages/add-to-cart.js
// import React from 'react';
// import { useCart } from '../context/CartContext';

// const AddToCart = () => {
//   const { cartItems, addToCart } = useCart();

 
//   const products = [
//     { id: 1, name: 'Product 1', image: '/images/product1.jpg' },
//     { id: 2, name: 'Product 2', image: '/images/product2.jpg' },
//     { id: 3, name: 'Product 3', image: '/images/product3.jpg' },
//   ];

//   const handleAddToCart = (product) => {
//     addToCart(product);
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="border rounded-lg p-4">
//             <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded-lg mb-2" />
//             <h2 className="text-lg font-semibold">{product.name}</h2>
//             <button
//               onClick={() => handleAddToCart(product)}
//               className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       <h1 className="text-2xl font-bold mt-8 mb-4">Cart</h1>
//       <div className="flex flex-wrap gap-4">
//         {cartItems.map((item, index) => (
//           <div key={index} className="border rounded-lg p-4">
//             <img src={item.image} alt={item.name} className="h-32 w-full object-cover rounded-lg mb-2" />
//             <h2 className="text-lg font-semibold">{item.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddToCart;
