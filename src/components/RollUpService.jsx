import React, { useEffect, useState } from 'react';
import '../assets/styles/components/RollUpService.scss';
import { db } from '../firebase';

const RollUpService = (props) => {

  const initialStateValues = {
    serviceName: '',
    serviceType: '',
    serviceSla: '',
    serviceDesc: '',
  };

  const [values, setValues] = useState(initialStateValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditService(values);
    setValues({ ...initialStateValues });
  };

  const getServiceById = async (id) => {
    const doc = await db.collection("services").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === '') {
      setValues({ ...initialStateValues });
    } else {
      getServiceById(props.currentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId])

  return (
    <React.Fragment>
      <form className="RollUpService" onSubmit={handleSubmit}>
        <h2>Nuevo Servicio</h2>
        <div className="inputBox">
          <label htmlFor="serviceName">Nombre del Servicio</label>
          <input
            name="serviceName"
            type="text"
            placeholder="Ingrese Nombre del Servicio"
            value={values.serviceName}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="serviceType">Tipo del Servicio</label>
          <select
            name="serviceType"
            placeholder="Seleccione tipo del servicio"
            value={values.serviceType}
            onChange={handleInputChange}
          >
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Redes">Redes - Networking</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="serviceSla">SLA del Servicio</label>
          <select
            name="serviceSla"
            placeholder="Seleccione SLA del servicio"
            value={values.serviceSla}
            onChange={handleInputChange}
          >
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="serviceDesc">Descripcion</label>
          <textarea
            name="serviceDesc"
            type="text"
            placeholder="Ingrese Descripcion"
            value={values.serviceDesc}
            onChange={handleInputChange}
          />
        </div>
        <button>
          {props.currentId === '' ? 'Registrar' : 'Actualizar'}
        </button>
      </form>
    </React.Fragment>
  )
}
export default RollUpService;