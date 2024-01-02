import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { SearchDriver, refresh } from "../../redux/actions/actions";
import logo from '../../assets/logo.svg'
import "./Nav.css"

export default function Nav() {
    const dispatch = useDispatch()
    const [input,setInput] = useState("");

    
    const handleInput = (event) => {
        setInput(event.target.value)
    }
    
    const handleButton = (event) => {
        event.preventDefault();
        dispatch(SearchDriver(input))
        document.getElementById("search").value = "";
    }

    const Refresh = () => {
        dispatch(refresh())
    }


    return (
        <nav className="nav-cont">
            <ul className="container">
                <li className="li-img">
                    <Link to="/" >
                    <img src={logo} alt="" />
                    </Link>               
                </li>
                <li>
                    <Link onClick={Refresh} to="/home" className="home">Home</Link>
                </li>
                <li>
                    <Link to="/form" className="home">Register Driver</Link>
                </li>
                <li className="li">
                    <section>
                        <form autoComplete="off">
                            <div>
                                <input onChange={handleInput} type="text" id="search" placeholder="Buscar..."/>
                                    <button onClick={handleButton}>Buscar</button>
                            </div>

                        </form>
                    </section>           
                </li>
            </ul>


        </nav>
    )
}