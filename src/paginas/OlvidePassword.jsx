import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(email === ''){
      setAlerta({msg: 'El email es obligaorio',
       error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email})
      console.log(data)

      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

    const {msg} = alerta
      return (
        <>
        
        <main className='container mx-auto md:grid md:grid-cols-2 mt-12 md:mt-32 gap-12 items-center'>

            <div className="mx-3">
              <h1 className='text-indigo-600 font-black text-6xl text-center'>
                Olvidaste tu <span className='text-black'> Contraseña?</span>
              </h1>
            </div>

          <div className="mx-5 mt-16 shadow-lg py-5 px-10 bg-white rounded-xl">

          { msg &&  <Alerta
            alerta={alerta}
          />} 
            <form
              onSubmit={handleSubmit}
            
            >
              <div>
                <label className="block font-bold uppercase text-gray-600">Email</label>
                <input
                  type="email" 
                  placeholder="Tu Email" 
                  className="p-3 border w-full mt-3 bg-gray-50 rounded-xl" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                 />
              </div>

              

              <input type="submit" value="Enviar Instrucciones" className="py-3 px-10 bg-indigo-700 rounded-xl mt-5 text-white font-bold uppercase w-full md:w-auto hover:cursor-pointer hover:bg-indigo-800" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
              <Link 
                to="/" 
                className="underline hover:text-indigo-800 my-5 mx-5 block text-center text-gray-500">
                Iniciar Sesion
              </Link>

              <Link 
                to="/registrar"
                className="underline hover:text-indigo-800 my-5 mx-5 block text-center text-gray-500">
                Registrar Cuenta
              </Link>
            </nav>
          </div>
        </main>
        </>
      )
    }
    
    export default OlvidePassword