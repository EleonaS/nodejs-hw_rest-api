const fs = require('fs/promises');
const { nanoid } = require("nanoid");
const filePath = require("../../helpers/file_path");
const listContacts=require("./listContacts");

const addContact = async (name, email, phone) => {
  const data = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(data);
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  return data
};

module.exports = addContact;
