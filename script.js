const select = document.getElementById("selectOption");
var binaryValues = [];
var option;

select.addEventListener("change", function handleSelectedOption(event) {

    option = event.target.value;
    document.getElementById("inputContainer").style.display = "flex";

})

function getBits() {

    const enteredValue = document.getElementById("bitsInput").value;
    binaryValues = enteredValue.split("");

    switch (option) {

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

    const paragraphInsertedData = document.createElement("p");
    const paragraphSendedData = document.createElement("p");

    paragraphInsertedData.innerHTML = `Dados originais: ${binaryValues.join('')}`;
    document.getElementById("infosContainer").appendChild(paragraphInsertedData);

    while (binaryValues.length > 2 ** redundancyBits - redundancyBits - 1) {
        redundancyBits++;
    }

    let totalBits = binaryValues.length + redundancyBits;

    for (let count = 0; count < redundancyBits; count++) {

        let indexOfRedundancyBit = 2 ** count;
        redundancyBitsArray.push(indexOfRedundancyBit);

    }

    for (let count = 0; count < totalBits; count++) {

        if (redundancyBitsArray.includes(count + 1)) {

            hammingCode[count] = '?';

        } else {

            hammingCode[count] = binaryValues[originalBitIndex];
            originalBitIndex++;

        }

    }

    for (let countRedundancy = 0; countRedundancy < redundancyBits; countRedundancy++) {

        let position = Math.pow(2, countRedundancy);
        let parity = 0;
        let s = position - 1;

        while (s < totalBits) {

            for (let j = s; j < s + position; j++) {

                if (hammingCode[j] == '1') {
                    parity++;
                }

            }
            
            s = s + 2 * position;

        }

        if (parity % 2 == 0) {

            hammingCode[position - 1] = '0';

        } else {

            hammingCode[position - 1] = '1';

        }
    }

    let infosContainer = document.getElementById("infosContainer")

    paragraphSendedData.innerHTML = `Dados que serão inseridos: ${hammingCode.join('')}`;
    infosContainer.appendChild(paragraphSendedData);
    infosContainer.style.display = "flex";


}



function verifyBits() {

    console.log(binaryValues);

}



