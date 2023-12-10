import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light">
      <div className="container-fluid">
        <h4 className="ms-5">Calorie tracker</h4>
        <NavLink to="/" className="nav-link me-5">Home</NavLink>
      </div>
    </nav>
  );
};

export default Toolbar;