import { Component } from 'react';
import Container from './components/Container/Container';
import './index.css';
import FormAddContact from './components/FormAddContact/FormAddContact';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactsList/ContactsList';
import ContactsListItem from './components/ContactsList/ContactsListItem';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = contact => {
    const { name } = contact;
    const { contacts } = this.state;
    const unavailableName = contacts.find(contact => contact.name === name);

    if (unavailableName) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  deleteContact = id => {
    const { contacts } = this.state;

    const newContactsList = contacts.filter(item => item.id !== id);
    this.setState({ contacts: newContactsList });
  };

  handleChangeFilter = filter => {
    this.setState({ filter: filter });
  };

  filteredContacts = (contacts, filter) => {
    const result = contacts.filter(elem =>
      elem.name.toLowerCase().includes(filter),
    );
    return result;
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filteredContacts(contacts, filter);
    return (
      <Container>
        <h1 className="titleApp">Phonebook</h1>
        <FormAddContact onSubmit={this.addContact} />
        <h2 className="titlleContact">Contacts</h2>
        {contacts.length > 1 && <Filter onChange={this.handleChangeFilter} />}
        {filteredContacts.length === 0 && <p>Contact not found</p>}
        {filter.length > 0 ? (
          <ContactList>
            <ContactsListItem
              item={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </ContactList>
        ) : (
          <ContactList>
            <ContactsListItem
              item={contacts}
              onDeleteContact={this.deleteContact}
            />
          </ContactList>
        )}
      </Container>
    );
  }
}

export default App;
