import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [alerta, setAlerta ] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [ passwordModificado, setPasswordModificado ] = useState(false)


  const params = useParams()
  const { token } = params


  useEffect(()=>{
    const comprobarToken = async ()=>{
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo password'
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }

    comprobarToken()
  }, [])

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(password.length < 6){
      setAlerta({ msg: 'el password es muy corto, minimo 6 caracteres',
       error: true })
      return
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})

      setAlerta({
        msg: data.msg
      })

      setPasswordModificado(true)
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
          Restablece tu <span className='text-black'> Contraseña</span>
        </h1>
      </div>

      <div className="mx-5 mt-16 shadow-lg py-5 px-10 bg-white rounded-xl">
      { msg &&  <Alerta
            alerta={alerta}
          />}

      {tokenValido && (

        <>
          <form onSubmit={handleSubmit}>

          
          <div>
            <label
              className="block font-bold uppercase text-gray-600 mt-4">
              Nuevo Password
            </label>

            <input 
              type="password"
              placeholder="Password" 
              className="p-3 border w-full mt-3 bg-gray-50 rounded-xl" 
              value={password}
              onChange={ e => setPassword(e.target.value)}
            />
          </div>

          <input 
              type="submit"
              value="Guardar Password" 
              className="py-3 px-10 bg-indigo-700 rounded-xl mt-5 text-white font-bold uppercase w-full md:w-auto hover:cursor-pointer hover:bg-indigo-800"
              
            /> 
          </form>
          
        </>
      )}
        {passwordModificado &&
          <Link 
          to="/" 
          className="underline hover:text-indigo-800 my-5 mx-5 block text-center text-gray-500">
          Iniciar Sesion
          </Link>
        }
      </div>      
      </main>
    </>
  )
}

export default NuevoPassword