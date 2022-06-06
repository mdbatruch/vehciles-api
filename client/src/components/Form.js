import React, { useState, useEffect } from 'react';
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

    const initialValues = {year: "", make: "", model: "", variant: "", body_type: "", transmission: "", fuel_type: "", displacement: "", seller: "", ask_price: "", general: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [vehicleList, setVehicleList] = useState([]);

    const [newModel, setNewModel] = useState(0);

    const addVehicle = (e) => {

        e.preventDefault();

        setFormErrors(validate(formValues));
        setIsSubmit(true);


        setYear(formValues.year);
        setMake(formValues.make);
        setModel(formValues.model);
        setVariant(formValues.variant);
        setTransmission(formValues.transmission);
        setFuelType(formValues.fuel_type);
        setBodyType(formValues.body_type);
        setDisplacement(formValues.displacement);
        setSeller(formValues.seller);
        setAskPrice(formValues.ask_price);

      }


      useEffect(() => {
          
            console.log(formErrors);

            if (Object.keys(formErrors).length === 0 && isSubmit) {
                
                console.log(formValues);

                console.log(year);

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

      }, [formErrors]);

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

    const deleteVehicle = (id) => {
    
        Axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
            setVehicleList(vehicleList.filter((val) => {
                return val.id != id
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
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                <div className="insert">
                    <div className="form-field">
                        <label>Year</label>
                        <input type="text"
                        name="year"
                        onChange={handleChange} />
                        <p>{formErrors.year}</p>
                    </div>
                    <div className="form-field">
                        <label>Make</label>
                        <input type="text"
                        name="make"
                        onChange={handleChange} />
                        <p>{formErrors.make}</p>
                    </div>
                    <div className="form-field">
                        <label>Model</label>
                        <input type="text"
                        name="model"
                        onChange={handleChange} />
                        <p>{formErrors.model}</p>
                    </div>
                    <div className="form-field">
                        <label>Variant</label>
                        <input type="text"
                        name="variant"
                        onChange={handleChange} />
                        <p>{formErrors.variant}</p>
                    </div>
                    <div className="form-field">
                        <label>Body Type</label>
                        <input type="text"
                        name="body_type"
                        onChange={handleChange} />
                        <p>{formErrors.body_type}</p>
                    </div>
                    <div className="form-field">
                        <label>Transmission</label>
                        <input type="text"
                        name="transmission"
                        onChange={handleChange} />
                        <p>{formErrors.transmission}</p>
                    </div>
                    <div className="form-field">
                        <label>Fuel Type</label>
                        <input type="text"
                        name="fuel_type"
                        onChange={handleChange} />
                        <p>{formErrors.fuel_type}</p>
                    </div>
                    <div className="form-field">
                        <label>Displacement</label>
                        <input type="text"
                        name="displacement"
                        onChange={handleChange} />
                        <p>{formErrors.displacement}</p>
                    </div>
                    <div className="form-field">
                        <label>Seller</label>
                        <input type="text"
                        name="seller"
                        onChange={handleChange} />
                        <p>{formErrors.seller}</p>
                    </div>
                    <div className="form-field">
                        <label>Ask Price</label>
                        <input type="text"
                        name="ask_price"
                        onChange={handleChange} />
                        <p>{formErrors.ask_price}</p>
                    </div>
                    <button onClick={addVehicle}>Add Vehicle</button>
                    {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <div>Added Successfully!</div>
                    ) : ('')}
                    <p>{formErrors.general}</p>
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
                                    <button onClick={() => {deleteVehicle(val.id)}}>Delete</button>
                               </div>
                    })}

                </div>
            </div>
    )
}

export default Form;
