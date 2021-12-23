function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://appet-shenkar.herokuapp.com/api/users/1/myInterests");
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
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="acceptDog(' + object['id'] + ')">Accept</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="cancelDog(' + object['id'] + ')">Cancel</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}


function acceptDog(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `https://appet-shenkar.herokuapp.com/api/users/1/dogs/${id}/completeAdoption`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "id": id,
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['message']);
            loadTable();
        }
    };
}

function cancelDog(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `https://appet-shenkar.herokuapp.com/api/users/1/dogs/${id}/cancelAdoption`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "id": id,
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