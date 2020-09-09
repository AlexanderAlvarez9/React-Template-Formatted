import React, { useState, useEffect } from 'react';
import RollUpUser from './RollUpUser';
import './Users.scss'
import { db } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const addOrEditUser = async (user) => {
    try {
      if (currentId === '') {
        await db.collection('users').doc().set(user)
        toast('Nuevo objeto agregado', {
          type: 'success',
          autoClose: 2000
        });
      } else {
        await db.collection('users').doc(currentId).update(user)
        toast('Usuario actualizado', {
          type: 'info',
          autoClose: 2000
        });
      }
      setCurrentId('')
    } catch (error) {
      console.error(error);
    }
    console.log(user);
  }

  const handleDelete = async (id) => {
    if (window.confirm('Esta seguro?')) {
      toast('Usuario Borrado', {
        type: 'error',
        autoClose: 2000
      });
      await db.collection('users').doc(id).delete();
    }
  }

  const getUsers = () => {
    db.collection('users').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(item => {
        docs.push({ ...item.data(), id: item.id })
      })
      setUsers(docs);
    });
  }

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="Users">
      <ToastContainer />
      <RollUpUser {...{ addOrEditUser, currentId, users }} />

      <div className="User">
        <h2>Lista de Usuarios</h2>

        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Direccion</th>
              <th>SLA</th>
              <th>Perfil</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <th>{user.id.slice(-4)}</th>
                <th>{user.name}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.sla}</td>
                <td>
                  {user.profile == 1 &&
                    <p>Usuario</p>
                  }
                  {user.profile == 2 &&
                    <p>Tecnico</p>
                  }
                  {user.profile == 3 &&
                    <p>Administrador</p>
                  }
                </td>
                <th><i className="material-icons text-danger" onClick={() => {
                  setCurrentId(user.id)
                }}>create</i></th>
                <th><i className="material-icons text-danger" onClick={() => {
                  handleDelete(user.id)
                }}>close</i></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Users;