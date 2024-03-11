const sortedData = require('./sortedDeliData.json');
const tunicaData = require('./tunicaData.json');

module.exports = {
  anythingLLMApi: async (Props) => {
    let workspace = Props.workspace;
    let token = Props.token;
    let userQuery = Props.userQuery;

    var myHeaders = {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    };

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

    let LLMquery = 'Based on the user query below and the summarization text provided below give an array of at most 4 URLs that corresponds to them in the format: ["url 1", "url 2", "url 3"] only return the URLs and only if they exist. Remember the format of the response. Only return array and nothing else.' + '\n user Query: ' + userQuery + '\n summarizationText: ' + summarizationText

    console.log(LLMquery)

    var myHeaders = {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    };
  

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

  convertToJson: (string) => {
    return JSON.parse(string);
  },

  findUrls: async (urls, client) => {
    let foundUrlsInfo = [];
    let clientSpecificData = sortedData; // Assuming jsonData is the default data
    let defaultData = []

    // Adjust jsonData based on the client
    switch (client) {
      case "Tunica":
        // Change jsonData to tunicaData or any other source specific to Tunica client
        clientSpecificData = tunicaData;
        defaultData = [{
          "title": "James Hardie  Home design & products  Tunica Tech",
          "url": "https://www.tunica.tech/projects/james-hardie",
          "image": "",
          "product": "James Hardie",
          "productDescription": "",
          "productImg": "https://res.cloudinary.com/tmplwebsite/image/upload/v1636696533/James_Hardie_Banner_26eca2378f.webp"
        },
        {
            "title": "TimesPro  Tunica Tech",
            "url": "https://www.tunica.tech/projects/times-pro",
            "image": "",
            "product": "TimesPro",
            "productDescription": "",
            "productImg": "https://res.cloudinary.com/tmplwebsite/image/upload/v1699679636/Bannertimes_487e91fc67.webp"
        },
      ]
        break;
      case "Sorted":
        // Change jsonData to sortedData or any other source specific to Sorted client
        clientSpecificData = sortedData;
        break;
      default:
        break;
    }

    if (urls && Array.isArray(urls)) {
      urls.forEach(url => {
        const foundItem = clientSpecificData.find(item => item.url === url);
        if (foundItem) {
          foundUrlsInfo.push({
            url: url,
            title: foundItem.title,
            product: foundItem.product,
            productDescription: foundItem.productDescription,
            productImg: foundItem.productImg
          });
        }
      });
    }

    return foundUrlsInfo || [];
  }
};
