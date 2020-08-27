import React, { useState, useEffect } from 'react';
import RollUpService from '../RollUpService';
import './Services.scss'
import { db } from '../../firebase';
import { toast } from 'react-toastify';

const Services = () => {

  const [services, setServices] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditService = async (service) => {
    try {
      if (currentId === '') {
        await db.collection('services').doc().set(service)
        toast('Nuevo Servicio agregado', {
          type: 'success',
          autoClose: 2000
        });
      } else {
        await db.collection('services').doc(currentId).update(service)
        toast('Servicio Actualizado', {
          type: 'info',
          autoClose: 2000
        });
      }
      setCurrentId('')
    } catch (error) {
      console.error(error);
    }
    console.log(service);
  }

  const handleDelete = async (id) => {
    if (window.confirm('Esta seguro?')) {
      toast('Servicio Borrado', {
        type: 'error',
        autoClose: 2000
      });
      await db.collection('services').doc(id).delete();
    }
  }

  const getServices = () => {
    db.collection('services').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(item => {
        docs.push({ ...item.data(), id: item.id })
      })
      setServices(docs);
    });
  }

  useEffect(() => {
    getServices()
  }, []);

  return (
    <React.Fragment>
      <RollUpService {...{ addOrEditService, currentId, services }} />

      <div className="Services">
        <h2>Mis Casos Creados</h2>

        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Servicio</th>
              <th>Tipo Servicio</th>
              <th>SLA del Servicio</th>
              <th>Descripcion</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <th>{service.id.slice(-4)}</th>
                <th>{service.serviceName}</th>
                <td>{service.serviceType}</td>
                <td>{service.serviceSla}</td>
                <td>{service.serviceDesc}</td>
                <th><i className="material-icons text-danger" onClick={() => {
                  setCurrentId(service.id)
                }}>create</i></th>
                <th><i className="material-icons text-danger" onClick={() => {
                  handleDelete(service.id)
                }}>close</i></th>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </React.Fragment>
  )
}
export default Services;