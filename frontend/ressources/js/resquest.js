const recupStorageAuth = sessionStorage.getItem('repAuth');
const recupUserId = JSON.parse(recupStorageAuth);

//function methode GET  (recuperation sans token)
async function request(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
};

//function methode GET  (recuperation avec token)
async function requestAuth(url) {
    let response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer' + ' ' + recupUserId.token }
    });
    let data = await response.json();
    return data;
};

// function method POST (envoie sans token)
async function send(url, datas) {
    let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datas)
    });
    let data2 = await response.json();
    return data2;
};

// function method POST (envoie avec token) JSON
async function send(url, datas) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + ' ' + recupUserId.token
        },
        body: JSON.stringify(datas)
    });
    let data2 = await response.json();
    return data2;
};

// function method POST (envoie avec token) FORMDATA
async function sendAuth(url, data) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer' + ' ' + recupUserId.token
        },
        body: data
    });
    let data3 = await response.json();
    return data3;
};

// function method DELETE (envoie avec token)
async function deleteAuth(url) {
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer' + ' ' + recupUserId.token
        }
    });
    let data = await response.json();
    return data;
};
// function method PUT (envoie avec token)
async function putAuth(url) {
    let response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer' + ' ' + recupUserId.token
        }
    });
    let data = await response.json();
    return data;
};