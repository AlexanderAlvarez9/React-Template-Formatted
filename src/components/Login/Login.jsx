import React, { useState } from 'react';
import './Login.scss'
import 'firebase/auth';
import { db } from '../../firebase';
import { useFirebaseApp, useUser } from 'reactfire';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

require('dotenv').config();

const Login = () => {


  const [values, setValues] = useState('')
  const [profile, setProfile] = useState(0);
  const firebase = useFirebaseApp();
  let user = useUser();

  const userValues = {
    name: '',
    username: '',
    phone: '',
    address: '',
    profile: 1,
    password: '',
    sla: 1,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getUsers = async () => {
    await firebase.auth()
  }

  const handleSingUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
          ...userValues, email: cred.user.email
        })
      })
    } catch (error) {
      toast(error.message, {
        type: 'error',
        autoClose: 2000
      });
    }
  }

  const handlelogout = async () => {
    await firebase.auth().signOut();
  }

  const handleSignIn = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        .then(async cred => {
          await db.collection('users').doc(cred.user.uid).get()
            .then(userP => setProfile(userP.data().profile));
        })
    } catch (error) {
      alert(error.message)
    }
  }

  const tests = async () => {
    firebase.auth().currentUser.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "Administrador"
    })
    console.log(profile);

  }

  return (
    <React.Fragment>
      <ToastContainer />

      {
        !user &&
        <div className="Login">
          <h2>Iniciar Sesion</h2>
          <div className="inputBox">

            <label htmlFor="email">Correo</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Ingrese su correo"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Ingrese su Contraseña"
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSignIn}>Iniciar Sesion</button>
          <button onClick={handleSingUp}>Crear Cuenta</button>
        </div>
      }

      {user &&
        <div className="Login">
          <h2>Sesion Activa</h2>
          <p>Correo Usuario: <br /> {user.email}</p>
          <p>Perfil: {user.photoURL}</p>
          <button onClick={handlelogout}>Cerrar Sesion</button>
          {/* <button onClick={tests}>Pruebas</button> */}
        </div>
      }
    </React.Fragment>
  )
}
export default Login;