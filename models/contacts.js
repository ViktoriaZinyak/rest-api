const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id == contactId);
  return contact || null;
}

async function addContact(name, email, phone) {
  const newProduct = { name, email, phone };
  const contacts = await listContacts();
  contacts.push(newProduct);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newProduct;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === id);
  if (contactIdx !== -1) {
    return null;
  }
  contacts[contactIdx] = { ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
