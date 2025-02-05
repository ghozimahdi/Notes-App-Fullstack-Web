import './App.css'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {routes} from "./routes.tsx";
import {Suspense} from "react";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({path, element}) => (
            <Route key={path} path={path} element={element}/>
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
