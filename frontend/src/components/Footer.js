import { Link, NavLink } from "react-router-dom";
import "../styles/footer.css";
import Redes from "./Footer/Redes";

const Footer = () => {
  return (
    <footer className="w-100 d-flex flex-column justify-content-between">
      <div className="w-100 p-3 d-flex align-items-center justify-content-between">
        <Link to="/">
          <h1 className="pop">
            my<span className="tinerary">tinerary</span>
          </h1>
        </Link>
        <div className="d-flex align-items-center">
          <NavLink className="mx-2 mx-sm-4" exact to="/">
            <span>HOME</span>
          </NavLink>
          <NavLink
            className="mx-2 mx-sm-4"
            to="/cities"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span>CITIES</span>
          </NavLink>
        </div>
      </div>
      <div className="w-100 text-center d-flex justify-content-center align-items-center pb-2">
        <span className="redes fs-5">&copy; MyTinerary Project 2021</span>
        <Redes />
      </div>
    </footer>
  );
};

export default Footer;
