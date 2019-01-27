import React from 'react';
import { Field, reduxForm } from 'redux-form';

// необходимо добавить пропс текущего времени.
// Проверить форму заполнения толькоминимум 5 символов
// узнать где находяться стеэты.
// добавление текста при заполнениив поле сверху 



const SimpleForm = props => {
  

  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
     <div>
        <label>Input Mail Code</label>
        <div>
          <Field
            name="VerificationCode"
            component="input"
            type="text"
            placeholder="Input Mail Code"
          />
        </div>
      </div>
      <div>
        <button 
        name="Submit"
        id="WidhDraw"
        type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);