import axios from "axios";

function sendData(){
    axios.post('http://localhost:3000/api/data', {
        timestamp: new Date(),
        value: Math.random()
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
      
    setTimeout(sendData, 10000);
}

sendData();