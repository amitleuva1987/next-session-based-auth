import useAuth from '../library/useAuth.js'
import Link from 'next/link';

function Navbar(){
    const { logout } = useAuth()
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <a className="navbar-brand">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link href="/" class="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
                <Link href="/users" class="nav-link active" aria-current="page">Users</Link>
            </li>
            <li className="nav-item">
                <Link href="/login" class="nav-link active" aria-current="page">Login</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link active" onClick={logout}>Logout</a>
            </li>
            </ul>    
            </div>
        </nav>
    );
}

export default Navbar;