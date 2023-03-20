import { useEffect, useState } from 'react';

function useMask(e) {
  const PATTERN = /\D/g;

  const getInputNumbersValue = (value) => value.replace(PATTERN, '');

  const handlePhoneInput = (event) => {
    const input = event.target;
    const inputNumbersValue = getInputNumbersValue(input.value);
    let formattedInputValue = '';

    const firstSymbols = inputNumbersValue[0];

    if (firstSymbols) {
      formattedInputValue = `${firstSymbols}`;

      if (inputNumbersValue.length > 1) {
        formattedInputValue += `${inputNumbersValue.substring(1, 3)}`;
      }
      if (inputNumbersValue.length > 3) {
        formattedInputValue += ` (${inputNumbersValue.substring(3, 5)}`;
      }
      if (inputNumbersValue.length >= 6) {
        formattedInputValue += `) ${inputNumbersValue.substring(5, 8)}`;
      }
      if (inputNumbersValue.length >= 9) {
        formattedInputValue += `-${inputNumbersValue.substring(8, 10)}`;
      }
      if (inputNumbersValue.length >= 11) {
        formattedInputValue += `-${inputNumbersValue.substring(10, 12)}`;
      }
    }

    input.value = `+${formattedInputValue}`;
  };

  return handlePhoneInput(e);
}

export { useMask };
