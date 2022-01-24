/*
 * this pattern comes from https://www.robinwieruch.de/react-radio-button/
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
    <div>
      <RadioButton
        label={props.optionOne}
        value={favorite === 'optionOne'}
        onChange={handleChangeOne}
      />
      <RadioButton
        label={props.optionTwo}
        value={favorite === 'optionTwo'}
        onChange={handleChangeTwo}
      />
      <div>
        <button onClick={(e)=>onSubmit(e,favorite,props.submitAnswer)}>Submit</button>
      </div>
    </div>
  );
};

const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default AnswerSelector;