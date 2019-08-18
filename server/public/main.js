const socket = io();


socket.on('temp', function (data) {
    console.log(data);
    let temp = document.getElementById('t');
    temp.innerHTML = `Temperatura: ${data}°C`;
});