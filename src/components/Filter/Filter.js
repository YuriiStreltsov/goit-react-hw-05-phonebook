import { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import s from './Filter.module.scss';

class Filter extends Component {
  state = { value: '' };

  handleChange = e => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.value.toLowerCase());
  };

  render() {
    return (
      <div className={s.filter}>
        <p className={s.text}>Find contacts by name</p>
        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          onChange={this.handleChange}
          className={s.input}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
