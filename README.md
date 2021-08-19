# Buddywise Reactjs Coding Challenge [Spotify Music 🎧] &nbsp; 
  - **Please read the details below for the implementation approach of this challange.**
 &nbsp; 


# Goals/Outcomes ✨
- To test knowledge of consuming APIs and handling responses
- Loading state and knowing where and how to make multiple API calls efficiently
  - **To reach the goals and outcomes, I followed the steps below.**
  
&nbsp;
# Think about 💡
- Taking a look at the Spotify API documentation
  - **I got help from the documentation authorization guide. Also checked the endpoints and their response in the documentation.**
- Do you resolve each API request one after the other or in parallel?
  - **Firstly, I resolved requests via _Promise.all_ that executes axios promises in parallel to fasten the loading process. However, if one of the requests would    fail all the others will be unaccessible. That's why i used _Promise.allSettled_ and set state if the matching request fulfilled. I think it will increase the average user experience. At the end of day, they may not even realize if there is an error came from the service. **
- Where do you make the API requests?
  - **I choose Discover component in order not to block other components to be rendered.**
- How much logic do you offload out of the UI components?
  - **I made an api instance and completely offload services from the UI. To make them to be easily found, create an _api_ folder and name files according to the endpoint. It also make it easier to test each services if we want to.**

&nbsp;
# Pre-requisites ✅
- Add your Spotify client ID & secret to `config.js`
  - **To prevent CORS and security issues, since client_credentials is used and it only works server-to-server, a small Nodejs-Express application deployed on Heroku to serve access token to the client side. Heroku application will be dismissed in a week. ** 

&nbsp;
# Requirements 📖
- Fetch and display *Released This Week* songs
- Fetch and display *Featured Playlists*
- Fetch and display *Browse* genres
  - **_Singleton pattern_ is used to create an axios instance for adding Auth_Token to all request will be made**
  - **_Axios interceptors_ used to shape the data came from server for clean responses**
- Loading state/UI *(optional, current UX is already clean)*
  - **A spinner from fortawesome library is added to show loading state. For the error cases, user will be notified with an apology message.**

