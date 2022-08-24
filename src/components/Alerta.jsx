
const Alerta = ({alerta}) => {
  return (
      <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r p-3 text-center uppercase font-bold text-white text-sm rounded-xl my-5`}>
            {alerta.msg}
      </div>
  )
}

export default Alerta