import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";


function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route path="/*" element={<Routes>
              <Route path="/app" element={<h2>ggdgdgd</h2>} />
            </Routes>} />
         </Route>
      </Routes>
   );
}

export default App;
