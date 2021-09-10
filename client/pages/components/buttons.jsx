import React from 'react';

export default function FoodButton(props) {
  return (
    <>
      <div className="col-half" key={props.name}>
        <div className="row center-all">
          <div className="height-and-width">
            <button name={props.name} className={props.state === props.name ? 'border-category selected' : 'border-category'} onClick={ () => props.highlighted(props.name)}>
              <div className="row center-all">
                <div className="col-half">
                  <h3 className="remove-margin">{props.name}</h3>
                </div>
                <div className="col-half">
                  <div className="row row-reverse">
                    <img src={props.icon} className="height-category" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
