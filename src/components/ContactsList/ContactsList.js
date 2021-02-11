import PropTypes from 'prop-types';
import s from './ContactsList.module.scss';

function ContactsList({ children }) {
  return <ul className={s.list}>{children}</ul>;
}

ContactsList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContactsList;
