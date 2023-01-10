import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DrawerProvider } from "./context/DrawerContext";
import { UserProvider } from "./context/UserContext";
import Layout from "./layout/Layout";
import ProductList from "./pages/ProductList";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import InformationPage from "./pages/InformationPage";
import PaymentPage from "./pages/PaymentPage";
import ShippingMethodPage from "./pages/ShippingMethodPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
   return (
      <DrawerProvider>
         <UserProvider>
            <CartProvider>
               <Routes>
                  <Route path="/" element={<Layout />}>
                     <Route path="/" element={<ProductList />} />
                     <Route path="/product/:id" element={<ProductDetailsPage />} />
                     <Route path="/cart" element={<Cart />} />
                     <Route path="/information" element={<InformationPage />} />
                     <Route path="/shipping" element={<ShippingMethodPage />} />
                     <Route path="/payment" element={<PaymentPage />} />
                  </Route>
               </Routes>
               <Toaster />
            </CartProvider>
         </UserProvider>
      </DrawerProvider>
   );
}

export default App;
