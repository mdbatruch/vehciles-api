import React, { useState } from 'react';
import Axios from 'axios';

const Form = ({ }) => {
 
    const [year, setYear] = useState(false);
    const [make, setMake] = useState(false);
    const [model, setModel] = useState(false);
    const [variant, setVariant] = useState(false);
    const [bodyType, setBodyType] = useState(false);
    const [transmission, setTransmission] = useState(false);
    const [fuelType, setFuelType] = useState(false);
    const [displacement, setDisplacement] = useState(false);
    const [seller, setSeller] = useState(false);
    const [askPrice, setAskPrice] = useState(false);

    const [vehicleList, setVehicleList] = useState([]);

    const [newModel, setNewModel] = useState(0);

    const addVehicle = () => {

        console.log(make);
        
        Axios.post("http://localhost:3000/insert", {
            year: year,  
            make: make,
            model: model,
            variant: variant,
            body_type: bodyType,
            transmission: transmission,
            fuel_type: fuelType,
            displacement: displacement,
            seller: seller,
            ask_price: askPrice,
        }).then(() => {
          console.log("success");
        });
      }

      const updateVehicle = (id) => {
        
        Axios.put("http://localhost:3000/update", {
            model: newModel,
            id: id
        }).then((response) => {
            console.log('updated');

            setVehicleList(vehicleList.map((val) => {
                return val.id == id ? {id: val.id, make: val.make, model: newModel, year: val.year} : val;
            }))
        });
      }

    const getVehicles = () => {

        console.log(make);
        
        Axios.get("http://localhost:3000/vehicles").then((response) => {
            setVehicleList(response.data);
        });
      }

        return (
            <div className="App">
                <h1>New Vehicle Form</h1>
                <div className="insert">
                    <div className="form-field">
                        <label>Year</label>
                        <input type="text"
                        onChange={(event) => {
                            setYear(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Make</label>
                        <input type="text"
                        onChange={(event) => {
                            setMake(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Model</label>
                        <input type="text"
                        onChange={(event) => {
                            setModel(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Variant</label>
                        <input type="text"
                        onChange={(event) => {
                            setVariant(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Body Type</label>
                        <input type="text"
                        onChange={(event) => {
                            setBodyType(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Transmission</label>
                        <input type="text"
                        onChange={(event) => {
                            setTransmission(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Fuel Type</label>
                        <input type="text"
                        onChange={(event) => {
                            setFuelType(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Displacement</label>
                        <input type="text"
                        onChange={(event) => {
                            setDisplacement(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Seller</label>
                        <input type="text"
                        onChange={(event) => {
                            setSeller(event.target.value);
                        }} />
                    </div>
                    <div className="form-field">
                        <label>Ask Price</label>
                        <input type="text"
                        onChange={(event) => {
                            setAskPrice(event.target.value);
                        }} />
                    </div>
                    <button onClick={addVehicle}>Add Vehicle</button> 
                </div>
                <div className="display">
                    <button onClick={getVehicles}>Get Vehicles</button>

                    {vehicleList.map((val, key) => {
                        return <div className="vehicle" key={key}>
                                    <h3>{val.model}</h3>
                                    <div>
                                        <input type="text" placeholder="Model..." 
                                        onChange={(event)  => {
                                            setNewModel(event.target.value);
                                        }}/>
                                    </div>
                                    <button onClick={() => {updateVehicle(val.id)}}>Update</button>
                               </div>
                    })}

                </div>
            </div>
    )
}

export default Form;
