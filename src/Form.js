import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SimpleForm = props => {
  

  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
    <table>
      <thead>
        <tr>
          <td>Показание</td>
          <td>Write</td>
          <td>Read</td>
        </tr>
      </thead>
      <tbody>
       <tr>
          <td>Account Info</td>
          <td></td>
          <td>
            <Field
              name="AcInfo"
              id="AcInfo"
              component="input"
              type="checkbox"
            />
          </td>
        </tr>
        <tr>
          <td>Account History</td>
          <td></td>
          <td>
            <Field
              name="AcHistory"
              id="AcHistory"
              component="input"
              type="checkbox"
            />
          </td>
        </tr>
        <tr>
          <td>Orders</td>
          <td>
            <Field
              name="Orders"
              id="Orders"
              component="input"
              type="checkbox"
            />
          </td>
          <td>
            <Field
              name="WOrders"
              id="WOrders"
              component="input"
              type="checkbox"
            />
          </td>
        </tr>
        <tr>
          <td>Walets</td>
          <td>
            <Field
              name="Walets"
              id="Walets"
              component="input"
              type="checkbox"
            />
          </td>
          <td>
            <Field
              name="WWalets"
              id="WWalets"
              component="input"
              type="checkbox"
            />
          </td>
        </tr>        
        <tr>
          <td>WidhDraw</td>
          <td>
            <Field
              name="WidhDraw"
              id="WidhDraw"
              component="input"
              type="checkbox"
            />
          </td>
          <td>            
          </td>
        </tr>
      </tbody>
    </table>
      <div>
        <label>Token Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
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
