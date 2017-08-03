# react-bootstrap-multiselect
Yet another multi-select component for React. This component works as the react version of bootstrap-multiselect ^^

## Description
* Support Async initialization and Dynamic update.

## Usage

```js
let ReactSelectView = require('./react-bootstrap-multiselect.js');
<ReactSelectView
       selectText="Choose something"
       defaultValue={default selected value}
       shouldSelectUpdate={true|false}
       isMultiple={true}
       selectEvent={this.handleChallengeEvent}
       data={provided full data}/>
```
- Notice
* You should integrate the bootstrap-multiselect framework before you can use it
* You should set `shouldSelectUpdate` be `true` whe performin dynamic update, and **Parent React Component should set the value passed to `shouldSelectUpdate` be false in its `componentDidUpdate` life cycle**

