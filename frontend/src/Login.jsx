export default function Login() {
  return(
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
      <h1 className='text-5xl font-semibold'>Bienvenido a Conectando Capacidades</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>Por favor ingresate</p>
      <div className='mt-8'>
        <div>
          <label className='text-lg font-medium'>Correo</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                  placeholder='Ingresa tu correo'
          />
        </div>
        <div>
          <label className='text-lg font-medium'>Contraseña</label>
          <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                  placeholder='Ingresa tu contraseña'
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id='remember'/>
            <label htmlFor="remember" className="ml-2 font-medium text-base">Recuerdame</label>
          </div>
          <button className="font-medium text-base text-violet-500">¿Olvidaste Contraseña?</button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold">
            Ingresar
          </button>
          <button className="flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
          Ingresar con Google
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">¿No tienes cuenta?</p>
          <button className="text-violet-500 text-base font-medium ml-2">Registrarse</button>
        </div>
      </div>
    </div>
  )
}