import React from 'react';

import { RegExp } from '../utils/reg-exp';

function ErrorPassword({ str }) {
  if (str) {
    if (
      str.search(RegExp.capitalLatin) !== -1 &&
      str.search(RegExp.loginNumber) !== -1 &&
      str.search(RegExp.latinAndNumerals) === -1
    ) {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с <span>заглавной буквой</span> и{' '}
          <span>цифрой</span>
        </React.Fragment>
      );
    }
    if (
      str.search(RegExp.capitalLatin) !== -1 &&
      str.search(RegExp.loginNumber) === -1 &&
      str.search(RegExp.latinAndNumerals) === -1
    ) {
      return (
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с <span>заглавной буквой</span> и{' '}
          <span className='small-errors'>цифрой</span>
        </React.Fragment>
      );
    }
    if (
      str.search(RegExp.capitalLatin) === -1 &&
      str.search(RegExp.loginNumber) !== -1 &&
      str.search(RegExp.latinAndNumerals) === -1
    ) {
      return (
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с{' '}
          <span className='small-errors'>заглавной буквой</span> и цифрой
        </React.Fragment>
      );
    }
    if (
      str.search(RegExp.capitalLatin) === -1 &&
      str.search(RegExp.loginNumber) === -1 &&
      str.search(RegExp.latinAndNumerals) === -1
    ) {
      return (
        <React.Fragment>
          Пароль <span className='small-errors'>не менее 8 символов</span>, с{' '}
          <span className='small-errors'>заглавной буквой</span> и <span className='small-errors'>цифрой</span>
        </React.Fragment>
      );
    }
  }

  return <React.Fragment>Пароль не менее 8 символов, с заглавной буквой и цифрой</React.Fragment>;
}

export { ErrorPassword };
