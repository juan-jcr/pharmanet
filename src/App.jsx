import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProductsProvider } from './context/ProductContext';
import { LayoutAdmin } from './layout/LayoutAdmin'
//pages
import { Home } from './pages/Home'
import { Error404 } from './pages/Error404';

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutAdmin />} >
          <Route path="/" element={
           <ProductsProvider> <Home /></ProductsProvider>
          } />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
