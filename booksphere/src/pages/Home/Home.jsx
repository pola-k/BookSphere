import { Link } from "react-router-dom"

export default function Home()
{
    return(
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to= "/list">List</Link>
            </div>
        </>
    )
}