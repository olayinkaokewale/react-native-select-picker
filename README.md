# React Native Select Picker
This is a customized select picker that renders the same way on both android and ios.

The reason why I started this project is because react native Picker become messed up when used on iOS devices
and I wanted somthing that works and renders the same on both iOS and Android.

## Installation
To install this package you will have to run the command below using npm
> `npm install --save git+https://github.com/olayinkaokewale/react-native-select-picker.git`

We dont have an npm link yet. We will update that as soon as we get one.

## Usage
This module has been made to conform to the basic react native Picker in order to easily change import 
without having to change much on your code-base. We are developer friendly! :D
```js
...
import SelectPicker from 'react-native-select-picker'; // Import the package
...

export default class YourClass extends Component {
	...

	render() {
		return (
			...

			<SelectPicker
				onValueChange={(value) => {
					// Do anything you want with the value. 
					// For example, save in state.
					this.setState({
						selected: value
					})
				}}
				selected={this.state.selected}
				>
				...
				<SelectPicker.Item label="Apple" value="apple" />	
				<SelectPicker.Item label="Banana" value="banana" />	
				<SelectPicker.Item label="Orange" value="orange" />	
				...
			</SelectPicker>

			...
		)
	}

	...
}
```

## Contributing
This project was started by [Olayinka Okewale](https://github.com/olayinkaokewale)
on 20th April, 2019. If you'd love to contribute to this project, contact me on
[okjool2012@gmail.com](mailto:okjool2012@gmail.com)

## Support Us
If you like this project please give a star and follow me on my social media networks.

[![alt text](https://img.icons8.com/small/32/000000/linkedin.png)](https://www.linkedin.com/in/olayinkaokewale)
[![alt text](https://img.icons8.com/small/32/000000/instagram-new.png)](https://www.instagram.com/olayinkaokewale)
[![alt text](https://img.icons8.com/small/32/000000/twitter.png)](https://www.twitter.com/olayinkaokewale)

