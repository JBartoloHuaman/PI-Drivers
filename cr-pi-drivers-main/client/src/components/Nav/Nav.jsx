import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { SearchDriver, refresh } from "../../redux/actions/actions";
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
    }

    const Refresh = () => {
        dispatch(refresh())
    }


    return (
        <nav className="nav-cont">
            <ul className="container">
                <li className="li-img">
                    <img src="http://127.0.0.1:5500/cr-pi-drivers-main/client/src/img/F1.svg" alt="" />
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
                                <input onChange={handleInput} type="text" name="q" placeholder="Buscar..."/>
                                    <button onClick={handleButton}>Buscar</button>
                            </div>

                        </form>
                    </section>           
                </li>
            </ul>


        </nav>
    )
}