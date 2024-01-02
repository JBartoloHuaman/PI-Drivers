import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { cleanDriverDetail, getDriverById } from '../../redux/actions/actions';
import "./details.css"

function Details() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const driverDetail = useSelector(state => state.driverDetail)

  useEffect(() => {
    dispatch(getDriverById(id))
    return () => dispatch(cleanDriverDetail())
  }, [id])

  return (
    <div className='detail-cont'>
      <div className='detail-driver'>
        <h2>ID: {driverDetail?.id}</h2>
        <h2>NAME: {driverDetail?.name}</h2>
        <h3>LASTNAME: {driverDetail?.lastname}</h3>
        <h3>NATIONALITY: {driverDetail?.nacionality}</h3>
        <h3>BIRTHDATE: {driverDetail?.birthdate}</h3>
        <h3>DESCRIPTION: {driverDetail?.description}</h3>
        <h3>TEAMS: {driverDetail?.Teams?.join(", ")}</h3>
      </div>
      <div>
        <img className='detail-img' src={driverDetail?.image} alt={driverDetail?.name} />
      </div>
    </div>
  )
}

export default Details