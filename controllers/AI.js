// const Blog = require('../models/blog');
const { response } = require('express');
const commonFunctions = require('../commonFunctions');

module.exports = {
  api: async (req, res) => {
    console.log(req.body.userQuery);
    console.log("hi");

    if (req.body.userQuery) {
      let userQuery = req.body.userQuery;

    
          
      let summarizationText = await commonFunctions.anythingLLMApi({workspace:"sorted-2", token:"1RNFA0J-Q00MFDD-ND9BBHY-W3JH3SQ",userQuery:userQuery});

      console.log("summarizationText====", summarizationText)
      let URLs = await commonFunctions.anythingLLMApiQuery({workspace:"sorted-urls", token:"1RNFA0J-Q00MFDD-ND9BBHY-W3JH3SQ", userQuery:userQuery, summarizationText:summarizationText })

      let object = {
        userQuery : userQuery,
        summarizationText: summarizationText,
        URLs : URLs
      }
       return res.status(200).json(object)
     
    }
  },
};

// module.exports =blogController;
