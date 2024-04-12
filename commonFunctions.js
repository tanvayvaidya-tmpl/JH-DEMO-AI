const sortedData = require('./sortedDeliData.json');
const tunicaData = require('./tunicaData.json');
const jhData = require('./JamesHardieProductData.json')


module.exports = {
  anythingLLMApi: async (Props) => {
    let workspace = Props.workspace;
    let token = Props.token;
    let userQuery = Props.userQuery;
    let client = Props.client;

    let queryAddition = `- Provide response in format specified in the object: /n { “message”: “Response to the above question, only the response of at least 100 words”, “followup”: [<An array of at least three follow-up questions related to the current question that the user might ask, return only questions> ] } REMEMBER: Only provide response in the object format provided above. Answer as if you are ` + client + ` itself.`

    var myHeaders = {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    };

    var raw = JSON.stringify({
      message: userQuery + queryAddition,
      mode: "query",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const responce = await fetch(
      "http://192.168.1.48:3001/api/v1/workspace/" + workspace + "/chat",
      requestOptions
    );
    data = await responce.json();

    console.log(data, "------data------")

    return data.textResponse;
  },


  anythingLLMApiQuery: async (Props) => {
    let workspace = Props.workspace;
    let token = Props.token;
    let userQuery = Props.userQuery;
    let summarizationText = Props.summarizationText;

    let LLMquery = 'user Query: ' + userQuery + '\n summarizationText: ' + summarizationText + '\n Based on the user query and the summarization text provided above give an array of at most 4 URLs that corresponds to them in the format: [“url 1”, “url 2”, “url 3”]. I only want an array not explanation'

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
      "http://192.168.1.48:3001/api/v1/workspace/" + workspace + "/chat",
      requestOptions
    );
    data = await responce.json();
    console.log(data, "-----data----")
    let URLArray = [];
    try {
      URLArray = JSON.parse(data.textResponse);
      return URLArray;
    } catch (error) {
      return [];
    }
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
        {
          "title": "Vodafone Oman  Together we can  Tunica Tech",
          "url": "https://www.tunica.tech/projects/vodafone-oman-together-we-can",
          "image": "",
          "product": "Vodafone Oman",
          "productDescription": "",
          "productImg": "https://res.cloudinary.com/tmplwebsite/image/upload/v1636696270/Vodafone_Oman_Banner_7fb74dbd1f.webp"
        },
        {
          "title": "Purl – Shorten your links with Purl  Tunica Tech",
          "url": "https://www.tunica.tech/projects/purl",
          "image": "",
          "product": "Purl",
          "productDescription": "",
          "productImg": "https://res.cloudinary.com/tmplwebsite/image/upload/v1636692800/Purl_Banner_5071240170.webp"
        },
        ]
        break;
      case "Sorted":
        // Change jsonData to sortedData or any other source specific to Sorted client
        clientSpecificData = sortedData;
        defaultData = [{
          "title": "Spinach Roti  Grain Free | Gluten Free | Only 25gms Net Carbs  Sorted",
          "url": "https://www.sorteddeli.com/shop/spinach-roti-pack-of-5/",
          "image": "",
          "product": "Spinach Roti – Grain Free | Gluten Free | Only 25gms Net Carbs",
          "productDescription": "Add Greens to your diet with the Sorted Spinach Roti A Gluten Free Grain Free and Guilt Free Roti that is a great replacement to Palak Paratha and Wheat Rotis Not that just it is also perfect for Keto and Paleo Diet along with many more",
          "productImg": "https://www.sorteddeli.com/wp-content/uploads/2021/09/spinach-roti-1-445x445.jpg"
        },
        {
          "title": "Buckwheat Pizza Crust 10\"  Sorted",
          "url": "https://www.sorteddeli.com/shop/buckwheat-pizza-crust-10-pack-of-3/",
          "image": "",
          "product": "Buckwheat Pizza Crust 10″",
          "productDescription": "Sorted Buckwheat Pizza Crust | The best Gluten Free Pizza Crust for Starters | Tastes the same at Whole Wheat Pizza with No Gluten and definitely no guilt",
          "productImg": "https://www.sorteddeli.com/wp-content/uploads/2021/09/buckwheat-crust-445x445.jpg"
        }]
        break;
      case "JamesHardie":
        // Change jsonData to sortedData or any other source specific to Sorted client
        clientSpecificData = jhData;
        defaultData = [
          {
            "title": "James Hardie™ Architectural Collection: Elevate Your Design",
            "url": "https://www.jameshardie.com.au/hardie-architectural-collection",
            "product": "Hardie™ Architectural Collection",
            "productDescription": "",
            "productImg": "https://images.ctfassets.net/rg5y8r6t6cjr/1gfourTo5bVVRWDER4nRGE/3ac36a2dc7bef7d6de8861aa23669be1/brushed-concrete-axon-boxmodern-__6_.webp"
          },
          {
            "title": "Hardie Oblique Cladding for Modern Farm House Design | James Hardie",
            "url": "https://www.jameshardie.com.au/productrange/hardie-oblique-cladding",
            "product": "Hardie™ Oblique™ Cladding",
            "productDescription": "A fresh slant on modern home design",
            "productImg": "https://images.ctfassets.net/rg5y8r6t6cjr/rAVZ0Dwf0feCiLkDY5b6I/4db6e91aa274930772ec00efec1b8b3a/oblique-cladding-barn-jameshardie-4.jpg"
          }
        ]
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

    if (!foundUrlsInfo.length) {
      foundUrlsInfo = defaultData;
    }

    return foundUrlsInfo || [];
  }
};
