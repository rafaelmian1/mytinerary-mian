const citiesReducer = (state = { cities: [], filteredCities: [] }, action) => {
  switch (action.type) {
    case "GET_CITIES":
      return {
        ...state,
        cities: action.payload,
        filteredCities: action.payload,
      };
    case "FILTER_CITIES":
      return {
        ...state,
        filteredCities: state.cities.filter((city) =>
          city.city.toLowerCase().startsWith(action.payload)
        ),
      };
    default:
      return state;
  }
};

export default citiesReducer;

// axios
//       .get("http://localhost:4000/api/cities")
//       .then((res) => {
//         if (res.data.success) {
//           setCities(res.data.response);
//           setReload(!reload);
//         } else {
//           throw new Error(res.data.response);
//         }
//       })
//       .catch((err) => {
//         toast.error(
//           err.message.includes("error") ? err.message : "Failed to fetch",
//           {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: true,
//             progress: undefined,
//           }
//         );
//         console.error(err.message);
//         props.history.push("/error");
//       });