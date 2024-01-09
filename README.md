# Sawwit

A full-stack web application for users to post, comment, and like. Inspired by a popular social news aggregation, content rating, and discussion website. No copyright infringement intended. For educational purposes only.

https://sawwit.glitch.me/

## Features
<ol>
<li>User authentication - user authentication is done via <code>express-session</code> and <code>passport.js</code>. Users can log in with the login page</li>
<li>User registration - new users can register in the registration page. For demonstration purposes, users will not need to verify their identity.</li>
<li>Posting - users can make posts containing links and text to share with other uses.</li>
<li>Commenting - users can comment on posts.</li>
<li>Like - users can like or dislike posts with the <code>up</code> and <code>down</code> arrows.</li>
<li>Sorting - users can sort posts based on the following:</li>
<ol>
  <li>Top - sort based on the sum of likes to the sum of dislikes.</li>
  <li>Hot - sort based on the sum of likes.</li>
  <li>Controversial - sort based on how many likes and dislikes.</li>
  <li>Date - sort based on how recent the post was made.</li>
</ol></li>
<li>Deleting - users can delete their posts or comments.</li>
</ol>

## Technologies and Libraries Used
- MongoDB
- Express.js
- React.js
- Node.js
- Passport.js
- Mantine.ui
- Axios
- Zustand
- Vite

## Further Improvements and Implementations
- [ ] Liking comments
- [ ] Replying comments
- [ ] Add missing error handlings
- [ ] Add missing typings
- [ ] Profile page
- [ ] Search function
