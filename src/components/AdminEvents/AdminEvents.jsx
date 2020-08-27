import React, { useState, useEffect } from 'react';
import AdminEvent from '../AdminEvent';
import './AdminEvents.scss';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { sub, format } from 'date-fns';

const AdminEvents = () => {

  const [events, setEvents] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const dateNow = new Date(Date.now());
  const timestamp = new Date(Date.now());

  // console.log(dateNow);

  const addOrEditEvent = async (event) => {
    try {
      if (currentId === '') {
        await db.collection('events').doc().set(event);
        toast('Nuevo Evento Agregado', {
          type: 'success',
          autoClose: 2000,
        });
      } else {
        event = { ...event, update_at: Math.abs(timestamp) };
        await db.collection('events').doc(currentId).update(event);
        toast('Evento Actualizado', {
          type: 'info',
          autoClose: 2000,
        });
      }
      setCurrentId('');
    } catch (error) {
      console.error(error);
    }
    console.log(event);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Esta seguro?')) {
      toast('Evento Borrado', {
        type: 'error',
        autoClose: 2000,
      });
      await db.collection('events').doc(id).delete();
    }
  };

  const getEvents = () => {
    db.collection('events').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((item) => {
        docs.push({ ...item.data(), id: item.id });
      });
      setEvents(docs);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <AdminEvent {...{ addOrEditEvent, currentId, events }} />

      <div className='Events'>
        <h2>Total Casos</h2>

        <table border='1'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Caso</th>
              {/* <th>Categoria</th> */}
              <th>SubCategoria</th>
              <th>Descripcion</th>
              <th>Creado</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <th>{event.id.slice(-4)}</th>
                <td>{event.user.slice(-4)}</td>
                <th>{event.eventName}</th>
                {/* <td>{event.eventType}</td> */}
                <td>{event.eventSub}</td>
                <td>{event.eventDesc}</td>
                <td>{format(event.create_at, 'dd/MMM/yy H:m')}</td>
                <td>
                  {event.status == 0 &&
                    <p>Pendiente</p>}
                  {event.status == 1 &&
                    <p>En Curso</p>}
                  {event.status == 2 &&
                    <p>Finalizado</p>}
                </td>
                {/* <td>{console.log(dateNow, 'hola')}</td> */}
                <th>
                  <i
                    className='material-icons text-danger'
                    onClick={() => {
                      setCurrentId(event.id);
                    }}
                  >
                    create
                  </i>
                </th>
                <th>
                  <i
                    className='material-icons text-danger'
                    onClick={() => {
                      handleDelete(event.id);
                    }}
                  >
                    close
                  </i>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
};
export default AdminEvents;
