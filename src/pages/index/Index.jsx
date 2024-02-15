import React from "react";
import "./Index.css";
import Header from "../../components/header/Header";
import Box from "../../components/box/Box";
import Button from "../../components/button/Button";
// import { apiAnalyze, apiModels } from "../../connections/api";
export default function Index() {
    const apikey = sessionStorage.getItem('apikey');
    var responseJsonParam;

    requestApi(apikey)

    async function requestApi(apikey) {
        const headers = new Headers();
        headers.append("Authorization", `Basic ${apikey}`);
        const options = {
            method: 'GET',
            redirect: 'follow',
            headers: headers
        }

        const response = await fetch('https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/v1/models?version=2022-04-07', options)
        const responseJson = await response.json()
        console.log(responseJson.models[0].version_description)
        changeSelect(responseJson)
        responseJsonParam = responseJson;
    }

    function changeSelect(responseJson) {
        var selectElement = document.getElementById("models");
        for (var i = 0; i < selectElement.options.length; i++) {
            selectElement.options[i].textContent = `${responseJson.models[i].version_description}`;

        }
    }

    function processFile() {
        var fileInput = document.getElementById("arquivo");
        var outputDiv = document.getElementById("output");
        var nameFileDiv = document.getElementById("nameFile");

        if (fileInput.files.length > 0) {
            var selectedFile = fileInput.files[0];
            var name = fileInput.files[0].name;
            nameFileDiv.innerHTML = "Arquivo selecionado: " + name;

            if (selectedFile.type === "text/plain") { // Verifica se o arquivo é do tipo texto
                var reader = new FileReader();

                reader.onload = function (event) {
                    var fileText = event.target.result; // Obtém o conteúdo do arquivo como texto
                    apiAnalyze(responseJsonParam, fileText)
                    outputDiv.innerHTML = "Texto do arquivo: <br>" + fileText;

                    // Agora você pode armazenar 'fileText' em uma variável ou realizar qualquer outra ação desejada com ele.
                };

                reader.readAsText(selectedFile); // Lê o arquivo como texto
            } else {
                outputDiv.innerHTML = "Selecione um arquivo de texto (.txt).";
            }
        } else {
            outputDiv.innerHTML = "Nenhum arquivo selecionado.";
        }
    }

    function apiAnalyze(responseJson, text) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Basic ${apikey}`);

        var raw = JSON.stringify({
            "text": `${text}`,
            "features": {
                "categories": {
                    "limit": 5
                },
                "entities": {
                    "sentiment": true,
                    "limit": 1,
                    "model": `${responseJson.models[0].model_id}`
                },
                "relations": {
                    "model": `${responseJson.models[0].model_id}`
                }
            }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/v1/analyze?version=2022-04-07", requestOptions)
            .then(response => response.json())
            .then(result => show(result))
            .catch(error => console.log('error', error));

    }

    function show(result) {
        var container = document.getElementById("text");
        container.innerHTML = "";

        for (let i = 0; i < result.relations.length; i++) {
            for (let j = 0; j < result.relations[i].arguments.length; j++) {

                var label = document.createElement("label");
                label.innerHTML = result.relations[i].arguments[j].entities[0].type;

                var input = document.createElement("input");
                input.type = "text";
                input.value = result.relations[i].arguments[j].text;

                container.appendChild(label);
                container.appendChild(input);

                container.appendChild(document.createElement("br"));

                console.log(result.relations[i].arguments[j].entities[0].type); //Label
                console.log(result.relations[i].arguments[j].text); //Input
            }
        }

    }

    return (
        <>
            <div>
                <div className="header">
                    <Header></Header>
                </div>
                <div className="boxes">
                    <Box>
                        <div className="boxText">
                            <div id="nameFile"></div>
                            <div id="output"></div>
                        </div>
                    </Box>
                    <div className="functions">
                        <div className="changes">
                            <div className="models">
                                <p>Selecione o modelo:</p>
                                <select name="" id="models">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div className="inputFile">
                                <p>Selecione o arquivo:</p>
                                <form action="">
                                    <label htmlFor="arquivo">Escolha o arquivo</label>
                                    <input type="file" name="arquivo" id="arquivo" accept=".txt" />
                                </form>
                            </div>
                        </div>
                        <div className="fixed">
                            <div className="buttonSend">
                                <Button className={"btnIndex"} nameButton={"Processar Arquivo"} click={processFile}></Button>
                            </div>
                        </div>
                    </div>
                    <Box>
                        <div className="text" id="text">
                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}