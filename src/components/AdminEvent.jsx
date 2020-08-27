import React, { useState, useEffect } from 'react';
import '../assets/styles/components/CreateEvent.scss';
import { db } from '../firebase';
import { useUser } from 'reactfire';
import { sub, format, toDate, differenceInHours } from 'date-fns'

const CreateEvent = (props) => {

  const user = useUser();

  const fullDate = new Date();
  const timestamp = new Date(Date.now())

  const initialStateValues = {
    user: '',
    eventName: '',
    eventType: '',
    eventSub: '',
    eventDesc: '',
    user: user.uid,
    status: '',
    sla: '',
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
        <h2>Administrar Eventos</h2>
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
          <label htmlFor="user">Usuario</label>
          <input
            name="user"
            type="text"
            placeholder="Usuario Creador"
            value={values.user}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="status">Estado</label>
          <select
            name="status"
            placeholder="Seleccione tipo de afectacion"
            value={values.status}
            onChange={handleInputChange}
          >
            <option value="a">Seleccione...</option>
            <option value="0">Creado</option>
            <option value="1">En Curso</option>
            <option value="2">Finalizado</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="userTec">Tecnico</label>
          <select
            name="userTec"
            placeholder="Seleccione tipo de afectacion"
            value={values.userTec}
            onChange={handleInputChange}
          >
            <option value="a">Seleccione...</option>
            <option value="0">T1</option>
            <option value="1">T2</option>
            <option value="2">T3</option>
          </select>
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
            <option defaultValue value="Otro">Otro</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="sla">SLA</label>
          <select
            name="sla"
            placeholder="Seleccione subcategoria"
            value={values.sla}
            onChange={handleInputChange}
          >
            <option value="a">Nulo</option>
            <option value="0">Bajo</option>
            <option value="1">Medio</option>
            <option value="2">Alto</option>
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
        <div className="inputBox">
          <label htmlFor="notes">Notas</label>
          <textarea
            name="notes"
            type="text"
            placeholder="Ingrese Descripcion"
            value={values.notes}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="create_at">Transcurrido</label>
          <p>
            {!values.create_at && !timestamp ? <p>Sin fecha</p>
              : `${differenceInHours(timestamp, toDate(values.create_at))} Horas `

            }
          </p>
        </div>
        <div className="inputBox">
          <label htmlFor="create_at">Creado</label>
          <p>
            {format(values.create_at, 'dd/MMM/yy H:m')}
          </p>
        </div>
        <div className="inputBox">
          <label htmlFor="update_at">Ultima Modificacion</label>
          <p>
            {!values.update_at ? 0 : format(values.update_at, 'dd/MMM/yy H:m')}
          </p>
        </div>
        <button>
          {props.currentId === '' ? 'Registrar' : 'Actualizar'}
        </button>
      </form>
    </React.Fragment>
  )
}

export default CreateEvent;