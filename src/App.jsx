import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import RutaProtegida from "../layout/RutaProtegida"

import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import NuevoPassword from "./paginas/NuevoPassword"
import OlvidePassword from "./paginas/OlvidePassword"
import AdministrarPacientes from "./paginas/AdministrarPacientes"
import CambiarElPassword from "./paginas/CambiarElPassword"
import EditarElPerfil from "./paginas/EditarElPerfil"

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Rutas Publicas */}
            <Route path="/"  element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
            </Route>

          {/* rutas protegigas */}
            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>} />
              <Route path="perfil" element={<EditarElPerfil/>} />
              <Route path="cambiar-password" element={<CambiarElPassword/>} />
              
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
