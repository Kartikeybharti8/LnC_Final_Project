"use strict";
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["CHEF"] = "chef";
    Role["EMPLOYEE"] = "employee";
})(Role || (Role = {}));
class Employee {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.id = id;
        this.username = username;
        this.role = Role.EMPLOYEE;
    }
    giveFeedback() {
        console.log(`Feedback from ${this.username}`);
    }
}
class Chef {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.id = id;
        this.username = username;
        this.role = Role.CHEF;
    }
    rollOutMenu(menu) {
        // console.log(`Menu rolled out by Chef ${this.name}: ${menu.join(', ')}`);
    }
}
class Admin {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.id = id;
        this.username = username;
        this.role = Role.ADMIN;
    }
    manageMenu(action, item) {
        // console.log(`Admin ${this.name} ${action} ${item} in the menu.`);
    }
}
const a = new Employee(1, "ayan");
a.giveFeedback();
