# Contact Management App

Build a client app which includes a “Contact Us” page and a “Contacts list” page and a server app which provides required APIs for client app.

## Project Description

The Contact Management App is a full-stack application designed to handle customer interactions through a "Contact Us" form and manage a list of contacts. It features a client app built with React and a server app using Express.js, with data storage in SQLite. The application allows users to submit contact information, view a list of contacts, and perform actions such as marking contacts as verified or deleting them. The app is designed with responsiveness in mind, ensuring a smooth user experience across different devices.

## Technologies Used

- Client App: React for building the user interface.
- Server App: Express.js for handling API requests.
- Database: SQLite for storing contact data.
- Docker: For containerizing the application.

## How to run the project

### Prerequisite

- Git (for clone the project）
- Node.js and npm (Node Package Manager) installed on your machine.
- Docker (for running the app in a container).

#### 1. clone the repository
```bash 
git clone https://github.com/Even012/client-app.git
cd client-app/
```
#### 2. Build and run the Docker container
```bash
docker-compose up --build
```

## How to Use the Project
### 1. Access the Client App: 
Open your browser and navigate to ```http://localhost:3000``` to access the client application.

### 2. Contact Us Page:
- Fill out the form with First Name, Last Name, Email, Phone, and Additional Info.
- Submit the form to save contact data.
- Upon successful submission, you will be redirected to a "Thank You" page.

### 3. Contacts List Page:
- View the list of existing contacts.
- Use the "Mark as verified" button to mark a contact as verified. This option will be disabled once the contact is verified.
- Use the "Delete" button to remove a contact from the list.
  
## Assumptions
-  User base: Users may be access to the contact us page and contacts list page in one web application.
-  UI design: Header includes a title and two buttons for users to navigate pages
-  Form validation: Basic validation is assumed to be sufficient.
-  Database: SQLite will be used based on the project's needs or deployment environment.
