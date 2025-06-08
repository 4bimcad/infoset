function updateName() {
    let name = document.getElementById('nameInput').value;
    document.getElementById('namePreview').firstChild.textContent = name + " "; 
}

function updateSurname() {
    let surname = document.getElementById('surnameInput').value;
    document.getElementById('surnamePreview').textContent = surname; 
}


function updateOccupation() {
    document.getElementById('occupationPreview').textContent = document.getElementById('occupationInput').value;
}

function updateContacts() {
    document.getElementById('contactsPreview').textContent = document.getElementById('contactsInput').value;
}

function updateProfsumtitle() {
    document.getElementById('profsumtitlePreview').textContent = document.getElementById('profsumtitleInput').value;
}

function updateProfsumtext() {
    document.getElementById('profsumtextPreview').textContent = document.getElementById('profsumtextInput').value;
}

function updateWorkhistorytitle() {
    document.getElementById('workhistorytitlePreview').textContent = document.getElementById('workhistorytitleInput').value;
}

function updatetitleEducation() {
    document.getElementById('educationtitlePreview').textContent = document.getElementById('educationtitleInput').value;
}

function updatetitleCertification() {
    document.getElementById('certificationtitlePreview').textContent = document.getElementById('certificationtitleInput').value;
}

function updatetitleProjects() {
    document.getElementById('projectstitlePreview').textContent = document.getElementById('projectstitleInput').value;
}




