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

    const initialValues = {year: "", make: "", model: "", variant: "", body_type: "", transmission: "", fuel_type: "", displacement: "", seller: "", ask_price: "", general: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

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

    // const path = window.location.origin;

    const path = 'http://localhost:3000';


    if (currentRoute.indexOf("update") > -1) {
        var id = window.location.pathname.split("/").pop();
    }

    const getVehicle = (id) => {
        
        Axios.get(path + `/update/${id}`, {
            id: id
        }).then((response) => {
            setVehicleList(response.data);
            console.log(response.data);
        });
      }

      useEffect(() => {

        getVehicle(id)
          
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            
            console.log(formValues);

            console.log(newYear);

            console.log(newSeller);

            Axios.put(path + "/update", {
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
            });
        }

  }, [formErrors, id]);

      const validate = (values) => {

        const errors = {};

          if (!values.year) {
              errors.year = "Year is required!";
          }

          if (!values.make) {
            errors.make = "Make is required!";
          }

          if (!values.model) {
            errors.model = "Model is required!";
          }

          if (!values.variant) {
            errors.variant = "Variant is required!";
          }

          if (!values.transmission) {
            errors.transmission = "Transmission is required!";
          }

          if (!values.body_type) {
            errors.body_type = "Body Type is required!";
          }

          if (!values.fuel_type) {
            errors.fuel_type = "Fuel Type is required!";
          }

          if (!values.displacement) {
            errors.displacement = "Displacement is required!";
          }

          if (!values.seller) {
            errors.seller = "Seller is required!";
          }

          if (!values.ask_price) {
            errors.ask_price = "Ask Price is required!";
          }

          if (!values) {
            errors.general = "There were errors with your form";
          }

          return errors;
      }

      const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    }

    const updateVehicle = (id) => {

        console.log(formValues)

        setFormErrors(validate(formValues));
        setIsSubmit(true);
    
        setNewYear(formValues.year);
        setNewMake(formValues.make);
        setNewModel(formValues.model);
        setNewVariant(formValues.variant);
        setNewTransmission(formValues.transmission);
        setNewFuelType(formValues.fuel_type);
        setNewBodyType(formValues.body_type);
        setNewDisplacement(formValues.displacement);
        setNewSeller(formValues.seller);
        setNewAskPrice(formValues.ask_price);

    }

    const deleteVehicle = (id) => {
    
        Axios.delete(path + `/delete/${id}`).then((response) => {
            setVehicleList(vehicleList.filter((val) => {
                return val.id != id
            }))
        });
    }
        return (
            <div className="App">
                <h1>Update Vehicle</h1>
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                {vehicleList.map((val, key) => {
                    return <div className="insert" key={key}>
                                <div className="form-field">
                                    <label>Year</label>
                                    <div>Current: {val.year}</div>
                                    <input type="text"
                                    name="year"
                                    defaultValue={val.year}
                                    onChange={handleChange} />
                                    <p>{formErrors.year}</p>
                                </div>
                                <div className="form-field">
                                    <label>Make</label>
                                    <div>Current: {val.make}</div>
                                    <input type="text"
                                    name="make"
                                    onChange={handleChange} />
                                     <p>{formErrors.make}</p>
                                </div>
                                <div className="form-field">
                                    <label>Model</label>
                                    <div>Current: {val.model}</div>
                                    <input type="text"
                                    name="model"
                                    onChange={handleChange} />
                                     <p>{formErrors.model}</p>
                                </div>
                                <div className="form-field">
                                    <label>Variant</label>
                                    <div>Current: {val.variant}</div>
                                    <input type="text"
                                    name="variant"
                                    onChange={handleChange} />
                                     <p>{formErrors.variant}</p>
                                </div>
                                <div className="form-field">
                                    <label>Body Type</label>
                                    <div>Current: {val.body_type}</div>
                                    <input type="text"
                                    name="body_type"
                                    onChange={handleChange} />
                                     <p>{formErrors.body_type}</p>
                                </div>
                                <div className="form-field">
                                    <label>Transmission</label>
                                    <div>Current: {val.transmission}</div>
                                    <input type="text"
                                    name="transmission"
                                    onChange={handleChange} />
                                     <p>{formErrors.transmission}</p>
                                </div>
                                <div className="form-field">
                                    <label>Fuel Type</label>
                                    <div>Current: {val.fuel_type}</div>
                                    <input type="text"
                                    name="fuel_type"
                                    onChange={handleChange} />
                                     <p>{formErrors.fuel_type}</p>
                                </div>
                                <div className="form-field">
                                    <label>Displacement</label>
                                    <div>Current: {val.displacement}</div>
                                    <input type="text"
                                    name="displacement"
                                    onChange={handleChange} />
                                     <p>{formErrors.displacement}</p>
                                </div>
                                <div className="form-field">
                                    <label>Seller</label>
                                    <div>Current: {val.seller}</div>
                                    <input type="text"
                                    name="seller"
                                    onChange={handleChange} />
                                     <p>{formErrors.seller}</p>
                                </div>
                                <div className="form-field">
                                    <label>Ask Price</label>
                                    <div>Current: {val.ask_price}</div>
                                    <input type="text"
                                    name="ask_price"
                                    onChange={handleChange} />
                                     <p>{formErrors.ask_price}</p>
                                </div>
                        <button onClick={() => {updateVehicle(val.id)}}>Update</button>
                        <button onClick={() => {deleteVehicle(val.id)}}>Delete</button>
                        {Object.keys(formErrors).length === 0 && isSubmit ? (
                                <div>Added Successfully!</div>
                            ) : ('')}
                        <p>{formErrors.general}</p>
                    </div>
            })}
            </div>
    )
}

export default UpdateForm;
