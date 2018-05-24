// Wait until the window loads to get started
window.onload = init;
// Prepare a global variable for the contact manager
let cm;

function init() {
    cm = new ContactManager();
    cm.addTestData();
    cm.printContactsToConsole();
    cm.displayContactAsATable("contacts");
}


// This class holds the contact objects
class Contact {
    constructor (name, email) {
        this.name = name;
        this.email = email;
    }
}

var c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
var c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");

// This class holds the contact management system
class ContactManager {
    constructor () {
        this.listOfContacts = [];
    }
    // A contact added is added to the end of the list
    add(contact) {
        this.listOfContacts.push(contact);
    }
    
    addTestData() {
		let c1 = new Contact("Jimi Hendrix", "jimi@rip.com");
  		let c2 = new Contact("Robert Fripp", "robert.fripp@kingcrimson.com");
  		let c3 = new Contact("Angus Young", "angus@acdc.com");
  		let c4 = new Contact("Arnold Schwarzenneger", "T2@terminator.com");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		this.sort();
	}
	
    // To remove a contact it must first be identified in the list. The identification is done on email match
    remove(contact) {
        for (let i = 0; i < this.listOfContacts.length; i++) {
            var c = this.listOfContacts[i];
            
            if (c.email === contact.email) {
                this.listOfContacts.splice(i, i);
                break;
            }
        };
    }
    
    sort() {
        this.listOfContacts.sort(ContactManager.compareByName);
    }
    
    save() {
        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }
    
    empty() {
        this.listOfContacts = [];
    }
    
    load() {
        if (localStorage.contacts != undefined) {
            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }
    // Class method to compare two contacts by name
    static compareByName(c1, c2) {
        if (c1.name < c2.name) return -1;
        if (c1.name > c2.name) return 1;
        return 0; // if both names are equal
    }
    
    printContactsToConsole () {
        this.listOfContacts.forEach(function(c) {
            console.log(c.name);
        });
    };
    
    displayContactAsATable (idOfContainer) {
        // Let's start first by making sure the receptacle is empty to receive the result
        let container = document.querySelector("#" + idOfContainer);
        container.innerHTML = "";
        if (this.listOfContacts.length === 0) {
            container.innerHTML = "<p>No contact to display</p>";
            return;
        }
        let table = document.createElement("table");
        this.listOfContacts.forEach(function(currentContact) {
           let row = table.insertRow();
           row.innerHTML = "<td>" + currentContact.name + "</td>" + "<td>" + currentContact.email + "</td>"
        });
        container.appendChild(table);
    }
}