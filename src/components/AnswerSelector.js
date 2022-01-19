/*
 * this pattern comes from https://www.robinwieruch.de/react-radio-button/
 */

import React, { Component } from "react";

function AnswerSelector(props) {
  const [favorite, setFavorite] = React.useState('cat');

  const handleCatChange = () => {
    setFavorite('cat');
  };

  const handleDogChange = () => {
    setFavorite('dog');
  };

  return (
    <div>
      <RadioButton
        label="Cat"
        value={favorite === 'cat'}
        onChange={handleCatChange}
      />
      <RadioButton
        label="Dog"
        value={favorite === 'dog'}
        onChange={handleDogChange}
      />
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