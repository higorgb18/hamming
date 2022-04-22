const select = document.getElementById("selectOption");
var binaryValues = [];
var option;

select.addEventListener("change", function handleSelectedOption(event) {

    option = event.target.value;
    document.getElementById("inputContainer").style.display = "flex";

    switch(option) {

        case "1":
            document.getElementById("bitsInput").placeholder = "Digite a quantidade de bits do grupo original";
        break;
        
        case "2":
            document.getElementById("bitsInput").placeholder = "Digite a quantidade de bits que foram recebidos";
        break;
    
    }

})

function getBits() {

    const enteredValue = document.getElementById("bitsInput").value;
    binaryValues = [];

    for(let count = 0; count < enteredValue; count++) {

        let binaryNumber = window.prompt(`Digite o número ${count + 1}`);
        binaryValues.push(binaryNumber);

    }

    switch(option) {

        case "1":
            sendBits();
        break;
        
        case "2":
            verifyBits();
        break;
    
    }

}

function test() {

    console.log(binaryValues);
    
}

function sendBits() {

    const paragraphTag = document.createElement("p");

    paragraphTag.innerHTML = `Dados originais: ${binaryValues.join('')}`;
    document.getElementById("infosContainer").appendChild(paragraphTag);

}

function verifyBits() {

    console.log(binaryValues);

}



