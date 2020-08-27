import React, { useState, useEffect } from 'react';
import '../assets/styles/components/RollUpTechnician.scss';
import { db } from '../firebase';

const RollUpTechnician = (props) => {

  const initialStateValues = {
    name: '',
    username: '',
    phone: 0,
    profile: 'Tecnico',
    status: 0,
    password: '',
  };

  const [values, setValues] = useState(initialStateValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditTechnician(values);
    setValues({ ...initialStateValues });
  };

  const getTechnicianById = async (id) => {
    const doc = await db.collection("technicians").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === '') {
      setValues({ ...initialStateValues });
    } else {
      getTechnicianById(props.currentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId])

  return (
    <React.Fragment>
      <form className="RollUpTechnician" onSubmit={handleSubmit}>
        <h2>Crear Tecnico</h2>
        <div className="inputBox">
          <label htmlFor="name">Nombre</label>
          <input
            name="name"
            type="text"
            placeholder="Ingrese Nombre"
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="username">Usuario</label>
          <input
            name="username"
            type="text"
            placeholder="Ingrese Usuario"
            value={values.username}
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
            <option value="0">Inactivo</option>
            <option value="1">Activo</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="phone">Telefono</label>
          <input
            name="phone"
            type="text"
            placeholder="Ingrese Telefono"
            value={values.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="password">Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="Ingrese Contraseña"
            value={values.password}
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

export default RollUpTechnician;