# react-machine-trips-map

Map visualising machine trips

## Usage

### Running on local

`yarn install:all` install all dependencies for project and mock database (dev-api-server). This should only be run once when first cloning the project

`yarn install` install dependencies

`yarn run start` starts a localhost server for development purposes at localhost:3000

`yarn run start:storybook` starts a localhost server for storybook documentation at localhost:9009


### Tests
`yarn run test` runs all tests

`yarn run test:watch` runs tests on changes

`yarn run test:coverage` runs tests and gives coverage (coverageThresholds can be modified in package.json jest>coverageThreshold so that this command fails based on coverage thresholds)

## Importing component for use

### Release/Publish

`yarn run release` Interactive tool for creating a release

`yarn run release patch` Create a release and bump patch version up 1

### Import

In the package that you wish to import the project to

`yarn add git+ssh://git@github.com/eroad/react-boilerplate#0.0.1`


Then you should be able to use the component(s) in the other project:

##### App

`import App from 'react-boilerplate'`

`<App rootUri={'/Portal/boilerplate'} />`

* rootUri is the root uri for the page you import the bundle.js file on (this is used for react-router-dom)

#### Some component for reuse

`import { CommonExample } from 'react-boilerplate'`

`<CommonExample />`



## Customizing webpack configuration

We are using https://github.com/facebookincubator/create-react-app for some managed default configurations. However, we want to use some features and libraries that would not work with a vanilla create-react-app installtion. To customize the webpack configuration, we are using https://github.com/timarney/react-app-rewired/ to 'rewire' some of the configuration for our own purposes. The downside to this is that we break any guarantees CRA provides, and we will need to manually update our rewired configuration if anything breaks.