// import axios from "axios";

// const apikey = sessionStorage.getItem('apiKey');

// var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", `Basic YXBpa2V5OlhKMWlaTThRbHN0WFhJbmQ5OWNJV2N2cjE3YTJtNWtqdTVXSlBFbkRHaXFp`);
//     myHeaders.append("Accept", "*/*");
//     myHeaders.append("Connection", "keep-alive")

// export const apiAnalyze = axios.create({
//     baseURL: "https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/v1/analyze?version=2022-04-07",
//     method: 'POST',
//     headers: myHeaders,
//     // body: raw,
//     redirect: 'follow'
// })

// export const apiModels = axios.create({
//     baseURL: "https://api.eu-de.natural-language-understanding.watson.cloud.ibm.com/v1/models?version=2022-04-07",
//     redirect: 'follow',
//     mode: 'no-cors',
//     headers: myHeaders
// })