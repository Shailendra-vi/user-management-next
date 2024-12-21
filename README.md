# Next.js User Data App

This project is a Next.js application that fetches user data from a specified URL, persists the data on the server side, and displays it in a user-friendly table. The app is configurable via a configuration file, allowing you to set the data source URL and the number of rows displayed per page.

## Features

- Fetch user data from a URL
- Persist data on the server side using redux
- Display data in a paginated table
- Configuration file for customizable settings

## Installation

### Clone the Repository

```bash
git clone https://github.com/Shailendra-vi/user-management-next.git
cd user-management-next
```

### Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the required packages:

```bash
npm install
```

## Configuration

### Config File

The application includes a configuration file where you can set the URL for fetching data and the number of rows displayed per page in the table.

1. Locate the config file at `config.js`.
2. Modify the following parameters:

```javascript
module.exports = {
  url: 'https://jsonplaceholder.typicode.com/users',
  rowsPerPage: 5
};
```

## Running the Application

### Development Mode

To run the application in development mode, use:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

### Production Mode

To build and start the application in production mode:

```bash
npm run build
npm start
```

The app will be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

1. Start the application (see "Running the Application" section).
2. The user table will display data fetched from the specified URL.
3. Use the pagination controls to navigate through the data.
4. Search, Sort and Filter the data.

## Project Structure

- `app/` - Contains Next.js app router structure
- `components/` - Reusable React components
- `config.js` - Configuration file for the app

