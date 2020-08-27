import React, { useState, useEffect } from 'react';
import RollUpTechnician from '../RollUpTechnician';
import './Technicians.scss'
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const Technicians = () => {

  const [technicians, setTechnicians] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditTechnician = async (technician) => {
    try {
      if (currentId === '') {
        await db.collection('technicians').doc().set(technician)
        toast('Nuevo objeto agregado', {
          type: 'success',
          autoClose: 2000
        });
      } else {
        await db.collection('technicians').doc(currentId).update(technician)
        toast('Objeto actualizado', {
          type: 'info',
          autoClose: 2000
        });
      }
      setCurrentId('')
    } catch (error) {
      console.error(error);
    }
    console.log(technician);
  }

  const handleDelete = async (id) => {
    if (window.confirm('Esta seguro?')) {
      toast('Objeto Borrado', {
        type: 'error',
        autoClose: 2000
      });
      await db.collection('technicians').doc(id).delete();
    }
  }

  const getTechnicians = () => {
    db.collection('technicians').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(item => {
        docs.push({ ...item.data(), id: item.id })
      })
      setTechnicians(docs);
    });
  }

  useEffect(() => {
    getTechnicians()
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <RollUpTechnician {...{ addOrEditTechnician, currentId, technicians }} />

      <div className="Technicians">
        <h2>Listado Tecnicos</h2>

        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Perfil</th>
              <th>Telefono</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => (
              <tr key={technician.id}>
                <th>{technician.id.slice(-4)}</th>
                <th>{technician.name}</th>
                <td>{technician.username}</td>
                <td>
                  {technician.status == 0 &&
                    <p>Inactivo</p>
                  }
                  {technician.status == 1 &&
                    <p>Activo</p>
                  }
                </td>
                <td>{technician.profile}</td>
                <td>{technician.phone}</td>
                <th><i className="material-icons text-danger" onClick={() => {
                  setCurrentId(technician.id)
                }}>create</i></th>
                <th><i className="material-icons text-danger" onClick={() => {
                  handleDelete(technician.id)
                }}>close</i></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}
export default Technicians;