import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setFlightDetails } from "../../store/flightSlice";
import "./styles/flightForm.css";

const FlightForm = ({ handleNavigate }) => {
    const s = useSelector((state) => state.flight);
    const dispatch = useDispatch();
    const [search, setSearch] = useState({
        from: "",
        to: "",
        depart: null,
        return: null,
    });
    useEffect(() => {
        setSearch(s);
    }, [])
    console.log(search);
    const locations = ["New York", "London", "Dubai", "Paris", "Tokyo", "Sydney"];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search)
        dispatch(setFlightDetails(search)); // Save search details to Redux
        handleNavigate();
    };

    return (
        <form onSubmit={(e) => handleSearch(e)} className="flight-search">
            <div className="form-group">
                <label>From</label>
                <select
                    required
                    className="form-control"
                    value={search.from}
                    onChange={(e) => setSearch({ ...search, from: e.target.value })}
                >
                    <option value="">Select Departure</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>To</label>
                <select
                    required
                    className="form-control"
                    value={search.to}
                    onChange={(e) => setSearch({ ...search, to: e.target.value })}
                >
                    <option value="">Select Destination</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Departure</label>
                <DatePicker
                    selected={search.depart ? new Date(search.depart.split("-").reverse().join("-")) : null}
                    onChange={(date) =>
                        setSearch((prev) => ({ ...prev, depart: format(date, "dd-MM-yyyy") }))
                    }
                    minDate={new Date()}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="Select departure date"
                    required
                />
            </div>

            <div className="form-group">
                <label>Return</label>
                <DatePicker
                    selected={
                        search.return ? new Date(search.return.split("-").reverse().join("-")) : null
                    }
                    onChange={(date) =>
                        setSearch((prev) => ({ ...prev, return: format(date, "dd-MM-yyyy") }))
                    }
                    minDate={search.depart ? new Date(search.depart.split("-").reverse().join("-")) : new Date()}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="Select return date"
                    required
                />
            </div>

            <button className="search-btn" type="submit">
                Search
            </button>
        </form>
    );
}
export default FlightForm;