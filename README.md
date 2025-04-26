### React Router Fix

[Fix for "Page Not Found" on Netlify with React Router](https://dev.to/dance2die/page-not-found-on-netlify-with-react-router-58mc)

### Create React App (CRA) Fix for Build Issues

To address potential build problems, especially in Continuous Integration (CI) environments, you can modify your `build` script in `package.json` as follows:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "CI= react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
