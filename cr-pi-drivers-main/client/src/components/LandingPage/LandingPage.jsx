import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div>
            Landing Page
            <Link to="/home"><button>Entrar</button></Link>
        </div>
    )
}