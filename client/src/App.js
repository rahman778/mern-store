import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DrawerProvider } from "./context/DrawerContext";
import { UserProvider } from "./context/UserContext";
import Layout from "./layout/Layout";
import ProductList from "./pages/ProductList";
import { CartProvider } from "./context/CartContext";

function App() {
   return (
      <DrawerProvider>
         <UserProvider>
            <CartProvider>
               <Routes>
                  <Route path="/" element={<Layout />}>
                     <Route path="/" element={<ProductList />} />
                  </Route>
               </Routes>
               <Toaster />
            </CartProvider>
         </UserProvider>
      </DrawerProvider>
   );
}

export default App;
