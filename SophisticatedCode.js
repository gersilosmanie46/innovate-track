/* 
   Filename: SophisticatedCode.js
   Purpose: Example of a sophisticated and complex code in JavaScript
   Content: A program that implements a record management system for a small business.
*/

// Class for creating record objects
class Record {
    constructor(name, age, contact) {
        this.name = name;
        this.age = age;
        this.contact = contact;
    }

    getRecordDetails() {
        return `${this.name}, ${this.age}, ${this.contact}`;
    }
}

// Class for record management system
class RecordManagementSystem {
    constructor() {
        this.records = [];
    }

    addRecord(name, age, contact) {
        const record = new Record(name, age, contact);
        this.records.push(record);
    }

    removeRecord(name) {
        this.records = this.records.filter(record => record.name !== name);
    }

    searchRecord(name) {
        return this.records.find(record => record.name === name);
    }

    updateRecordContact(name, newContact) {
        const record = this.searchRecord(name);
        if (record) {
            record.contact = newContact;
        }
    }

    getAllRecords() {
        return this.records;
    }
}

// Usage example
const recordMgmtSys = new RecordManagementSystem();

recordMgmtSys.addRecord("John Doe", 30, "john.doe@test.com");
recordMgmtSys.addRecord("Jane Smith", 25, "jane.smith@test.com");
recordMgmtSys.addRecord("Alice Cooper", 35, "alice.cooper@test.com");

console.log(recordMgmtSys.getAllRecords());

recordMgmtSys.updateRecordContact("John Doe", "john.doe@newemail.com");

console.log(recordMgmtSys.searchRecord("John Doe").getRecordDetails());

recordMgmtSys.removeRecord("Alice Cooper");

console.log(recordMgmtSys.getAllRecords());