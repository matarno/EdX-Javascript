function search(){
    var queryURL = "https://jsonplaceholder.typicode.com/users";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', queryURL, true);
    xhr.onload= function(e) {
        var users = JSON.parse(xhr.response);
    
        console.log("First user is: " + JSON.stringify(users[0]));
        
        displayUsersAsATable(users);
    }
        xhr.send();
}

function displayUsersAsATable(users){
    var usersDiv = document.querySelector("#users");
    usersDiv.innerHTML = "";
    var table = document.createElement("table");
    users.forEach (function (currentUser) {
        console.log(currentUser.name);
        var row = table.insertRow();
        row.innerHTML = "<td>" + currentUser.name + "</td><td>" + currentUser.email + "</td>";
    });
    
    usersDiv.append(table);
}