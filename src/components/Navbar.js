import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Disabling/Pausing Queries</Link>
      <Link to="/retries">Retry</Link>
      <Link to="/paginated">Paginated Queries</Link>
      <Link to="/infinite">Infinite Queries</Link>
      <Link to="/placeholder">Placeholder Query Data</Link>
      <Link to="/crud">Mutation</Link>
    </nav>
  );
};

export default Navbar;
