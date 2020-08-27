import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';
import { useUser } from 'reactfire'
import { useFirebaseApp } from 'reactfire';
import logo from '../../assets/imgs/logo.png';
import { db } from '../../firebase';
import { UserContexts } from '../../utils/UserContexts';

const Menu = () => {

  const user = useUser();
  const firebase = useFirebaseApp();
  // const { profile } = useContext(UserContexts)
  const [admin, setAdmin] = useState(false)
  const adminsArray = [];

  const handlelogout = async () => {
    await firebase.auth().signOut();
  }

  console.log(admin);

  useEffect(() => {
    const getAdmins = async () => {
      await db.collection('users').where('profile', '==', '3').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            adminsArray.push(doc.id)
            setAdmin(adminsArray.includes(user.uid));
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
    getAdmins()
  }, [user])

  return (
    <>
      <nav className="Menu">
        <ol className="Menu--name">
          <img className="Menu--name__logo" src={logo} alt="" />
          <Link className="Menu--name__title" to="/">Suppourtil</Link>
        </ol>

        {/* no logged */}
        {!user &&
          <ol className="Menu--items">
            <li><Link to="/login">Inicia Sesion</Link></li>
          </ol>
        }
        {/* Admin menu */}
        {admin && user &&
          <React.Fragment>
            <ol className="Menu--items">
              <li><Link to="/users">Usuarios</Link></li>
              <li><Link to="/technicians">Tecnicos</Link></li>
              {/* <li><Link to="/new-issue">Crear Evento</Link></li> */}
              <li><Link to="/events">Casos</Link></li>
            </ol>
          </React.Fragment>
        }
        {/* User menu */}
        {!admin && user &&
          <React.Fragment>
            <ol className="Menu--items">
              <li><Link to="/new-issue">Reportar</Link></li>
            </ol>
            {/* <ol className="Menu--close-sesion">
              <span><li onClick={handlelogout}>Cerrar Sesion</li></span>
            </ol> */}
          </React.Fragment>
        }
      </nav>
    </>
  )
}

export default Menu;