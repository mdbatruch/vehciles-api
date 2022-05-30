import React from 'react';
import { useParams } from "react-router-dom";

class RecommendedList extends React.Component {
  

    constructor(props) {
        super(props);
        this.state = {
          list: [],
          image: ''
        }
      }

    render () {
      return (
          <div>

              <h1>Recommended Vehicles for: {this.props.name.split('_').join(' ')}</h1>
              <div className="container">
                  <div className="row">
              {this.props.recommendedList.map((val, index)=> {

                {this.state.list.map((test, index)=> {
                      if (val.make == test.charAt(0).toUpperCase() + test.slice(1)) {
                        this.state.image = '../images/' + test.toLowerCase() + '.jpeg';
                      }

                      console.log(val.make, test.charAt(0).toUpperCase() + test.slice(1))
                      console.log( this.state.image)
                })}

              return (
                  <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                      <div className="card mb-4 box-shadow">
                      <img className="card-img-top" src={require('../images/' + val.make.toLowerCase() + '.jpeg')} data-holder-rendered="true" />
                      <div className="card-body">
                          <h3>{val.year} {val.make} {val.model}</h3>
                          {(val.status == 'sold' ? 
                              (<p className="card-text">Buyer: {val.buyer.split('_').join(' ')}</p>) 
                              : ('') 
                              )}
                          <div className="specs">
                          <h5>Specs</h5>
                          <ul>
                              <li><span>Variant:</span> {val.variant}</li>
                              <li><span>Body Type:</span> {val.bodyType}</li>
                              <li><span>Transmission:</span> {val.transmission}</li>
                              <li><span>Fuel Type:</span> {val.fuelType}</li>
                              <li><span>Displacement:</span> {val.displacement}</li>
                          </ul>
                          </div>
                          <div className="prices">
                          <div className="d-flex justify-content-between align-items-center">
                              <div className="btn-group d-block">
                              <small className="ask-price block">Ask Price: ${val.askPrice}</small>
                                  {(val.status == 'sold' ? 
                                      (<small className="text-muted d-block text-left text-success">Sold for: ${val.soldPrice}</small>) 
                                      : ('') 
                                  )}
                                  </div>
                              <small className="text-muted">{val.status}</small>
                          </div>
                          <div className="d-flex justify-content-center align-items-center seller">
                              {(val.status == 'sold' ? 
                                  (<small className="text-muted">Sold Date: { (new Date(val.soldDate)).toLocaleDateString() }</small>) 
                                  : ('') 
                              )}
                              <small className=""><span>Seller:</span> {val.seller}</small>
                          </div>
                          </div>
                      </div>
                      </div>
                  </div>
              );
              }) }
              </div>
          </div>
      </div>
    )}
}

export default RecommendedList;
