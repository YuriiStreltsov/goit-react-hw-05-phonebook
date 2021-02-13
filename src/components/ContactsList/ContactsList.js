import ContactsListItem from './ContactsListItem';
import s from './ContactsList.module.scss';

function ContactsList({ item, onDeleteContact }) {
  return (
    <ul className={s.list}>
      <ContactsListItem item={item} onDeleteContact={onDeleteContact} />
    </ul>
  );
}

export default ContactsList;
