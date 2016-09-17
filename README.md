# Facebook Page Manager
Facebook page manager is an application to monitor and update pages owned by a Facebook user.  The application utilizes a lightweight representation of pages and posts to allow a user to interact with their target audience.

##Login
Facebook page manager utilizes the facebook login component to authenticate users. There is no need for a user table as facebook takes care of all the storage and authentication.  Users of the page manager need to grant the following permissions to the application:

  Public_profile
  Email
  Manage_pages
  Publish_actions
  Publish_pages
  Read_insights


## Home Page
Once a user has logged in using the login component, the application uses the following command to receive all the pages that the user manages.

![route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)

![route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)

The different pages are displayed and the user can click on a specific account to see further details.


## Page insights
When navigated to the account page, the application makes calls to the Facebook Graph Api to retrieve the account's feed.  The feed may be further filtered to only show the account's published or unpublished posts.

[route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)

Insight metrics are also retrieved using the Post/insights/metrics edge.  Currently, the following metrics are gathered once the component is mounted.  

[route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)

Additional metrics can replace or be added to the current metrics by simply changing the request url shown below:

[route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)



## Creating posts as Page or Individual
Users may create both published and unpublished posts using the page manager application.  All the user needs to do is click one of the "published" or "unpublished" radio buttons.  

[route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)

The user may also choose between posting the content in the voice of the Page they are managing or in voice of their own personal account.  When making the Graph api call, an additional request for the page access token is made if the POST request is made in the voice of the Page.

[route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)


## Publishing Photo / Video with Cloudinary
When creating posts, the user may choose to add a photo or video to their content.  The image or video is hosted on cloudinary and the url is then used as the file_url in the Graph api POST request.

[route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)

[route_form](https://github.com/jordvnkm/fitnessApp/blob/master/docs/route_form.png)

## Creating comments as Page or Individual


## Deleting posts


## Deleting comments




## Post Insights




## Real time updates with Pusher
