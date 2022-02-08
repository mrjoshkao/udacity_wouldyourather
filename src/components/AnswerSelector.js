/*
 * this pattern comes from https://www.robinwieruch.de/react-radio-button/
 * with modifications from https://stackoverflow.com/questions/1431726/css-selector-for-a-checked-radio-buttons-label
 */

import React from "react";

function onSubmit(e,favorite,submitAnswer) {
  e.preventDefault();
  submitAnswer(favorite);
}

function AnswerSelector(props) {
  const [favorite, setFavorite] = React.useState('optionOne');

  const handleChangeOne = () => {
    setFavorite('optionOne');
  };

  const handleChangeTwo = () => {
    setFavorite('optionTwo');
  };

  return (
    <div className="Answer-Selector">
      <RadioButton
        label={props.optionOne}
        value={favorite === 'optionOne'}
        onChange={handleChangeOne}
        id={'optionOne'}
      />
      OR
      <RadioButton
        label={props.optionTwo}
        value={favorite === 'optionTwo'}
        onChange={handleChangeTwo}
        id={'optionTwo'}
      />
      <div>
        <span className="tab-list-item navbar-logout" onClick={(e)=>onSubmit(e,favorite,props.submitAnswer)}>Submit</span>
      </div>
    </div>
  );
};

const RadioButton = ({ label, value, onChange, id }) => {
  return (
    <div>
      <input type="radio" checked={value} onChange={onChange} id={id}/>
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default AnswerSelector;