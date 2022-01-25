const fs = require('fs/promises');
const listContacts = require("./listContacts");
const filePath=require("../../helpers/file_path");

const removeContact = async (id) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if(idx === -1){
        return null;
    }
    const deleteContact = contacts[idx];
    contacts.splice(idx, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
  return deleteContact
};
  
module.exports = removeContact;
