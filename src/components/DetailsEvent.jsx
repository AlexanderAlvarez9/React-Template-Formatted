import React from 'react';
import '../assets/styles/components/DetailsEvent.scss'

const DetailsEvent = () => {
  const categories = [];

  return (
    <React.Fragment>
      <div className="DetailsEvent">
        <h2>DETALLE DEL EVENTO # 12345</h2>

        <p><b>ID del Caso:</b> <span>12345</span> <span><b>Tiempo Restante:</b> <span>7 Horas 15 Minutos</span></span></p>

        <p><b>Usuario:</b> <span>Carlos</span> <span><b>Direccion:</b> <span>Oficina 5, Piso 4</span></span></p>
        <p><b>Tipo:</b> <span>Incidente</span></p>
        <p> <b>Categoria:</b> <span>Software</span> <span><b>SubCategoria:</b> <span>Email</span></span></p>

        <p><b>Descripcion:</b> <span>Presento un problema con mi correo</span></p>

        <label htmlFor="serviceType">Reasignar Caso</label>
        <select name="serviceType" placeholder="Seleccione tipo del servicio" >
          <option value="1">Equipo Software</option>
          <option value="2">Equipo Hardware</option>
          <option value="3">Equipo Redes</option>
        </select>

        <label htmlFor="serviceType">Recategorizar</label>
        <select name="serviceType" placeholder="Seleccione tipo del servicio" >
          <option value="1">Hardware</option>
          <option value="2">Software</option>
          <option value="3">Redes - Networking</option>
        </select>

        <label htmlFor="serviceDesc">Notas</label>
        <textarea name="serviceDesc" type="text" placeholder="Ingrese Descripcion" />
        <button>Registrar</button>
      </div>
    </React.Fragment>
  )
}
export default DetailsEvent;