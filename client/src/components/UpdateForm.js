import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const UpdateForm = ({ }) => {
 
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

    const [newYear, setNewYear] = useState(0);
    const [newModel, setNewModel] = useState(0);
    const [newMake, setNewMake] = useState(0);
    const [newVariant, setNewVariant] = useState(0);
    const [newTransmission, setNewTransmission] = useState(0);
    const [newDisplacement, setNewDisplacement] = useState(0);
    const [newBodyType, setNewBodyType] = useState(0);
    const [newFuelType, setNewFuelType] = useState(0);
    const [newSeller, setNewSeller] = useState(0);
    const [newAskPrice, setNewAskPrice] = useState(0);

    const currentRoute = window.location.pathname;

    if (currentRoute.indexOf("update") > -1) {
        var id = window.location.pathname.split("/").pop();
    }

    const getVehicle = (id) => {
        
        Axios.get(`http://localhost:3000/update/${id}`, {
            id: id
        }).then((response) => {
            setVehicleList(response.data);
            console.log(response.data);
        });
      }

    const updateVehicle = (id) => {
    
    Axios.put("http://localhost:3000/update", {
        ask_price: newAskPrice,
        seller: newSeller,
        transmission: newTransmission,
        body_type: newBodyType,    
        fuel_type: newFuelType,
        displacement: newDisplacement,
        variant: newVariant,
        make: newMake,
        model: newModel,
        year: newYear,
        id: id
    }).then((response) => {
        console.log('updated');

        // setVehicleList(vehicleList.map((val) => {
        //     return val.id == id ? {id: val.id, make: val.make, model: newModel, year: val.year} : val;
        // }))
    });
    }

    const deleteVehicle = (id) => {
    
        Axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
            setVehicleList(vehicleList.filter((val) => {
                return val.id != id
            }))
        });
    }

    useEffect(()=> {
        getVehicle(id)

    }, [id]);

        return (
            <div className="App">
                <h1>Update Vehicle</h1>
                {vehicleList.map((val, key) => {
                    return <div className="insert" key={key}>
                                <div className="form-field">
                                    <label>Year</label>
                                    <div>Current: {val.year}</div>
                                    <input type="text"
                                    name="year"
                                    onChange={(event) => {
                                        setNewYear(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Make</label>
                                    <div>Current: {val.make}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setMake(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Model</label>
                                    <div>Current: {val.model}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewModel(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Variant</label>
                                    <div>Current: {val.variant}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewVariant(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Body Type</label>
                                    <div>Current: {val.body_type}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewBodyType(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Transmission</label>
                                    <div>Current: {val.transmission}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewTransmission(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Fuel Type</label>
                                    <div>Current: {val.fuel_type}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewFuelType(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Displacement</label>
                                    <div>Current: {val.displacement}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewDisplacement(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Seller</label>
                                    <div>Current: {val.seller}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewSeller(event.target.value);
                                    }} />
                                </div>
                                <div className="form-field">
                                    <label>Ask Price</label>
                                    <div>Current: {val.ask_price}</div>
                                    <input type="text"
                                    onChange={(event) => {
                                        setNewAskPrice(event.target.value);
                                    }} />
                                </div>
                        <button onClick={() => {updateVehicle(val.id)}}>Update</button>
                        <button onClick={() => {deleteVehicle(val.id)}}>Delete</button>
                    </div>
            })}
            </div>
    )
}

export default UpdateForm;
