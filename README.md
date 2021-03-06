# React Native Form Select Picker
This is a customized select picker that renders the same way on all platforms.

## What's new?
Version 0.0.10 fixes the disabled input bug.

## Installation
if you already have this package in your project update to the latest version by running:
> `npm install --save react-native-form-select-picker@latest`

Install peer dependency:
> `npm install @react-native-picker/picker --save`

Do a pod install (only iOS)
> `npx pod-install`

| react-native version | version to install |
| --- | --- |
| 0.60 and above | 0.0.9 and above |
| < 0.60 | 0.0.81 |

---

## Why react-native-form-select-picker?
The reason why I started this project is because react native default Picker becomes messed up when used on iOS devices
and I wanted somthing that works and renders the same on both iOS and Android.

## Look and feel
Here is the rendered sample of this package on Android and iOS


| ![iOS Example](./examples/ios.gif) | ![Android Example](./examples/android.gif) |
| --------- | -------- |


## Installation
To install this package you will have to run the command below using npm
> `npm install --save react-native-form-select-picker@latest`

## Usage
This module has been made to conform to the basic react native Picker in order to easily change import 
without having to change much on your code-base. We are developer friendly! :D

```javascript
import React, { useState } from 'react';
import SelectPicker from 'react-native-form-select-picker'; // Import the package
//...
const options = ["Apple", "Banana", "Orange"];
const YourComponent = ({ /* your props */ }) => {
	const [selected, setSelected] = useState();
	return (
		//...

		<SelectPicker
			onValueChange={(value) => {
				// Do anything you want with the value. 
				// For example, save in state.
				setSelected(value);
			}}
			selected={selected}
			>
			
			{Object.values(options).map((val, index) => (
				<SelectPicker.Item label={val} value={val} key={index} />
			))}

		</SelectPicker>

		//...
	)
}
```

## Properties
### \<SelectPicker> component props
The following properties can go in the \<SelectPicker> component (equivalent of \<select> in HTML):

| Props | Type | Default | Required | Description |
|:-----:|:----:|:-------:|:--------:|:-----------:|
| **onValueChange** | function: (value: any, index: number) | N/A | Yes | This is a callback function that is to be used in getting the selected value; You can set a state from here.|
| **selected** | any | null | Yes | The selected value inserted as a property. Can be used to define default selection. |
| dismissable | boolean | true | No | If dismissable is set as `true`, the select modal can be closed by clicking outside the modal or pressing the back button (on `android`) |
| disabled | boolean | false | No | When set to `true` component will behave like other disabled input components. i.e. click/press will not work. |
| placeholder | string | "" | No | This is the label that is shown when no option has been selected |
| placeholderStyle | StyleSheet | `{fontSize: 15, color:'#757575'}` | No | This is the style of the placeholder text. You can customize how the placeholder text looks before an option is being selected |
| onSelectedStyle | StyleSheet | `{fontSize: 16, color:'#252525'}` | No | This is the style to apply to the text label upon selection of an option |
| style | StyleSheet | `{padding:10}` | No | This it the style of the select box itself. Customize to fit your form. |
| containerStyle | StyleSheet | `{backgroundColor:'#FFFFFF'}` | No | This is the style for the modal dropdown select page. |
| doneButtonText | string | `"done"` | No | You can change the text being displayed for the confirmation button at the top right corner |
| doneButtonTextStyle | StyleSheet | `{textAlign:'center',color: '#1976D2',fontWeight: '600',fontSize:16}` | No | You can change the style of the confirm text to suit your design structure or template |
| titleText | string | "" | No | You can add title for the modal dropdown select page. |
| titleTextStyle | StyleSheet | `{textAlign:'center',color:'black',fontWeight:'bold',fontSize:18}` | No | This is the style of the title for the modal dropdown select page. |

### \<SelectPicker.Item> component props
The following properties go into the \<SelectPicker.Item> component (equivalent of \<option> in HTML):

| Props | Type | Default | Required | Description |
|:-----:|:----:|:-------:|:--------:|:-----------:|
| **label** | string | `""` | Yes | This is the option label. It replaces the placeholder when an item is selected. |
| **value** | any | null | Yes | The value of the option is passed in here and it is the value passed to the `onValueChange` function. |

## Changelog
- 0.0.12: Added a title prop for the modal dropdown select page
- 0.0.11: Updated some third-party library imports
- 0.0.10: Fixes input disabled issue _(when disabled prop is passed, it renders the input disabled)_
- 0.0.9: Removed `Picker` from `react-native` library and imported from `@react-native-community/picker` for projects using `react-native` 0.60 and above.
- 0.0.81: Removed the default **-- select --** placeholder on iOS.
- 0.0.8: Updated the deprecated functions in `react` to new ones and optimized the code to avoid memory leaks when component is unmounted. Removed `showIOS` prop _(Native picker is default for iOS now - no need to include this)_
- 0.0.7: Minor bug fix on iOS select picker _(When opened, the default selected is the placeholder when selected value is `null`, `undefined` or `empty string`)_
- 0.0.6: Added `showIOS` prop to enable or disable native iOS picker. _(iOS reviewers give high preference to the iOS native picker while reviewing to reject or accept an app)_
- 0.0.5: RN ^0.60 breaking changes fixed and iOS picker item select icon bug fixed. (Now showing the select icon)
- 0.0.4: Bug fixes in children re-render on update, IntelliSense and iOS UI fix.


## Contributing
If you'd love to contribute to this project, fork, make your edits, update the readme to reflect your changes, update the version number in the `package.json` file, run `npm test` and send in a pull request.

## Support Us
If you like this project please give a star and follow me on my social media networks.

[![alt text](https://img.icons8.com/small/32/000000/linkedin.png)](https://www.linkedin.com/in/olayinkaokewale)
[![alt text](https://img.icons8.com/small/32/000000/instagram-new.png)](https://www.instagram.com/olayinkaokewale)
[![alt text](https://img.icons8.com/small/32/000000/twitter.png)](https://www.twitter.com/olayinkaokewale)
