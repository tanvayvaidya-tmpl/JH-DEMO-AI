// const Blog = require('../models/blog');
const { response } = require('express');
const commonFunctions = require('../commonFunctions');
const jsonData = require('../sortedDeliData.json');

module.exports = {
  api: async (req, res) => {
    console.log(req.body.userQuery);
    console.log("hi");

    if (req.body.userQuery) {
      let userQuery = req.body.userQuery;

    
          
      let summarizationText = await commonFunctions.anythingLLMApi({workspace:"sorted", token:"4K656AJ-CT34AV9-KRKHQ3X-VF92Z4Z",userQuery:userQuery});
      console.log("summarizationText====", summarizationText)
      let newText = commonFunctions.convertToJson(summarizationText);

      let URLs = await commonFunctions.anythingLLMApiQuery({ workspace: "sortedshopurls", token: "4K656AJ-CT34AV9-KRKHQ3X-VF92Z4Z", userQuery: userQuery, summarizationText: newText.message })

      let foundUrlsInfo = [];

      if (URLs && Array.isArray(URLs)) {
        URLs.forEach(url => {
          const foundItem = jsonData.find(item => item.url === url);
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

      let object = {
        userQuery: userQuery,
        summarizationText: newText.message,
        products: foundUrlsInfo,
        followup: newText.followup,
        // URLs: URLs
      }
       return res.status(200).json(object)
     
    }
  },
};

// module.exports =blogController;
