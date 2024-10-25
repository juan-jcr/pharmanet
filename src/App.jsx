import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { LayoutAdmin } from './layout/LayoutAdmin'
//pages
import { Home } from './pages/Home'

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutAdmin />} >
          <Route path="/home" element={
            <Home />
          } />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
