import PropTypes from 'prop-types';
import s from './ContactsListItem.module.scss';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
function ContactsListItem({ item, onDeleteContact }) {
  return (
    <TransitionGroup component={null}>
      {item.map(({ id, name, number }) => (
        <CSSTransition key={id} timeout={250} classNames={s}>
          <li className={s.item}>
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
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactsListItem.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsListItem;
