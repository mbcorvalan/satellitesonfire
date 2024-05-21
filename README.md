# SatellitesOnFire Challenge

This project is a challenge for [SatellitesOnFire](https://www.satellitesonfire.com/).

## About the Challenge

The challenge involves creating a Single Page Application (SPA) using React. The application needs to perform several functionalities related to displaying and filtering fire points on a map.

## Functionalities

The React-based SPA should implement the following features:

- Display fire points on the map, adjusting their appearance based on a reliability scale: the most reliable points should be in a darker red color, while the less reliable points should be in yellow. You can base the colors on our application or implement your own.
- Implement using Redux:
  - Initial loading of points from the API.
  - A date and time component to filter points.
  - Error control with a generic (or not) error message to inform about an error.
- A component to filter points based on the satellite field without using Redux.
- Display extra information when clicking on a point.
- Show the number of fire points displayed on the map, and list them.
- Test the functionality of the filters (not the UI).
- Test front-end components.

## Setup Instructions

To use this project, follow these steps:

1.  Clone the repository:

    ```bash
    git clone https://github.com/mbcorvalan/satellitesonfire.git

    ```

2.  ```bash
    cd  satellitesonfire

    ```

3.  ```bash
    npm install

    ```

4.  ```bash
    npm test
    ```
