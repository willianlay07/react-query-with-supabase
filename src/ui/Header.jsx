import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul
        style={{ listStyleType: "none", paddingLeft: "0px", display: "flex" }}
      >
        <li style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <NavLink to="/about">About</NavLink>
        </li>
        <li style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <NavLink to="/persons">Persons</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
