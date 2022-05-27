import React, { useState, useEffect } from "react";
import './App.css';
import './App.scss';
import Axios from 'axios';

function App() {

  const [vehicleslist, setVehiclesList] = useState([]);

  useEffect(()=> {
    Axios.get('http://localhost:3000/').then((response) => {
      
      console.log(response.data);
      
      setVehiclesList(response.data);


    });
  }, [])

  return (
    <div className="App">
      <h1>
        Vehicle List
      </h1>
      <div className="container">
        <div className="row">
      { vehicleslist.map((val, index)=> {

        return (
          <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1810632739e%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1810632739e%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.71875%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" />
                <div className="card-body">
                  <h3 key="{val.id}">{val.year} {val.make} {val.model}</h3>
                    {(val.status == 'sold' ? 
                        (<p className="card-text">Buyer: {val.buyer.split('_').join(' ')}</p>) 
                        : ('') 
                      )}
                  <div className="specs">
                    <h5>Specs</h5>
                    <ul>
                      <li><span>Variant:</span> {val.variant}</li>
                      <li><span>Body Type:</span> {val.body_type}</li>
                      <li><span>Transmission:</span> {val.transmission}</li>
                      <li><span>Fuel Type:</span> {val.fuel_type}</li>
                      <li><span>Displacement:</span> {val.displacement}</li>
                    </ul>
                  </div>
                  <div className="prices">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group d-block">
                        <small className="text-muted d-block">Ask Price: ${val.ask_price}</small>
                            {(val.status == 'sold' ? 
                              (<small className="text-muted d-block text-left text-success">Sold for: ${val.sold_price}</small>) 
                              : ('') 
                            )}
                          </div>
                      <small className="text-muted">{val.status}</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {(val.status == 'sold' ? 
                          (<small className="text-muted">Sold Date: { (new Date(val.sold_date)).toLocaleDateString() }</small>) 
                          : ('') 
                        )}
                      <small className="text-muted">Seller: {val.seller}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      })}
      </div>
      </div>

    </div>
  );
}

export default App;
