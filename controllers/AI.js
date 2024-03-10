// const Blog = require('../models/blog');
const { response } = require('express');
const commonFunctions = require('../commonFunctions');

module.exports = {
  api: async (req, res) => {
    console.log(req.body.userQuery);
    console.log("hi");

    let workspaceObject = {
      first: 'sorted',
      second: 'sortedshopurls'
    };

    if (req.body.clientId) {
      switch (req.body.clientId) {
        case "Tunica":
          workspaceObject.first = 'tunica';
          workspaceObject.second = 'tunicaurls';
          break;
        case "Sorted":
          workspaceObject.first = 'sorted';
          workspaceObject.second = 'sortedshopurls';
          break;
        default:
          break;
      }
    }

    if (req.body.userQuery) {
      let userQuery = req.body.userQuery;
          
      let summarizationText = await commonFunctions.anythingLLMApi({ workspace: workspaceObject.first, token:"4K656AJ-CT34AV9-KRKHQ3X-VF92Z4Z",userQuery:userQuery});
      console.log("summarizationText====", summarizationText)
      let newText = commonFunctions.convertToJson(summarizationText);

      let URLs = await commonFunctions.anythingLLMApiQuery({ workspace: workspaceObject.second, token: "4K656AJ-CT34AV9-KRKHQ3X-VF92Z4Z", userQuery: userQuery, summarizationText: newText.message })

      let productUrls = await commonFunctions.findUrls(URLs, req.body.clientId);

      let object = {
        userQuery: userQuery,
        summarizationText: newText.message,
        products: productUrls,
        followup: newText.followup,
        // URLs: URLs
      }
       return res.status(200).json(object)
     
    }
  },
};

// module.exports =blogController;
