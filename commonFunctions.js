module.exports = {
  anythingLLMApi: async (Props) => {
    let workspace = Props.workspace;
    let token = Props.token;
    let userQuery = Props.userQuery;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      message: userQuery,
      mode: "chat",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const responce = await fetch(
      "http://localhost:3001/api/v1/workspace/" + workspace + "/chat",
      requestOptions
    );
    data = await responce.json();

    return data.textResponse;
  },


  anythingLLMApiQuery: async (Props) => {
    let workspace = Props.workspace;
    let token = Props.token;
    let userQuery = Props.userQuery;
    let summarizationText = Props.summarizationText;

    let LLMquery = 'Based on the user query below and the summarisation text provided below give an array of at most 4 URLs that corresponds to them in the format: ["url", "url", "url"] only return the URLs and only if they exist. Only return array and nothing else.' + '\n user Query: '+userQuery+ '\n summarizationText: ' + summarizationText

    console.log(LLMquery)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      message: LLMquery,
      mode: "query",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const responce = await fetch(
      "http://localhost:3001/api/v1/workspace/" + workspace + "/chat",
      requestOptions
    );
    data = await responce.json();
    // console.log(data)
    let URLArray = await JSON.parse(data.textResponse)
    return URLArray;
  },

  OllamaApi: async (Props) => {
    let model = Props.model;
    let userQuery = Props.userQuery;
    let summarizationText = Props.summarizationText;

    let LLMquery = 'based on the user query below and the summarization text provided below give an array of at most 8 URLs that corresponds to them in the format [ "url","url","url","url"]' + '\n user Query: '+userQuery+ '\n summarizationText: ' + summarizationText

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      model: model,
      prompt: LLMquery,
      stream: false,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const responce = await fetch("http://127.0.0.1:11434/api/generate", requestOptions)
    
    const  data = await responce.json();
    console.log(data)
    let URLText = data.response
   let URLArray = await JSON.parse(URLText)

    return (URLArray)
  },
  convertToJson: (string) => {
  return JSON.parse(string);
}
};
