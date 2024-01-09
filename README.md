# Sawwit

A full-stack web application for users to post, comment, and like. Inspired by a popular social news aggregation, content rating, and discussion website. No copyright infringement intended. For educational purposes only.

https://sawwit.glitch.me/

## Features
1. User authentication - user authentication is done via `express-session` and `passport.js`. Users can log in with the login page
2. User registration - new users can register in the registration page. For demonstration purposes, users will not need to verify their identity.
3. Posting - users can make posts containing links and text to share with other uses.
4. Commenting - users can comment on posts.
5. Like - users can like or dislike posts with the `up` and `down` arrows.
6. Sorting - users can sort posts based on the following:
a. Top - sort based on the sum of likes to the sum of dislikes.
b. Hot - sort based on the sum of likes.
c. Controversial - sort based on how many likes and dislikes.
d. Date - sort based on how recent the post was made.
7. Deleting - users can delete their posts or comments.

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