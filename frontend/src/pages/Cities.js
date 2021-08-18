import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import CityCard from "../components/Cities/CityCard";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Hero/Loader";

const Cities = (props) => {
  const [cities, setCities] = useState([]);
  const [imput, setImput] = useState("");
  const [reload, setReload] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/cities")
      .then((res) => {
        if (res.data.success) {
          setCities(res.data.response);
          setReload(!reload);
        } else {
          throw new Error(res.data.response);
        }
      })
      .catch((err) => {
        toast.error(
          err.message.includes("error") ? err.message : "Failed to fetch",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
        console.error(err.message);
        props.history.push("/error");
      });
    // eslint-disable-next-line
  }, []);

  const inputHandler = (e) => {
    setImput(e.target.value.trim().toLowerCase());
  };

  const filter = () => {
    return cities.filter((city) => city.city.toLowerCase().startsWith(imput));
  };

  if (reload)
    return (
      <div className="cities bg-dark text-light fs-1">
        <Loader />
      </div>
    );
  // window.scrollTo(0, 0);
  return (
    <div className="contenedorCities">
      <div className="cities">
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
        <ToastContainer />
        <Banner
          img="https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-10019278401.jpg"
          text=""
          light={false}
        />

        <label htmlFor="filter">Find what you're looking for</label>
        <input
          style={{
            backgroundImage: "url(/assets/search.jpg)",
          }}
          id="filter"
          className="input mb-5"
          type="text"
          name="cities"
          placeholder="Search by cities"
          onChange={inputHandler}
        />
        {filter().length === 0 && (
          <div>
            {/* <h2 className="filter">NO RESULTS FOR YOUR SEARCH</h2>
             */}
            <img
              src="/assets/oops.png"
              alt="oops not found"
              style={{ width: "20vw", marginTop: "5vh" }}
            />
          </div>
        )}
        <div className="grid">
          <CityCard cities={filter()} all={cities} />
        </div>
        <button type="button" className="px-4 gap-3 mt-5 go">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <span className="link">Back to Home</span>
          </Link>
        </button>
      </div>
    </div>
  );
};
export default Cities;
