import { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import s from './FormAddContact.module.scss';
import showNotify from '../Notify/Notify';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class FormAddContact extends Component {
  state = { name: '', number: '' };

  inputNameId = shortid.generate();
  inputNumberId = shortid.generate();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    if (name.length === 0 || number.length === 0) {
      return showNotify('Fields cannot be empty');
    }
    const contact = {
      name: name,
      id: shortid.generate(),
      number: number,
    };
    this.props.onSubmit(contact);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    const { inputNameId } = this.inputNameId;
    const { inputNumberId } = this.inputNumberId;
    return (
      <form className={s.PhonebookForm} onSubmit={this.handleSubmit}>
        <label htmlFor={inputNameId} className={s.labelTitle}>
          Name:
        </label>
        <input
          id={inputNameId}
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          className={s.input}
        />
        <label htmlFor={inputNumberId} className={s.labelTitle}>
          Number:
        </label>
        <input
          id={inputNumberId}
          type="number"
          name="number"
          value={number}
          onChange={this.handleChange}
          className={s.input}
        />
        <button className={s.buttonSubmit} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

FormAddContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default FormAddContact;
