import React from 'react';

class All extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            image: ''
          }
    }

    render () {
        return (
            <div className="App">
                <h1>Vehicle List</h1>
            <div className="container">
              <div className="row">
            { this.props.vehiclesList.map((val, index)=> {

              {this.state.list.map((test, index)=> {
                if (val.make == test.charAt(0).toUpperCase() + test.slice(1)) {
                this.state.image = '../images/' + test.toLowerCase() + '.jpeg';
                }

                console.log(val.make, test.charAt(0).toUpperCase() + test.slice(1))
                console.log( this.state.image)
              })}
      
              return (
                <div className="col-md-4" key={index}>
                    <div className="card mb-4 box-shadow">
                      <img className="card-img-top" src={require('../images/' + val.make.toLowerCase() + '.jpeg')} data-holder-rendered="true" />
                      <div className="card-body">
                        <h3 key="{val.id}">{val.year} | {val.make} {val.model}</h3>
                          {(val.status == 'sold' ? 
                              (<p className="card-text">Buyer: {val.buyer}</p>) 
                              : ('') 
                            )}
                        <div className="specs">
                          <h5>Specs</h5>
                          <ul>
                            <li>Variant: {val.variant}</li>
                            <li>Body Type: {val.body_type}</li>
                            <li>Transmission: {val.transmission}</li>
                            <li>Fuel Type: {val.fuel_type}</li>
                            <li>Displacement: {val.displacement}</li>
                          </ul>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group d-block">
                            <small className="text-muted d-block">Ask Price: {val.ask_price}</small>
                                {(val.status == 'sold' ? 
                                  (<small className="text-muted d-block text-left">Sold for: {val.sold_price}</small>) 
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
              );
            })}
            </div>
        </div>
    </div>
    )}
}

export default All;
