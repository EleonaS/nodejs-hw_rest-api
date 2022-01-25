const fs = require('fs/promises');
const filePath = require("../../helpers/file_path");
const listContacts = require("./listContacts");

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
    return null;
    }
  contacts[idx] = { id, name, email,phone };
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  return contacts[idx]
};
 
module.exports = updateContact;