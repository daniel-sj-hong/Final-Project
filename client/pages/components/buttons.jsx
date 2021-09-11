import React from 'react';

export default function FoodButton(props) {
  return (

      <div className="col-half center-all flex">
          <div className="food-category">
            <button name={props.name} className={props.state === props.name ? 'border-category selected' : 'border-category'} onClick={ () => props.highlighted(props.name)}>
              <div className="row center-all justify-between pl-2 pr-1">
                <h3 className="remove-margin">{props.name}</h3>
                <img src={props.icon} className="height-category" />
              </div>
            </button>
          </div>
      </div>

  );
}
