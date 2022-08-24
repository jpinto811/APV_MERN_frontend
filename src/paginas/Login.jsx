import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <main className='container mx-auto md:grid md:grid-cols-2 mt-12 md:mt-32 gap-12 items-center'>

        <div className="mx-3">
          <h1 className='text-indigo-600 font-black text-6xl text-center'>
            Inicia Sesion y Administra tus <span className='text-black'>Pacientes</span>
          </h1>
        </div>

        <div className="mx-5 mt-16 shadow-lg py-5 px-10 bg-white rounded-xl">

          { msg &&
          <Alerta 
              alerta={alerta}
            /> }
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block font-bold uppercase text-gray-600">Email</label>
              <input 
                type="email" 
                placeholder="Email de Registro"
                className="p-3 border w-full mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange= {e=> setEmail(e.target.value)}
               />
            </div>

            <div>
              <label className="block font-bold uppercase text-gray-600 mt-4">Contraseña</label>
              <input 
                type="password" 
                placeholder="Contraseña" 
                className="p-3 border w-full mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange= {e=> setPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Iniciar Sesion" className="py-3 px-10 bg-indigo-700 rounded-xl mt-5 text-white font-bold uppercase w-full md:w-auto hover:cursor-pointer hover:bg-indigo-800" />
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
              to="/registrar" 
              className="underline hover:text-indigo-800 my-5 mx-5 block text-center text-gray-500">
              Registrar Cuenta
            </Link>

            <Link 
              to="/olvide-password"
              className="underline hover:text-indigo-800 my-5 mx-5 block text-center text-gray-500">
              Olvide mi Password
            </Link>
          </nav>
        </div>
      </main>
        
    </>
  )
}

export default Login