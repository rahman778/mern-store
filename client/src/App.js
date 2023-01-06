import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { DrawerProvider } from "./context/DrawerContext";
import { UserProvider } from "./context/UserContext";
import Layout from "./layout/Layout";
import ProductList from "./pages/ProductList";

function App() {
   return (
      <DrawerProvider>
         <UserProvider>
            <Routes>
               <Route path="/" element={<Layout />}>
                  <Route path="/" element={<ProductList />} />
               </Route>
            </Routes>
            <Toaster />
         </UserProvider>
      </DrawerProvider>
   );
}

export default App;
