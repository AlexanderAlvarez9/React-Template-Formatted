import React, { useState, useEffect } from 'react';
import './RollUpUser.scss';
import { db } from '../../firebase';

const RollUpUser = (props) => {

  const initialStateValues = {
    name: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    profile: '',
    password: '',
    status: ''
  };

  const [values, setValues] = useState(initialStateValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditUser(values);
    setValues({ ...initialStateValues });
  };

  const getUserById = async (id) => {
    const doc = await db.collection("users").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === '') {
      setValues({ ...initialStateValues });
    } else {
      getUserById(props.currentId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId])

  return (
    <React.Fragment>
      <form className="RollUpUser" onSubmit={handleSubmit}>
        <h2>Crear Usuario</h2>
        <div className="inputBox">
        </div>
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
          <label htmlFor="email">Correo</label>
          <input
            name="email"
            type="email"
            placeholder="Ingrese Correo"
            value={values.email}
            onChange={handleInputChange}
          />
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
          <label htmlFor="address">Direccion</label>
          <input
            name="address"
            type="text"
            placeholder="Ingrese Direccion"
            value={values.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="inputBox">
          <label htmlFor="sla">SLA</label>
          <select
            name="sla"
            placeholder="Ingrese SLA"
            value={values.sla}
            onChange={handleInputChange}>
            <option value=""></option>
            <option value="1">Bajo</option>
            <option value="2">Medio</option>
            <option value="3">Alto</option>
          </select>
        </div>
        <div className="inputBox">
          <label htmlFor="profile">Perfil</label>
          <select
            name="profile"
            value={values.profile}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="1">Usuario</option>
            <option value="2">Tecnico</option>
            <option value="3">Administrador</option>
          </select>
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

export default RollUpUser;