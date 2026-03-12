import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navebar";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRouter from "./components/PrivateRouter";
import Login from "./pages/Login";
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<PrivateRouter />}> 
                <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </>
  );
}

export default App;




// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       <header className="bg-white shadow p-4">
//         <h1 className="text-3xl font-bold text-center">Product List</h1>
//       </header>

//       <main className="container mx-auto p-4">
//         <ProductList />
//       </main>
//     </div>
//   );
// }

// export default App;


// import { useEffect, useState } from "react";

// function App() {
//   const [product, setproduct] = useState([]);

//   useEffect(() => {
//   fetch('http://127.0.0.1:8000/product')
//     .then(response => response.json())
//     .then(data => setproduct(data))
//     .catch(error => console.error(error));
// }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 test-gray-800">
//       <h1 className="text-3xl font-bold underline">Product List</h1>
      

//       <div className="container mx-auto p-4">

//         {product.map(product => (
//   <div
//     key={product.id}
//     className="bg-white p-4 rounded shadow mb-4"
//   >
//     <h2 className="text-xl font-semibold">{product.name}</h2>
//     <p className="text-gray-600">{product.description}</p>
//     <p className="text-gray-600 font-bold">{product.price}</p>
//   </div>
// ))}
        
//       </div>
      

//     </div>
//   );
// }

// export default App;
