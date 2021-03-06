# Facebook Page Manager
Facebook page manager is a single page application to monitor and update pages owned by a Facebook user.  The application utilizes a lightweight representation of pages and posts to allow a user to interact with their target audience.  

The application uses a React/JavaScript front end, with a Rails backend.  The flux pattern is used to handle the flow of information between the stores, components, actions, Facebook api, and the dispatcher.

##Login
Facebook page manager utilizes the Facebook login component to authenticate users. There is no need for a user table as Facebook takes care of all the storage and authentication.  Users of the page manager need to grant the following permissions to the application:

```
  Public_profile
  Email
  Manage_pages
  Publish_actions
  Publish_pages
  Read_insights
```

## Home Page
Once a user has logged in using the login component, the application uses the following command to receive all the pages that the user manages.

![account_api_call](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/account_api_call.png)

The different pages are displayed and the user can click on a specific account to see further details.

![homepage](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/homepage.png)



## Page feed and insights
When navigated to the account page, the application makes calls to the Facebook Graph Api to retrieve the account's feed.  The feed may be further filtered to only show the account's published or unpublished posts.

![feed_options](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/feed_options.png)

Page insight metrics are also retrieved using the Page/insights/metrics edge.  Currently, the following metrics are gathered once the component is mounted.  

```
Page views total
Page engaged users
Page fans
```

Additional metrics can replace or be added to the current metrics by simply changing the request url shown below:

![page_insights_url](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/page_insights_url.png)



## Creating posts as Page or Individual
Users may create both published and unpublished posts using the page manager application.  All the user needs to do is click one of the "published" or "unpublished" radio buttons.  The api call's "published" parameter is set based on these radio buttons.

The user may also choose between posting the content in the voice of the Page they are managing or in voice of their own personal account.  When making the Graph api call, an additional request for the page access token is made if the POST request is made in the voice of the Page.

![post_published_radio](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/post_published_radio.png)

![page_access_req](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/page_access_req.png)

A user may also publish an unpublished post at a later date.  When viewing the Post's detail component, a "Publish" button will appear if the post is not already published.  Clicking on this button will trigger a POST request to update the post's is_published field to true.


## Publishing Photo / Video with Cloudinary
When creating posts, the user may choose to add a photo or video to their content.  The image or video is hosted on cloudinary and the url is then used as the file_url in the Graph api POST request.  The application checks to make sure that the file format is acceptable for the graph api POST request.  Currently the file formats that are accepted are :

Video: 3g2, 3gp, 3gpp, asf, avi, dat, divx, dv, f4v, flv, m2ts, m4v, mkv, mod, mov, mp4, mpe, mpeg, mpeg4, mpg, mts, nsv, ogm, ogv, qt, tod, ts, vob, and wmv.

Image: JPEG BMP PNG GIF TIFF

![cloudinary_upload](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/cloudinary_upload.png)

![file_url](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/file_url_upload.png)

## Creating comments as Page or Individual
Creating comments takes a similar approach to creating posts.  Depending on the user's choice, the comment may be posted in the voice of the Page or in the voice of the individual.  For a post in the Page's voice, all that is needed is an extra call to obtain the Page access token.

![comment_form](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/comment_form.png)


## Deleting posts and comments
To delete a post or comment, the user may click on the delete button which triggers a DELETE request to the Graph Api.  The Post deletion api call uses a DELETE request to {:postId} and the Comment deletion api call uses a DELETE request to {:commentId}


![delete_buttons](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/delete_buttons.png)


## Post Detail and Insights
When browsing through the a Page account, the user may choose to view a post's details.  This will take the user to the PostDetail component, which displays the post's content as well as the insights for that post. Post insights are gathered through the Post/insights/metrics edge. Currently, the following metrics are gathered for each post:

```
Post engaged users
Post video views
Post impressions
Post consumptions
```

Similarly to the Page insight metrics, the Post insight metrics can easily be changed by adapting the following url:

![post_insight_url](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/post_insight_url.png)

## Pagination
When a page requests posts from the Graph Api, the api responds with the 25 most recent posts.  The pagination url's are mapped to the feed that is requested.  For instance, when the published posts are requested, the pagination url's are kept in the PostStore.  To retrieve the next page of published posts, a PostStore.getPaging("published") method call is made.  The PageActions then uses that pagination url in an Ajax request to retrieve the next page of posts.

![pagination](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/pagination.png)


## Real time updates with Pusher
Facebook page manager utilizes Facebook's webhooks to receive real time updates.  Currently, the app subscribes to changes in a Pages feed, video, and picture changes.  These subscriptions can be updated or changed through Facebook's app dashboard as well as through a graph api call.  When an account page is mounted, it subscribes to that pages updates.  On unmounting, the account page unsubscribes to the updates so that the application does not make unnecessary api calls.

The webhook makes a GET request to "https://app-demo-fb.herokuapp.com/facebook" to verify the subscription.  Subsequent POST requests are then handled by the FacebooksController, which causes Pusher to trigger and update on the front end.

![facebooks_controller](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/facebooks_controller.png)


Components such as the account page subscribe to Pusher's updates and re-render accordingly.

![pusher_subscribe](https://github.com/jordvnkm/FBAppDemo/blob/master/docs/pusher_subscribe.png)


## Future improvements
- Scheduling publish times
- Code cleanup
- Comment pagination
