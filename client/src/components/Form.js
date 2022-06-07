import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Form = ({ }) => {
 
    const [year, setYear] = useState(false);
    const [make, setMake] = useState(false);
    const [model_type, setModelType] = useState(false);
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
    const [isIndSubmit, setIsIndSubmit] = useState(false);

    const [toggleVehicles, setToggleVehicles] = useState(false);

    const [model, setModel] = useState(false);

    const [vehicleList, setVehicleList] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const [newModel, setNewModel] = useState(0);

    const addVehicle = (e) => {

        e.preventDefault();

        setFormErrors(validate(formValues));
        setIsSubmit(true);


        setYear(formValues.year);
        setMake(formValues.make);
        setModelType(formValues.model_type);
        setVariant(formValues.variant);
        setTransmission(formValues.transmission);
        setFuelType(formValues.fuel_type);
        setBodyType(formValues.body_type);
        setDisplacement(formValues.displacement);
        setSeller(formValues.seller);
        setAskPrice(formValues.ask_price);

      }

      const handleSubmit = (e) => {
        e.preventDefault();
      }


      useEffect(() => {
          
            console.log(formErrors);

            console.log(formValues);

            if (Object.keys(formErrors).length === 0 && isSubmit) {
                
                console.log(formValues);

                console.log(year);

                console.log(make);

                Axios.post("http://localhost:3000/insert", {
                    year: year,  
                    make: make,
                    model_type: model_type,
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

      const validateInd = (values) => {

        const errors = {};

          if (!values.model) {
            errors.model = "Model is required!";
          }
          return errors;
      }

      const validate = (values) => {

        const errors = {};

          if (!values.year) {
              errors.year = "Year is required!";
          }

          if (!values.make) {
            errors.make = "Make is required!";
          }

          if (!values.model_type) {
            errors.model_type = "Model is required!";
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
          e.preventDefault();
          const { name, value } = e.target;
          setFormValues({...formValues, [name]: value});
      }

    const updateVehicle = (id) => {

        setFormErrors(validateInd(formValues));

        setModel(formValues.model);

        console.log(id, formValues.model)

        setIsIndSubmit(true);

        console.log(formErrors)

        if (Object.keys(formErrors).length === 0 && isIndSubmit) {
    
            Axios.put("http://localhost:3000/update_one", {
                model: formValues.model,
                id: id
            }).then((response) => {
                console.log('updated');

                setIsSubmit(true);
                

                setCurrentId(id)

                console.log(currentId);

                setVehicleList(vehicleList.map((val) => {
                    return val.id == id ? {id: val.id, make: val.make, model: formValues.model, year: val.year} : {id: val.id, make: val.make, model: val.model, year: val.year};
                }))
            });
        }
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
            
            if (toggleVehicles == false) {
                setToggleVehicles(true)

                setVehicleList(response.data);
            } else {
                setToggleVehicles(false)
            }
            // console.log(response.data)
        });
      }

        return (
            <div className="App">
                <h1>New Vehicle Form</h1>
                {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                <form onSubmit={handleSubmit} className="insert">
                    <div className="form-field form-group">
                        <label>Year</label>
                        <input type="text"
                        className="form-control"
                        name="year"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.year}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Make</label>
                        <input type="text"
                        className="form-control"
                        name="make"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.make}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Model</label>
                        <input type="text"
                        className="form-control"
                        name="model_type"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.model_type}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Variant</label>
                        <input type="text"
                        className="form-control"
                        name="variant"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.variant}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Body Type</label>
                        <input type="text"
                        className="form-control"
                        name="body_type"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.body_type}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Transmission</label>
                        <input type="text"
                        className="form-control"
                        name="transmission"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.transmission}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Fuel Type</label>
                        <input type="text"
                        className="form-control"
                        name="fuel_type"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.fuel_type}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Displacement</label>
                        <input type="text"
                        className="form-control"
                        name="displacement"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.displacement}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Seller</label>
                        <input type="text"
                        className="form-control"
                        name="seller"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.seller}</p>
                    </div>
                    <div className="form-field form-group">
                        <label>Ask Price</label>
                        <input type="text"
                        className="form-control"
                        name="ask_price"
                        onChange={handleChange} />
                        <p className="text-danger">{formErrors.ask_price}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success" onClick={addVehicle}>Add Vehicle</button>
                        <button className="btn btn-primary" onClick={getVehicles}>Toggle Vehicle List</button>
                    </div>
                    {Object.keys(formErrors).length === 0 && isSubmit && !isIndSubmit ? (
                        <div className="text-success">Added Successfully!</div>
                    ) : ('')}
                    <p className="text-danger">{formErrors.general}</p>
                </form>
                <div className="display">
                    <div className="container">
                        <div className="row">
                        {toggleVehicles ? (
                                vehicleList.map((val, key) => {
                                    return <div className="vehicle col-12 col-md-4" id={val.id} key={key}>
                                                <h3>{val.model}</h3>
                                                <div>
                                                    <input type="text" placeholder="Model..."
                                                    className="form-control"
                                                    name="model"
                                                    onChange={handleChange}/>
                                                    {Object.keys(formErrors).length === 1 && isIndSubmit && currentId === val.id ? (
                                                        <p className="text-danger">{formErrors.model}</p>
                                                    ) : ('')}
                                                </div>
                                                <div className="d-flex justify-content-between mt-2">
                                                    <button className="btn btn-success" onClick={() => {updateVehicle(val.id)}}>Update</button>
                                                    <button className="btn btn-danger" onClick={() => {deleteVehicle(val.id)}}>Delete</button>
                                                </div>
                                                {Object.keys(formErrors).length === 0 && isIndSubmit && currentId === val.id ? (
                                                    <div className="text-success">Updated Successfully!</div>
                                                ) : ('')}
                                                    <p className="text-danger">{formErrors.general}</p>
                                                </div>
                                            })
                                ) : ('')}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Form;
