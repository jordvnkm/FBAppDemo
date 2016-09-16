

const InsightApiUtil = {
  fetchPageInsights: function(pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, function(access) {
      let token = access.access_token;
      let viewsUrl = `${pageId}/insights/page_views_total`;
      FB.api( viewsUrl, {access_token: token}, (viewsResponse) =>{
        if (!viewsResponse )
          errorCB("ERROR Occured");
        else if (viewsResponse.error){
          errorCB(viewsResponse);
        }
        else {
          let fansUrl = `${pageId}/insights/page_fans`
          FB.api( fansUrl, {access_token: token}, (fansResponse) =>{
            if (!fansResponse )
              errorCB("ERROR Occured");
            else if (fansResponse.error){
              errorCB(fansResponse);
            }
            else {
              let engagedUrl = `${pageId}/insights/page_engaged_users`
              FB.api(engagedUrl, {access_token: token}, (engagedResponse) => {
                if (!engagedResponse )
                  errorCB("ERROR Occured");
                else if (engagedResponse.error){
                  errorCB(engagedResponse);
                }
                else {
                  let data = {pageId: pageId, insights: [viewsResponse, fansResponse, engagedResponse]}
                  successCB(data);
                }
              });
            }
          });
        }
      });
    }.bind(this));
  }
};


module.exports = InsightApiUtil;
