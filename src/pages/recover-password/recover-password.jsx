import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ForgotPass } from '../forgot-pass';
import { PasswordRecovery } from '../password-recovery';

function RecoverPassword() {
  const location = useLocation();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <React.Fragment>{location.search.includes('?code=') ? <PasswordRecovery /> : <ForgotPass />}</React.Fragment>
  );
}

export { RecoverPassword };
