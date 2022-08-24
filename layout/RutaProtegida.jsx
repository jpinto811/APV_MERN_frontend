import { Outlet, Navigate } from "react-router-dom";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

import useAuth from "../src/hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "cargando...";
  return (
    <>

      <Header/>
        {auth?._id ? (
          <main className="container mx-auto mt-10">
            <Outlet />
          </main>
        ): <Navigate to="/" />}
      <Footer/>
  
    </>);
};

export default RutaProtegida;
