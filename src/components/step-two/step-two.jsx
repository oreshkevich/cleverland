function StepTwo(props) {
  return (
    <div className='step-one'>
      <div className='item-form__wrap form-item'>
        <input
          id='firstName'
          placeholder=' '
          className={`form-input ${props.errors.name ? 'form-input_errors' : ''}`}
          type='text'
          {...props.register('firstName', {
            required: true,
            minLength: 1,
          })}
        />
        <label className='form-label' htmlFor='firstName'>
          Имя
        </label>
        {props.errors?.firstName && (
          <p data-test-id='hint' className='small  small-errors'>
            Поле не может быть пустым
          </p>
        )}
      </div>
      <div className='item-form__wrap form-item form-item_relative'>
        <input
          type='text'
          id='lastName'
          placeholder=' '
          className='form-input'
          {...props.register('lastName', {
            required: true,
            minLength: 1,
          })}
        />

        <label className='form-label' htmlFor='lastName'>
          Фамилия
        </label>
        {props.errors?.lastName && (
          <p data-test-id='hint' className='small  small-errors'>
            Поле не может быть пустым
          </p>
        )}
      </div>
    </div>
  );
}

export { StepTwo };
