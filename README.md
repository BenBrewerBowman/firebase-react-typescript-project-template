# Firebase + React + TypeScript Project Template

> Template for new Firebase + React + TypeScript project. View the demo [here](https://frt-project-template.firebaseapp.com/).

## Getting started

### Firebase

1. Create new project in the [Firebase Console](https://console.firebase.google.com/).

2. Enable Email + Google Authentication for project.

3. Update authentication template action url to: `https://<YOUR_DOMAIN_HERE>.firebaseapp.com/auth-action`.

4. Enable hosting for project.

### Config

- Update `.firebaserc` with your new Firebase project ID.

- Update `client/src/constants.ts` with `APP_NAME` and `FIREBASE_CONFIG`.

- Update `client/public/index.html` with `Title` and `Description`.

- Update `client/public/manifest.json` with `short_name` and `name`.

- Update `client/package.json` with `name`.

## Running locally

Navigate to the client directory and install all dependencies:

##### `yarn install`

Start the app in development mode:

##### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Other scripts

##### `yarn test`

Runs the test suite of unit tests

##### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

##### `yarn lint`

Runs linter to find potential problems in code

##### `yarn format`

Formats any and all code to formatter rules

##### `yarn deploy`

Runs `yarn build` and then deploys the compiled code to firebase hosting.
