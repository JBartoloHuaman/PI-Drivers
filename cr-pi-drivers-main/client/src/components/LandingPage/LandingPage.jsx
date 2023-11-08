import { Link } from "react-router-dom"
import "./landingpage.css"
export default function LandingPage() {
    return (
        <div className="landing-cont">
            <div className="title-cont">
            <h1 className="title">WELCOME</h1>
            <Link to="/home"><button>Entrar</button></Link>
            </div>
        </div>
    )
}