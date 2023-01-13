import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DrawerProvider } from "./context/DrawerContext";
import { UserProvider } from "./context/UserContext";
import Layout from "./layout/Layout";
import ProductList from "./pages/ProductList";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/CartPage";
import InformationPage from "./pages/InformationPage";
import PaymentPage from "./pages/PaymentPage";
import ShippingPage from "./pages/ShippingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

function App() {
   return (
      <DrawerProvider>
         <UserProvider>
            <CartProvider>
               <Routes>
                  <Route path="/" element={<Layout />}>
                     <Route path="/" element={<ProductList />} />
                     <Route path="/product/:id" element={<ProductDetailsPage />} />
                     <Route path="/cart" element={<CartPage />} />
                     <Route path="/information" element={<InformationPage />} />
                     <Route path="/shipping" element={<ShippingPage />} />
                     <Route path="/payment" element={<PaymentPage />} />
                     <Route path="/order/:orderId/success" element={<OrderSuccessPage />} />
                  </Route>
               </Routes>
               <Toaster />
            </CartProvider>
         </UserProvider>
      </DrawerProvider>
   );
}

export default App;
