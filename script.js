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

        let binaryNumber = window.prompt(`Digite o bit de número ${count + 1}`);
        binaryValues.push(Number(binaryNumber));

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

function sendBits() {

    let redundancyBits = 1;
    let redundancyBitsArray = [];
    let hammingCode = [];
    let originalBitIndex = 0;

    const paragraphTag = document.createElement("p");

    paragraphTag.innerHTML = `Dados originais: ${binaryValues.join('')}`;
    document.getElementById("infosContainer").appendChild(paragraphTag);

    while(binaryValues.length > 2**redundancyBits - redundancyBits - 1) {
        redundancyBits++;
    }

    let totalBits = binaryValues.length + redundancyBits;

    for(let count = 0; count < redundancyBits; count++) {

        let indexOfRedundancyBit = 2**count;
        redundancyBitsArray.push(indexOfRedundancyBit);

    }

    for(let count = 0; count < totalBits; count++) {

        if(redundancyBitsArray.includes(count + 1)) {

            hammingCode[count] = '?';

        } else {

            hammingCode[count] = binaryValues[originalBitIndex];
            originalBitIndex ++;

        }

    }

    hammingCode.forEach((element, index) => {
        
        if(element === '?') {

            let slicedHamming = hammingCode.slice(index + 1, hammingCode.length);
            let parity = 0;

            console.log(slicedHamming);

        }

    })

}

function verifyBits() {

    console.log(binaryValues);

}



