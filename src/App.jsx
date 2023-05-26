import Animeitem from './components/animeitem';
import Homepage from './components/homepage';
import Gallery from './components/gallery';
//import {useGlobalContext} from "./context/global"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  /* const global = useGlobalContext()
  // printing values in console from GlobalContext created in global.jsx
  console.log(global) */

  return (
    <BrowserRouter>
      <Routes>
        {/* what to show(element) on which link(path) */}
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<Animeitem />}/>
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
