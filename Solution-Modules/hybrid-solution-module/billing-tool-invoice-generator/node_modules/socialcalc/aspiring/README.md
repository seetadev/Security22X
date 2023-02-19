# SocialCalc
This is the npm package for SocialCalc, an in-browser spreadsheet editor with support for real-time collaboration.
This version is based on the version used in [EtherCalc](https://github.com/audreyt/ethercalc).

See it in action at [ethercalc.net](http://ethercalc.net)!

## Requirements
* jQuery (only on the client-side)

## Usage
You can `require('socialcalc')` or include `node_modules/socialcalc/SocialCalc.js` on your web page using a script tag.

In order to create an editor instance use:
```js
var socialCalcControl = new SocialCalc.SpreadsheetControl()
socialCalcControl.InitializeSpreadsheetControl(el /*, height, width, spacebelow*/)
```

This package also works in node.js. You don't need to callc `InitializeSpreadsheetControl` here, because that is just initializing the rendering.

## Licensing
### Common Public Attribution License (Socialtext Inc.)
* socialcalcspreadsheetcontrol.js
* socialcalctableeditor.js

### Artistic License 2.0 (Socialtext Inc.)
* formatnumber2.js
* formula1.js
* socialcalc-3.js
* socialcalcconstants.js
* socialcalcpopup.js

### Mozilla Public License 2.0
* images/sc_*.png
