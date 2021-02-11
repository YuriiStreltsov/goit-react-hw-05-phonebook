import PropTypes from 'prop-types';
import s from './ContactsListItem.module.scss';

function ContactsListItem({ item, onDeleteContact }) {
  return (
    <>
      {item.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <div className={s.content}>
            <p>
              {name}: {number}
            </p>
          </div>
          <button
            className={s.button}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </>
  );
}

ContactsListItem.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsListItem;
