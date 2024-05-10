# Atlas Frontend

Atlas is a device (created using arduino) that allows users to track any of their belongings. They can view the location of their tracked items and interact with them within the Atlas mobile app which was created using react-native. 
<br><br> The backend code can be found here: https://github.com/DaanyaalTahir/atlas-backend
## 💻 Technologies
Below are the technologies that the full-stack app is using (this repo has only the frontend): 
- react-native
- ExpressJS
- Server Sent Events
- Sequelize ORM

## 📷 Pictures
Below are some sample screenshots of the mobile application.

### Login Page
<img src="https://github.com/DaanyaalTahir/atlas-frontend/blob/main/sample_images/loginPage.png" alt="login_page" height="400"/>

### Home Page
Displays a list of the items being tracked by the user.

<img src="https://github.com/DaanyaalTahir/atlas-frontend/blob/main/sample_images/homepage.png" alt="home_page" height="400"/>

### Tracker Page
Detailed page of the tracker, users can view the exact location, get directions to the tracker, view its location history and more.

<img src="https://github.com/DaanyaalTahir/atlas-frontend/blob/main/sample_images/trackerPage.png" alt="tracker_page" height="400"/>

### Map Page
The map page allows users to view all their tracked items at once. When the item is selected on the map they will be navigated to the detailed view of that item.

<img src="https://github.com/DaanyaalTahir/atlas-frontend/blob/main/sample_images/mapPage.png" alt="map_page" height="400"/>

### Location History
View the path that an item took on the map. Each node can be clicked to view the time that location was captured. 

<img src="https://github.com/DaanyaalTahir/atlas-frontend/blob/main/sample_images/location_history.png" alt="location_history_page" height="400"/>

## 🚀 How to use
Clone the repo and then cd into the folder. Run the following command. 
```sh
npm i; npm run start;
```
Use the Expo Go app to scan the generated QR code in order to get developing. 
## 📝 Notes

- [Gluestack UI Component Library: Docs](https://ui.gluestack.io/docs/overview/introduction)
- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)
