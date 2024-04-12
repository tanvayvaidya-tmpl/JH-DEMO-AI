// const Blog = require('../models/blog');
const { response } = require('express');
const commonFunctions = require('../commonFunctions');

module.exports = {
  api: async (req, res) => {

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
          workspaceObject.first = 'sorted-chroma-db';
          workspaceObject.second = 'sorted-all-urls';
          break;
        case "JamesHardie":
          workspaceObject.first = 'james-hardie-data';
          workspaceObject.second = 'james-hardie-urls';
          break;
        default:
          break;
      }
    }

    if (req.body.userQuery) {
      let userQuery = req.body.userQuery;

      let summarizationText = await commonFunctions.anythingLLMApi({ workspace: workspaceObject.first, token: "RECYBCY-AYBM728-J0CWTQQ-WW2H84G", userQuery: userQuery, client: req.body.clientId });
      let newText = commonFunctions.convertToJson(summarizationText);

      let URLs = await commonFunctions.anythingLLMApiQuery({ workspace: workspaceObject.second, token: "RECYBCY-AYBM728-J0CWTQQ-WW2H84G", userQuery: userQuery, summarizationText: newText.message })

      console.log(URLs, "----URLS----")

      let productUrls = await commonFunctions.findUrls(URLs, req.body.clientId);

      let object = {
        userQuery: userQuery,
        summarizationText: newText.message,
        products: productUrls,
        followup: newText.followup,
        URLs: URLs
      }
      return res.status(200).json(object)

    }
  },
};

// module.exports =blogController;
