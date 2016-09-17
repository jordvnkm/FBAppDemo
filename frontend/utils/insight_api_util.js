

const InsightApiUtil = {

  fetchPageInsights: function(pageId, successCB, errorCB){
    FB.api(`${pageId}?fields=access_token`, (access)=>{
      let token = access.access_token;
      let url = `${pageId}/insights/page_views_total,page_engaged_users,page_fans`
      FB.api(url, {access_token: token, } , function(response){
        if (!response){
          errorCB("ERROR Occured");
        }
        else if (response.error){
          errorCB(response.error);
        }
        else {
          let data = {pageId: pageId, insights: response}
          successCB(data)
        }
      }.bind(this));
    })
  }
};


module.exports = InsightApiUtil;
