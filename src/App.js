import { Component } from 'react';
import Container from './components/Container/Container';
import './index.css';
import FormAddContact from './components/FormAddContact/FormAddContact';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactsList/ContactsList';
import { CSSTransition } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import sowNotify from './components/Notify/Notify';

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
      sowNotify(name, 'is already in contacts');

      return;
    }
    this.setState(prevState => {
      return {
        contacts: [contact, ...prevState.contacts],
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
      <>
        <Container>
          <CSSTransition
            in={true}
            timeout={500}
            classNames="titleApp"
            appear={true}
          >
            <h1 className="titleApp">Phonebook</h1>
          </CSSTransition>
          <FormAddContact onSubmit={this.addContact} />
          <h2 className="titlleContact">Contacts</h2>
          {contacts.length > 1 && <Filter onChange={this.handleChangeFilter} />}
          {filteredContacts.length === 0 && <p>Contact not found</p>}

          {filter.length > 0 ? (
            <ContactList
              item={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            <ContactList item={contacts} onDeleteContact={this.deleteContact} />
          )}
          <ToastContainer />
        </Container>
      </>
    );
  }
}

export default App;
