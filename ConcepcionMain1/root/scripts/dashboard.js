var initialPatients = [
    { id: 1, fname: "Charlie", lname: "Kirk", email: "charlie@gmail.com", department: "Dentist", symptoms: "Toothache", status: "Pending" },
    { id: 2, fname: "Rene", lname: "Baterbonia", email: "rene@gmail.com", department: "Optometrist", symptoms: "Blurry vision", status: "Admitted" },
    { id: 3, fname: "Andrew", lname: "Tate", email: "andrew@gmail.com", department: "General Checkup", symptoms: "Fever and cough", status: "Pending" },
    { id: 4, fname: "Maria", lname: "Hiwaga", email: "maria@gmail.com", department: "Cardiology", symptoms: "Chest pain", status: "Admitted" },
    { id: 5, fname: "David", lname: "Sulayaw", email: "david@gmail.com", department: "Dermatology", symptoms: "Skin rash", status: "Pending" },
    { id: 6, fname: "Philip", lname: "Daganio", email: "philip@gmail.com", department: "Orthopedics", symptoms: "Joint pain", status: "Pending" }
];

document.addEventListener('DOMContentLoaded', function () {

    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = '../index.html';
        return;
    }

    var currentUser = localStorage.getItem('currentUser');
    if (currentUser === null) {
        currentUser = 'Admin';
    }

    var usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay !== null) {
        usernameDisplay.textContent = currentUser;
    }

    var patients = initialPatients;

    var tableBody = document.getElementById('patientTableBody');
    var searchInput = document.getElementById('searchInput');

    function render(dataToRender) {
        renderStats(dataToRender);
        renderTable(dataToRender);
    }

    function renderStats(patientList) {
        var total = patientList.length;
        var pending = 0;
        var admitted = 0;

        for (var i = 0; i < patientList.length; i++) {
            if (patientList[i].status === 'Pending') {
                pending++;
            } else if (patientList[i].status === 'Admitted') {
                admitted++;
            }
        }

        var totalElement = document.getElementById('totalPatients');
        var pendingElement = document.getElementById('pendingPatients');
        var admittedElement = document.getElementById('admittedPatients');

        if (totalElement !== null) totalElement.textContent = total;
        if (pendingElement !== null) pendingElement.textContent = pending;
        if (admittedElement !== null) admittedElement.textContent = admitted;
    }

    function renderTable(patientList) {
        if (tableBody === null) {
            return;
        }

        tableBody.innerHTML = '';

        if (patientList.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No patients found.</td></tr>';
            return;
        }

        var rowsHTML = '';
        for (var i = 0; i < patientList.length; i++) {
            var patient = patientList[i];
            
            var actionButtonHTML = '';
            if (patient.status === 'Pending') {
                actionButtonHTML = '<button class="btn-admit" onclick="admitPatient(' + patient.id + ')">Admit</button>';
            } else if (patient.status === 'Admitted') {
                actionButtonHTML = '<button class="btn-discharge" onclick="dischargePatient(' + patient.id + ')">Discharge</button>';
            }

            rowsHTML += '<tr>' +
                '<td><strong>' + patient.fname + '</strong></td>' +
                '<td>' + patient.lname + '</td>' +
                '<td>' + patient.email + '</td>' +
                '<td>' + patient.department + '</td>' +
                '<td>' + patient.symptoms + '</td>' +
                '<td>' + patient.status + '</td>' +
                '<td>' + actionButtonHTML + '</td>' +
            '</tr>';
        }

        tableBody.innerHTML = rowsHTML;
    }

    window.admitPatient = function(id) {
        for (var i = 0; i < patients.length; i++) {
            if (patients[i].id === id) {
                patients[i].status = 'Admitted';
                break;
            }
        }
        render(patients);
    };

    window.dischargePatient = function(id) {
        var updatedPatients = [];

        for (var i = 0; i < patients.length; i++) {
            if (patients[i].id !== id) {
                updatedPatients.push(patients[i]);
            }
        }

        patients = updatedPatients;
        render(patients);
    };

    if (searchInput !== null) {
        searchInput.addEventListener('input', function (e) {
            var query = e.target.value.toLowerCase().trim();
            var filteredPatients = [];

            for (var i = 0; i < patients.length; i++) {
                var p = patients[i];
                var fnameMatch = p.fname.toLowerCase().indexOf(query) !== -1;
                var lnameMatch = p.lname.toLowerCase().indexOf(query) !== -1;
                var emailMatch = p.email.toLowerCase().indexOf(query) !== -1;
                var deptMatch = p.department.toLowerCase().indexOf(query) !== -1;

                if (fnameMatch || lnameMatch || emailMatch || deptMatch) {
                    filteredPatients.push(p);
                }
            }

            render(filteredPatients);
        });
    }

    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn !== null) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = '../index.html';
        });
    }

    render(patients);
});