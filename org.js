function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://appet-shenkar.herokuapp.com/api/orgs/1/dogs");
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + object['id'] + '</td>';
                trHTML += '<td>' + object['name'] + '</td>';
                trHTML += '<td>' + object['breed'] + '</td>';
                trHTML += '<td>' + object['age'] + '</td>';
                trHTML += '<td>' + object['organizationId'] + '</td>';
                trHTML += '<td>' + object['status'] + '</td>';
                trHTML += '<td>' + object['temperament'] + '</td>';
                trHTML += '<td>' + object['lifespan'] + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + object['id'] + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="dogDelete(' + object['id'] + ')">Del</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}


// add dog
function showUserCreateBox() {
    Swal.fire({
        title: 'Create dog',
        html: '<input id="id" type="hidden">' +
            '<input id="name" class="swal2-input" placeholder="name">' +
            '<input id="breed" class="swal2-input" placeholder="breed">' +
            '<input id="age" class="swal2-input" placeholder="age">',
        focusConfirm: false,
        preConfirm: () => {
            dogCreate();
        }
    })
}

function dogCreate() {
    const name = document.getElementById("name").value;
    const breed = document.getElementById("breed").value;
    const age = document.getElementById("age").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://appet-shenkar.herokuapp.com/api/orgs/1/dogs");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": name,
        "breed": breed,
        "age": age,
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    };
}

//   delete dog
function dogDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `https://appet-shenkar.herokuapp.com/api/orgs/1/dogs/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "id": id
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    };
}

loadTable();

// edit dog
function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://appet-shenkar.herokuapp.com/api/orgs/1/dogs/" + id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const dog = JSON.parse(this.responseText);
            //const dog = objects['dog'];
            Swal.fire({
                title: 'Edit Dog',
                html: '<input id="id" type="hidden" value="' + dog['id'] + '">' +
                    '<input id="name" class="swal2-input" placeholder="name" value="' + dog['name'] + '">' +
                    '<input id="breed" class="swal2-input" placeholder="breed" value="' + dog['breed'] + '">' +
                    '<input id="age" class="swal2-input" placeholder="age" value="' + dog['age'] + '">',
                focusConfirm: false,
                preConfirm: () => {
                    dogEdit();
                }
            })
        }
    };
}

function dogEdit() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const breed = document.getElementById("breed").value;
    const age = document.getElementById("age").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://appet-shenkar.herokuapp.com/api/orgs/1/dogs/" + id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "name": name,
        "breed": breed,
        "age": age,
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    };
}