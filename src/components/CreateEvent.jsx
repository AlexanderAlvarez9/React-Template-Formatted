import React, { useState, useEffect } from 'react';
import '../assets/styles/components/CreateEvent.scss';
import { db } from '../firebase';
import { useUser } from 'reactfire';

const CreateEvent = (props) => {

  const user = useUser();

  const fullDate = new Date();
  const timestamp = new Date(Date.now())
  const date = fullDate.getDate() + "-" + fullDate.getMonth() + "-" + fullDate.getFullYear() + "-" + fullDate.getHours() + "-" + fullDate.getMinutes()
  // console.log(date);
  // console.log(timestamp)

  const initialStateValues = {
    eventName: '',
    eventType: '',
    eventSub: '',
    eventDesc: '',
    user: user.uid,
    status: '',
    sla: 1,
    userTec: '',
    notes: '',
    create_at: Math.abs(timestamp),
    update_at: 0,
  };

  const [values, setValues] = useState(initialStateValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditEvent(values);
    setValues({ ...initialStateValues });
  };

  const getEventById = async (id) => {
    const doc = await db.collection("events").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === '') {
      setValues({ ...initialStateValues });
    } else {
      getEventById(props.currentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId])

  return (
    <React.Fragment>
      <form className="CreateEvent" onSubmit={handleSubmit}>
        <h2>CREAR NUEVO EVENTO</h2>
        <div className="inputBox">
        </div>
        <div className="inputBox">
          <label htmlFor="eventName">Nombre del Caso</label>
          <input
            name="eventName"
            type="text"
            placeholder="Que falla presentas?"
            value={values.eventName}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="eventType">Seleccione Tipo de Afectacion</label>
          <select
            name="eventType"
            placeholder="Seleccione tipo de afectacion"
            value={values.eventType}
            onChange={handleInputChange}
          >
            <option defaultValue value="Otro">Otro</option>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Redes">Redes - Networking</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="eventSub">Seleccione Subcategoria</label>
          <select
            name="eventSub"
            placeholder="Seleccione subcategoria"
            value={values.eventSub}
            onChange={handleInputChange}
          >
            <option value="Internet">Internet</option>
            <option value="Telefono">Telefono</option>
            <option value="Servidor">Servidor</option>
            <option value="Wifi">Wifi</option>
            <option value="PC">PC</option>
            <option defaultValue value="Otro">Otro</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="eventDesc">Descripcion</label>
          <textarea
            name="eventDesc"
            type="text"
            placeholder="Ingrese Descripcion"
            value={values.eventDesc}
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

export default CreateEvent;