import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getDriverById } from '../../redux/actions/actions';

function Details() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { driverDetail } = useSelector(state => state)
  useEffect(() => {
    console.log(driverDetail);
    dispatch(getDriverById(id))
    return 
  },[id])

  return (
    <div>
      <img style={{width:"300px"}} src={driverDetail.image} alt={driverDetail.name} />
      <h2>ID: {driverDetail?.id}</h2>
      <h2>NAME: {driverDetail?.name}</h2>
      <h3>LASTNAME: {driverDetail?.lastname}</h3>
      <h3>NATIONALITY: {driverDetail?.nacionality}</h3>
      <h3>BIRTHDATE: {driverDetail?.birthdate}</h3>
      <h3>DESCRIPTION: {driverDetail?.description}</h3>
      <h3>TEAMS: {driverDetail?.Teams}</h3>
    </div>
//     ID.
// Nombre.
// Apellido.
// Nacionalidad.
// Imagen.
// Descripción.
// Fecha de Nacimiento.
// Escuderías.
  )
}

export default Details