import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text, Platform } from 'react-native';

export default class PickerItem extends PureComponent {

	returnPosition = layout => {
		const { y } = layout;
		return this.props.returnPosition(y);
	}

	render() {
		let icon = (this.props.selected) ? require('./assets/icons/selected.png') : require('./assets/icons/unselected.png');
		let selectedTextStyle = (this.props.selected) ? {fontWeight:'600'} : {};
		return (
			<TouchableOpacity onLayout={event => {this.returnPosition(event.nativeEvent.layout)}} key={this.props.key} activeOpacity={0.8} onPress={() => this.props.pickSelected(this.props.value, this.props.key, this.props.label)}>
				<View style={[{flexDirection:'row'}, styles.alignItemsCenter, styles.py10]}>
					<Image source={icon} style={[styles.imageStyle, styles.px10]} />
					<Text style={[styles.itemTextStyle, styles.px10, selectedTextStyle]}>{this.props.label}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	transparent: {
		backgroundColor:'#00000000',
	},
	upperView: {
		height:'60%',
		backgroundColor:'#00000044',
	},
	lowerView: {
		height:'40%',
		backgroundColor:'#FFFFFF',
	},
	pickerHeader: {
		padding:10,
		borderBottomColor:'#BDBDBD',
		borderBottomWidth:1,
		flexDirection: 'row',
	},
	pickerBody: {
		flex:1,
		padding:10,
	},
	defaultButtonTextStyle: {
		textAlign:'center',
		color: '#1976D2',
		fontWeight: '600',
		fontSize:16
	},
	inputStyle: {
		padding:10,
	},
	centerContent: {
		justifyContent:'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	alignItemsCenter: {
		alignContent: 'center',
		alignItems: 'center',
	},
	imageStyle: {
		width: 20,
		height: 20,
		resizeMode: 'contain' /* contain works best on both ios and android. center does not display on iOS */
	},
	separator: {
		height:1,
		backgroundColor:'#BDBDBD'
	},
	itemTextStyle: {
		fontSize: 16,
		color: '#212121'
	},
	px10: {
		paddingHorizontal: 10,
	},
	py10: {
		paddingVertical: 10,
	}
});