# Event Registration Website

A static web application for event registration where users can enter their name and IGN (In-Game Name), and view all registrations in a Firebase Firestore database.

## Features

- User registration form with name and IGN fields
- Data stored in Firebase Firestore (shared database)
- View all registrations on a separate page
- Responsive design
- Deployable to GitHub Pages

## Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > General > Your apps > Add app (Web)
5. Copy the Firebase config object

## Update Configuration

1. Open `public/index.html` and `public/view.html`
2. Replace the `firebaseConfig` object with your actual Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload the `public` folder contents to the repository (or the entire project if you want)
3. Go to repository Settings > Pages
4. Set Source to "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Save and wait for deployment

Your site will be available at `https://yourusername.github.io/repository-name/`

## Local Development

To test locally, open the HTML files directly in your browser. Note that Firebase requires a live server for CORS, so for local testing:

1. Install a local server (e.g., `npx serve public`)
2. Or use VS Code Live Server extension

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Firebase Firestore

## Security Note

This setup uses Firebase with no authentication, so anyone can read/write to your database. For production use, consider adding authentication and security rules.