# react-boilerplate

Boilerplate for a new React component/page repository

## Usage

### Running on local

`yarn install` install dependencies

`yarn run start` starts a localhost server for development purposes at localhost:3000

`yarn run start:storybook` starts a localhost server for storybook documentation at localhost:9009


### Tests
`yarn run test` runs all tests

`yarn run test:watch` runs tests on changes

`yarn run test:coverage` runs tests and gives coverage (coverageThresholds can be modified in package.json jest>coverageThreshold so that this command fails based on coverage thresholds)


### Cloning for your own repo

* Copy all files to your new repo
* Replace all instances of react-boilerplate in package.json


## Importing component for use

### Release/Publish

`yarn run release` Interactive tool for creating a release

`yarn run release patch` Create a release and bump patch version up 1

### Import

In the package that you wish to import the project to

`yarn add git+ssh://git@github.com/tedchennz/react-boilerplate#0.0.1`


Then you should be able to use the component(s) in the other project:

##### App

`import App from 'react-boilerplate'`

`<App rootUri={'/Portal/boilerplate'} />`

* rootUri is the root uri for the page you import the bundle.js file on (this is used for react-router-dom)

#### Some component for reuse

`import { CommonExample } from 'react-boilerplate'`

`<CommonExample />`
