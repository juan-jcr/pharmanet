import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductsProvider } from './context/ProductContext';
import { LayoutAdmin } from './layout/LayoutAdmin'
//pages
import { Home } from './pages/Home'

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutAdmin />} >
          <Route path="/home" element={
           <ProductsProvider> <Home /></ProductsProvider>
          } />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
