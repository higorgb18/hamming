const select = document.getElementById("selectOption");
const input = document.getElementById("bitsInput");
const infosContainer = document.getElementById("infosContainer")
const paragraphInsertedData = document.createElement("p");
const paragraphSendedData = document.createElement("p");

var binaryValues = [];
var option;

select.addEventListener("change", function handleSelectedOption(event) {

    option = event.target.value;
    document.getElementById("inputContainer").style.display = "flex";

});

input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        document.getElementById("btnInput").click();

    }

});

function getBits() {

    const enteredValue = document.getElementById("bitsInput").value;

    if (!enteredValue.match(/[^10]/)) {

        switch (option) {

            case "1":
                sendBits(enteredValue);
                break;

            case "2":
                verifyBits(enteredValue);
                break;

        }

    } else {

        window.alert("A entrada deve ser apenas com números binários (0 ou 1)")

    }

}

function sendBits(insertedBits) {

    let redundancyBits = 1;
    let redundancyBitsArray = [];
    let hammingCode = [];
    let originalBitIndex = 0;

    binaryValues = insertedBits.split("");

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

    if (option == '1') {

        paragraphInsertedData.innerHTML = `Dados originais: ${input.value}`;
        document.getElementById("infosContainer").appendChild(paragraphInsertedData);

        paragraphSendedData.innerHTML = `Dados que serão inseridos: ${hammingCode.join('')}`;
        infosContainer.appendChild(paragraphSendedData);
        infosContainer.style.display = "flex";

    }

    return hammingCode;

}

function verifyBits(insertedBits) {

    binaryValues = insertedBits.split("");

    let parity = 0;
    let code = []
    let controlBitsIndexes = [];
    let i = 1;

    for (let mask = 4; mask >= 1; mask--) {

        for (let bit = 1; bit <= binaryValues.length; bit++) {

            if (bit & mask) {

                if (binaryValues[binaryValues.length - bit] == '1') {

                    parity ^= mask;
                    
                }

            }

        }

    }

    let indexOfErrorBit = binaryValues.length - parity;

    while (binaryValues.length / i >= 1) {

        controlBitsIndexes.push(i);
        i *= 2;

    }

    binaryValues.forEach((element, index) => {

        if(index == indexOfErrorBit) {

            if(element == '1') {

                binaryValues[index - 1] = '0'

            } else if (element == '0') {

                binaryValues[index - 1] = '1'

            }

        }

    })

    for(let index = 0; index < 11; index++) {

        if(!controlBitsIndexes.includes(index + 1)) {

           code.push(binaryValues[index]);

        }

    }

    if (option == '2' && indexOfErrorBit != binaryValues.length) {

        paragraphInsertedData.innerHTML = `Foi detectado um erro no bit de número ${indexOfErrorBit} do grupo: ${insertedBits}`;
        document.getElementById("infosContainer").appendChild(paragraphInsertedData);

        paragraphSendedData.innerHTML = `Grupo de bits finais com o bit corrigido: ${code.join('')}`;
        infosContainer.appendChild(paragraphSendedData);
        infosContainer.style.display = "flex";

    } else {

        paragraphInsertedData.innerHTML = `Não foi detectado nenhum erro no grupo: ${insertedBits}`;
        document.getElementById("infosContainer").appendChild(paragraphInsertedData);

        infosContainer.style.display = "flex";

    }

}



