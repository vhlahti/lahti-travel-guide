# Lahti Travel Guide
## Table of Contents
1. [Project Description and Purpose](#project)
2. [System Architecture](#system)
3. [Installation Instructions](#installation)
4. [User Manual](#manual)
5. [Screenshots](#screens)

## <a id="project"> 1. Project Description and Purpose </a>
### Summary
Lahti Travel Guide is a multi-device web application designed for tourists and locals to discover interesting attractions and experiences in the Lahti area. It sources real-time data from Visit Finland’s DataHub, ensuring accurate and up-to-date information provided by local travel companies. The application offers intuitive browsing, filtering, and search features, along with user accounts for saving favorites, making it a convenient and engaging way to explore Lahti.
### Key features
- Travel service and product data display supplied by actual travel companies in Lahti.
- Detailed information about individual items including external links for further engagement like ticket purchasing.
- Real-time search function to help finding items based on keywords.
- Filtering items by categories; accommocation, attraction, experience, event, rental service, restaurant, shop, transportation, venue.
- Arranging list items by newest update, oldest update, alphabetical ascending, alphabetical descending.
- Ability to create an user account.
- Ability to store favorite items to the user account.
## <a id="system"> 2. System Architecture </a>
### High-level overview
The Lahti Travel Guide application follows a client-server architecture with a modular design. The frontend is built using Angular as the primary UI framework and Ionic for responsive components, ensuring seamless multi-device support across PCs, tablets, and mobile devices. It handles user interactions, routing, and service calls to the backend. The backend is powered by Node.js and Express, acting as the application server that manages business logic and exposes a local API for the frontend. It also integrates with external services, including Visit Finland’s DataHub GraphQL API, to fetch real-time travel data. User-specific data such as accounts and favorites are stored in MongoDB Atlas, a cloud-based NoSQL database.
### Architecture diagram
![ArchitectureDiagram](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/system.png)

### Components
**Frontend:**
- Tech stack: Angular 20, Ionic.
- Responsibilities: Angular serves as UI framework, Ionic as UI toolkit. They handle UI, frontend routing and services.

**Backend:**
- Tech stack: Node.js v22.19.0, Express.
- Responsibilities: Node.js and Express run the backend server connecting external services to the frontend. They handle the local API and business logic.

**Data storage:**
- Database: MongoDB Atlas.
- Responsibilities: External NoSQL storage for saving user account and favorites information.

**APIs/Integration:**
- Public API endpoints: POST https://api.businessfinland.fi/traveldatahub.
- Responsibilities: External GraphQL API that provides the displayed travel data.

### Security/privacy
- Password security uses Bcrypt to hash the passwords, thus never storing the raw password.
- User authentication uses JSON Web Tokens (JWT) to verify the user's identity.
- Only storage admin has the authority to access user data.
- Cross-origin resource sharing (CORS) controls resource access.
- Private credentials and keys aren't shared in the public source code but stored in local environment file.

### Deployment
- No deployment yet.

## <a id="installation"> 3. Installation Instructions </a>
### Clone and setup
Clone the GitHub repository from the following URL to your local computer with your preferred method.

```
https://github.com/vhlahti/lahti-travel-guide
```

If you're not familiar with Git cloning, an easy method is to click the green **<> Code** button in the GitHub repository and download the source code with **Download ZIP**. Unpack it to your local computer. If the folder name includes the branch extension **-main**, remove it so the folder name is **lahti-travel-guide**.

### Prerequisites
Install Node.js JavaScript runtime environment if you don't have it already. You can download it from **https://nodejs.org**.

Install Angular framework client running the following command within the root **/lahti-travel-guide** folder. Make sure your system is allowed to run scripts or you might face an Execution Policy security error.

```
npm install -g @angular/cli
```

Install Ionic framework client running the following command within the same folder.

```
npm install -g @ionic/cli
```

Install the rest dependencies running the following command within the same folder. The dependencies are Express, Dotenv, Mongoose, Bcryptjs, CORS and Jsonwebtoken.

```
npm install express dotenv mongoose bcryptjs cors jsonwebtoken
```

### Environment variables
The environment files are not included in the source code so you have to add them manually. Create `.env` environment variables file within the **/backend** folder root. Copy and paste the following variables within the file and save it. The variables are the GraphQL API credentials, MongoDB connection string, JSON Web Token secret and frontend endpoint URL.

```
Environment variables not for public sharing. Request them from the author.
```

Create **environments** folder within the source code **/src** folder. Create `environment.ts` file into the **environments** folder and paste the following code into it and save it. To avoid any errors, create another file for production called `environment.prod.ts`. Use the same code but replace **false** with **true**. In actual production deployment you would replace the localhost URL with your deployed server endpoint.
```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

![EnvFolder](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/environment.png)

### Backend setup
Open **/backend** folder to new terminal. You can do this in VSCode by either right clicking on top of the folder and choosing **Open in Integrated Terminal** or if you're still within /lahti-travel-guide folder, typing **cd backend** to the command line.

![BackendOpen](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/backend-open.png)

Start the backend server running the following command within the backend folder.

```
npm start
```

You should see in the terminal **"Server running on port 3000, MongoDB connected"** messages. The server is now running and it's connected to MongoDB Atlas database. If you go on a web browser to **http://localhost:3000/** it should display **"Lahti Travel Guide server is running!"**.

![NpmStart](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/npmstart.png)
![3000Success](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/localhost3000browser.png)

### Frontend setup
Open the root folder **/lahti-travel-guide** again. Start the frontend by running the following command in the terminal.

```
ionic serve
```

The app should now automatically open in your preferred browser. If it doesn't, go to **http://localhost:8100** in your browser.

![IonicServe](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/ionicserve.png)

## <a id="manual"> 4. User Manual </a>

### Intended users
The app has been developed with ease of use in mind to cater anyone who is interested in exploring what kind of attractions Lahti has to offer.
### Feature walkthrough
#### Responsive browsing of content
You can explore the travel content freely without the need of creating an user account. However, if you want to save and manage favorite items, you will need an user account. The application is designed to have multi-device support so it scales properly on every device whether the user chooses to use desktop PC, laptop, tablet or mobile phone.
#### View detailed information about an item
To get detailed information about an item you're interested in, click the blue **DETAILS** button on the item card. This will redirect you to the individual item's dedicated page. Here you will find detailed information about the item such as description, pricing, availability and contact information. Clicking the blue **VISIT PRODUCT WEBPAGE** will pop up external website of the item provided by the travel service's or product's producer where you can engage even more to the item. You can also access individual item details page via your favorites list.
#### Create an account
Click **Profile** on the bottom navigation bar to start the registering process. You will use the profile tab for all account features; registering, logging in, logging out. The view will change depending on the state the user is in. By default, you're greeted with the login page. Click the **Register?** link on the right side of the page to open the registeration page.

Type into the register form your preferred username and password, and confirm the password. The form will inform you if the input doesn't meet the requirements. For demo purposes the requirements are kept very basic; the username must not exist in the database, password must be at least three characters long and the confirmed password must match the initial password. The requirements can be easily beefened up later.

Successful account registration will greet you with toast **"Account created successfully! Redirecting to login page..."**
#### Login
If you already have an user account and you're still in the registration page, click the **"Login?"** link on the right side of the page. When you have arrived to the login page, type into the input field your existing username and password and click the blue **LOG IN** button. When you have typed valid user credentials, you're redirected to a profile page. The profile will show your login state and allows you to log out of the system via the red **LOGOUT** button.
#### Search items
You can search specific items using the search function found at the homepage. Navigate to it by pressing the **Home** icon on the navigation bar. The search function works in real time and starts immediately looking for results once the user starts typing into the search input field.
#### Filter items by category
On the far right next to the search bar you will find options icon, three lines with dots, which will pop up a menu of categories; all, accommocation, attraction, experience, event, rental service, restaurant, shop, transportation, venue. This will allow the user to filter the item list or search results from individual categories. Each item belongs to a specific category whichever their service or product content reflects to.
#### Arrange items in date or alphabetical order
You can also arrange the item lists by choosing the upwards arrow next to the search field. The arrange options are alphabetical descending, alphabetical ascending, oldest update and newest update.
#### Add favorites
Logged in users can also gather a list of their favorite items. This helps to keep track of interesting items you would want to explore more later. At the homepage, each item card has a red heart outline icon. By pressing this icon, the item is added to your favorites list. To confirm the addition, the icon turns fully red. If you try to add items as favorite in unlogged state, you're met with **"Login required! You must be logged in to manage favorites."** pop up message. The favorites list has their own dedicated page which you can navigate to choosing **Favorites** icon at the navigation bar. There you can view the favorites items you have added. Clicking the item will redirect you to that said item's detail page. Pressing the red trash bin icon on the right will remove the item from your favorites list. Just like the user information, the favorites are stored in external database so they won't clear out unless you remove them yourself.

## <a id="screens"> 5. Screenshots </a>

![Home](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/favoritesadd.png)
![Favorites](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/favoritesfull.png)
![Login](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/loginsuccess.png)
![ItemDetail](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/itemdetail.png)
![About](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/about.png)
![Mobile](https://github.com/vhlahti/lahti-travel-guide/blob/main/src/assets/documentation/mobile.png)