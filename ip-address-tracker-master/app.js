"use strict"

document.addEventListener('DOMContentLoaded', async () => {

    let userIpAddres = await getUserIP();
    let userCoords = await getCoords(userIpAddres);

    let latitude = userCoords.latitude;
    let longitude = userCoords.longitude;

    // map visualizaition
    var map = L.map('map', { zoomControl: false }).setView([latitude,longitude], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([latitude,longitude]).addTo(map);

    // form sending
    const formBtn = document.querySelector('.form-btn');

    formBtn.addEventListener('click', formSend);

    async function formSend(event) {
        event.preventDefault();

        let error = formValidate();
        let ipAddress = document.querySelector('input').value;

        if(error === 0){
            let mainUserInformation = await fetchIpData(ipAddress);
            userCoords = await getCoords(ipAddress);

            document.querySelector('.ip-address').innerHTML = ipAddress;
            document.querySelector('.location').innerHTML = mainUserInformation.city + ", " + mainUserInformation.region;
            document.querySelector('.utc').innerHTML = mainUserInformation.timezone;
            document.querySelector('.isp').innerHTML = mainUserInformation.org;

            latitude = userCoords.latitude;
            longitude = userCoords.longitude;

            updateMap(latitude, longitude);
        }
        else{
            console.log('Error in form validation!');
        }
    }

    function formValidate(){
        let error = 0;
        let requiredInput = document.querySelector('input');

        formRemoveError(requiredInput);

        if(!ipCheck(requiredInput.value)){
            error++;
            formAddError(requiredInput);
        }

        return error;
    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function ipCheck(ipAddress) {
        // Regular expression to check IPv4 address
        var ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

        // Check IP address against the regular expression
        return ipFormat.test(ipAddress);
    }

    async function fetchIpData(ipAddress){
        let url = `https://ipapi.co/${ipAddress}/json/`;
        let response = await fetch(url);
        let dataJSON;

        if(response.ok){
            dataJSON = await response.json();
        } 
        
        return dataJSON;
    }

    async function getCoords(ipAddress){
        let targetUrl = `https://ipapi.co/${ipAddress}/json/`;
        let coordsResponse = await fetch(targetUrl);
        let dataCoordsJSON;

        if(coordsResponse.ok){
            dataCoordsJSON = await coordsResponse.json();
        }
        else{
            console.log("Failed getting coords!");
        }

        return dataCoordsJSON;
    }

    function updateMap(latitude, longitude) {
        map.setView([latitude, longitude], 15);
        marker.setLatLng([latitude, longitude]);
    }

    async function getUserIP() {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();

        return data.ip;
    }

});
