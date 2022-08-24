import { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'


const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando ] = useState(true)
  const [alerta, setAlerta] = useState({})

    const params = useParams()

    const { id } = params

    useEffect(()=>{
        const confirmrCuenta = async ()=>{
          try {

            const url= `/veterinarios/confirmar/${id}`
            const {data} = await clienteAxios(url)
            
            setCuentaConfirmada(true)
            setAlerta({
              msg: data.msg
            })

          } catch (error) {
            setAlerta({
              msg: error.response.data.msg,
              error: true
            })
          }

          setCargando(false)
        }
        confirmrCuenta()
    }, [])

      return (
        <>
          <main className='container mx-auto md:grid md:grid-cols-2 mt-12 md:mt-32 gap-12 items-center'>

            <div className="mx-3">
              <h1 className='text-indigo-600 font-black text-6xl text-center'>
                Confirma tu Cuenta y Comienza a Administrar <span className='text-black'>Tus Pacientes</span>
              </h1>
            </div>

            <div className="mx-5 mt-16 shadow-lg py-5 px-10 bg-white rounded-xl">
              {!cargando && 
                <Alerta 
                  alerta={alerta}
                />
              }
              
                {cuentaConfirmada && (
                    <Link 
                      to="/" 
                      className="underline hover:text-indigo-800 my-5 mx-5 block text-center text-gray-500">
                      Iniciar Sesion
                    </Link>
                  )
                }

              
            </div>
            
          </main>

        </>
      )
    }
    
    export default ConfirmarCuenta