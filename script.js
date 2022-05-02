const select = document.getElementById("selectOption");
const input = document.getElementById("bitsInput");
const infosContainer = document.getElementById("infosContainer")
const paragraphInsertedData = document.createElement("p");
const paragraphSendedData = document.createElement("p");

var binaryValues = []; //array para armazenar os valores inseridos
var option; //armazena a opção escolhida

select.addEventListener("change", function handleSelectedOption(event) { //mostra o campo de texto ao selecionar a opção desejada

    option = event.target.value;
    document.getElementById("inputContainer").style.display = "flex";
    infosContainer.style.display = "none";

});

input.addEventListener("keypress", function (event) { //ativa o botão também ao usar a tecla enter

    if (event.key === "Enter") {

        document.getElementById("btnInput").click();

    }

});

function getBits() { //função para armazenar os bits separados em um array

    const enteredValue = document.getElementById("bitsInput").value; //pega o valor inserido no campo de texto

    if (!enteredValue.match(/[^10]/)) { //expressão regular para negar qualquer valor diferente de 0 ou 1

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

function sendBits(insertedBits) { //função para gerar os bits

    let redundancyBits = 1;
    let redundancyBitsArray = [], hammingCode = [];
    let originalBitIndex = 0;

    binaryValues = insertedBits.split(""); //separa os bits da string e armazena no array

    while (binaryValues.length > 2 ** redundancyBits - redundancyBits - 1) { //pega a quantidade de bits redundantes

        redundancyBits++;

    }

    let totalBits = binaryValues.length + redundancyBits; //soma dos bits totais

    for (let count = 0; count < redundancyBits; count++) { //array com a posição dos bits de redundância

        let indexOfRedundancyBit = 2 ** count;
        redundancyBitsArray.push(indexOfRedundancyBit);

    }

    for (let count = 0; count < totalBits; count++) { //adiciona '?' no lugar dos bits de redundância e preenche com os outros valores dos bits iniciais

        if (redundancyBitsArray.includes(count + 1)) {

            hammingCode[count] = '?';

        } else {

            hammingCode[count] = binaryValues[originalBitIndex];
            originalBitIndex++;

        }

    }

    for (let countRedundancy = 0; countRedundancy < redundancyBits; countRedundancy++) { //loop para o calculo de paridade a partir de cada bit redundante

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

    if (option == '1') { //se a opção escolhida for a de gerar o código, cria os elementos abaixo no html

        paragraphInsertedData.innerHTML = `Dados originais: ${input.value}`;
        document.getElementById("infosContainer").appendChild(paragraphInsertedData);

        paragraphSendedData.innerHTML = `Dados que serão inseridos: ${hammingCode.join('')}`;
        infosContainer.appendChild(paragraphSendedData);
        infosContainer.style.display = "flex";

    }

    return hammingCode;

}

function verifyBits(insertedBits) {

    let i = 1;
    let code = [], controlBitsIndexes = [], redundancyBitsArray = [], reverseIndexPosition = [];

    binaryValues = insertedBits.split("").reverse() //separa os bits e coloca em um array com a posição invertida

    while (binaryValues.length / i >= 1) { //pega a posição dos bits redundantes

        controlBitsIndexes.push(i);
        i *= 2;

    }

    for(n = 0; n <= controlBitsIndexes.length - 1; n++) { //loop para verificação da paridade e correção caso haja erro

        let position = binaryValues.length - 2**n;
        reverseIndexPosition.push(binaryValues.length - 2**n);

        if(reverseIndexPosition.includes(position)) {

            count = 0;
            parity = 0;

            while(position >= 0) {

                if(count < 2**n) {

                    if(binaryValues[position] == '1') {
                        parity++;
                    }

                    position--;
                    count++;

                } else {

                    while(count != 0) {
                        position--;
                        count--;
                    }
                   
                }

            }

            if(parity%2 == 0) {

                redundancyBitsArray.push('0')

            } else {

                redundancyBitsArray.push('1')

            }

        }

    }

    redundancyBitsArray = redundancyBitsArray.reverse() //revertendo novamente para a sequência correta
    indexOfErrorBit = parseInt(redundancyBitsArray.join(""), 2); //pega a posição do bit com erro transformando os valores de bits de redundância obtidos de binário para decimal

    binaryValues.reverse().forEach((element, index) => { //troca o valor do bit errado

        if(index == indexOfErrorBit) {

            if(element == '1') {

                binaryValues[index - 1] = '0'

            } else if(element == '0') {

                binaryValues[index - 1] = '1'

            }

        }

    })

    for(let index = 0; index < binaryValues.length; index++) { //array final com os bits corretos

        if (!controlBitsIndexes.includes(index + 1)) {

           code.push(binaryValues[index]);

        }

    }

    if (option == '2' && indexOfErrorBit != 0) { //cria no html se tiver erro

        paragraphInsertedData.innerHTML = `Foi detectado um erro no bit de número ${indexOfErrorBit} do grupo: ${insertedBits}`;
        document.getElementById("infosContainer").appendChild(paragraphInsertedData);

        paragraphSendedData.innerHTML = `Grupo de bits finais com o bit corrigido: ${code.join('')}`;
        infosContainer.appendChild(paragraphSendedData);
        infosContainer.style.display = "flex";

    } else { //cria no html se não tiver erro

        paragraphInsertedData.innerHTML = `Não foi detectado nenhum erro no grupo: ${insertedBits}`;
        document.getElementById("infosContainer").appendChild(paragraphInsertedData);

        infosContainer.style.display = "flex";

    }

}



