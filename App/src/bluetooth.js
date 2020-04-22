const serviceID="dd8c1400-3ae2-5c42-b8be-96721cd710fe";
const characteristicID ="dd8c1401-3ae2-5c42-b8be-96721cd710fe";
let button=document.getElementById('bluetooth');
let customChar;

button.addEventListener("click",() => {
    navigator.bluetooth.requestDevice({
        acceptAllDevices:true,
        optionalServices:["dd8c1400-3ae2-5c42-b8be-96721cd710fe"]
    })
        .then(device =>{
            device.addEventListener('gattserverdisconnected',disconnected);
            console.log(device.name);
            return device.gatt.connect();
        })
        .then(server => {
            console.log('got server');
            return server.getPrimaryService(serviceID);
         })
         .then(service => {
             console.log('got service');
             return service.getCharacteristic(characteristicID);
         })
         .then(characteristic => {
             console.log('got characteristic');
             customChar = characteristic;
             let buf = new Uint32Array(1);
             buf[0]=352321536;
             return characteristic.writeValue(buf);
         })
        .catch(error => {console.log(error);});
});

function disconnected(event){
    let device = event.target;
    console.log('Device ' +device.name+' is disconnected')
}

function sendValue(value) {
    let buffer = new Uint32Array(1);
    buffer[0]=value;
    customChar.writeValue(buffer);
}
