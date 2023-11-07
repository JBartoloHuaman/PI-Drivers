import { Link, NavLink } from "react-router-dom"
import "./card.css"

function Card({id,image,name,Teams}) {
    return (
      <div className="card-cont">
        <NavLink className="card-button" to={`/detail/${id}`}>
        <h2 >Name: {name}</h2>
        <img className="card-img" src={image} alt={name} />
        </NavLink>
        <h3>Escuderías: {Teams}</h3>
      </div>
    )
  }
  export default Card