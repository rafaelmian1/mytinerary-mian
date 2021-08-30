import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Hero/Loader";
import usersActions from "../redux/actions/usersActions";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    img: "",
    country: "",
    google: false,
  });
  const onBlurHandler = (e) => {
    // props.signUp(user);
  };
  useEffect(() => {
    props.getCountries();
    // eslint-disable-next-line
  }, []);

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const responseGoogle = async (response) => {
    console.log(response.profileObj.googleId);
    let googleUser = {
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      img: response.profileObj.imageUrl,
      country: "Argentina",
      google: true,
    };
    await props.signUp(googleUser);
  };

  if (props.user) {
    return (
      <div className="cities bg-dark text-light fs-1">
        <Loader />
      </div>
    );
  }
  return (
    <div className="contenedorCities min-vh-100">
      <div className="container d-flex flex-column cities">
        <h1 className="pop">Create an account</h1>
        <h3 className="fs-2 mb-4 pop">
          Please, complete the fields to sign up
        </h3>
        <input
          onBlur={onBlurHandler}
          className="input mb-2"
          type="text"
          name="first_name"
          placeholder="First Name"
          autoComplete="false"
          value={user.first_name}
          onChange={handleInput}
        />
        <input
          onBlur={onBlurHandler}
          className="input mb-2"
          type="text"
          name="last_name"
          placeholder="Last Name"
          autoComplete="false"
          value={user.last_name}
          onChange={handleInput}
        />
        <input
          onBlur={onBlurHandler}
          className="input mb-2"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="false"
          value={user.email}
          onChange={handleInput}
        />
        <input
          onBlur={onBlurHandler}
          className="input mb-2"
          type="password"
          name="password"
          placeholder="Password (8 characters or more)"
          autoComplete="false"
          value={user.password}
          onChange={handleInput}
        />
        <input
          onBlur={onBlurHandler}
          className="input mb-2"
          type="text"
          name="img"
          placeholder="Profile picture URL"
          autoComplete="false"
          value={user.img}
          onChange={handleInput}
        />
        <select
          onBlur={onBlurHandler}
          className="input"
          name="country"
          id="countrySelect"
          value={user.country}
          onChange={handleInput}
        >
          <option value="choose" defaultChecked>
            Choose your country
          </option>
          {props.countries.map((country, index) => (
            <option className="text-center" key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="px-4 gap-3 error"
          onClick={() => props.signUp(user)}
        >
          <span className="but">Sign me up</span>
        </button>
        <p className="my-4">or</p>
        <GoogleLogin
          clientId="68870784500-lgkji922jlfn0n3rjvfjfo0lu51jbbq5.apps.googleusercontent.com"
          buttonText="Sign up with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <h4 className="mt-4">
          Already have an account?
          <Link to="/login">
            <span> Log in here!</span>
          </Link>
        </h4>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.users.countries,
    user: state.users.user,
  };
};

const mapDispatchToProps = {
  getCountries: usersActions.getCountries,
  signUp: usersActions.signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
