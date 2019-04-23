import React, { PureComponent } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import PickerItem from './components/pickeritem';

export default class SelectPicker extends PureComponent {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			selected: this.props.selected | "",
			selectedKey: null,
			selectedLabel: null,
			dismissable: this.props.dismissable | false,
			disabled: this.props.disabled | false,
			placeholder: this.props.placeholder | "",
		};
	}

	componentWillReceiveProps = newProps => {
		if (newProps.selected != this.state.selected) {
			this.setState({
				selected: newProps.selected
			})
		}
		if (newProps.dismissable != this.state.dismissable) {
			this.setState({
				dismissable: newProps.dismissable
			})
		}
		if (newProps.disabled != this.state.disabled) {
			this.setState({
				disabled: newProps.disabled
			})
		}
		if (newProps.placeholder != this.state.placeholder) {
			this.setState({
				placeholder: newProps.placeholder
			})
		}
	}

	onValueChange = () => {
		this.setModalVisibility(false);
		if (typeof this.props.onValueChange == 'function') {
			return this.props.onValueChange(this.state.selected, this.state.selectedKey);
		} else {
			console.log("onValueChange props must be a function. Function not passed");
		}
	}

	setModalVisibility = bool => {
		if (!this.state.disabled || !bool) {
			this.setState({
				visible: bool
			})
		}
	}

	handleDismiss = () => {
		if (this.state.dismissable) {
			this.setModalVisibility(false);
		}
	}

	getSelectTitle = () => {
		if (this.state.selectedLabel != null) {
			return (<Text numberOfLines={1} style={[styles.selectedTitleStyle, this.props.onSelectedStyle]}>{this.state.selectedLabel}</Text>);
		}
		
		return (<Text numberOfLines={1} style={[styles.placeholderTitleStyle, this.props.placeholderStyle]}>{this.props.placeholder}</Text>);
	}

	render() {
		const children = this.props.children;
		return (
			<TouchableOpacity activeOpacity={0.9} style={[styles.inputStyle, this.props.style]} onPress={() => { this.setModalVisibility(true) }}>
				{/* Get title of the select element */}
				{this.getSelectTitle()}
				
				{/* Modal to display on touch */}
				<Modal visible={this.state.visible} onRequestClose={() => this.handleDismiss()} transparent>
					<TouchableOpacity activeOpacity={1} onPress={() => this.handleDismiss()} style={styles.upperView} />
					<View style={[styles.lowerView, this.props.containerStyle]}>
						
						{/* Header */}
						<View style={styles.pickerHeader}>
							<View style={{flex:1}}>
							
							</View>
							<TouchableOpacity onPress={() => this.onValueChange()} activeOpacity={0.9} style={{padding:5}}>
								<Text style={[styles.detaultButtonTextStyle, this.props.doneButtonTextStyle]}>{this.props.doneButtonText || 'Done'}</Text>
							</TouchableOpacity>
						</View>
						
						{/* Body */}
						<ScrollView>
							<View style={styles.pickerBody}>
								{React.Children.map(children, (child, index) => {
									let selected = (child.props.value == this.state.selected);
									/* let key = (child.props.key != null) ? child.props.key : index; */
									let newChild = React.cloneElement(child, {
										selected: selected,
										/* key: index, */
										pickSelected: (value, index, label) => {
											this.setState({
												selected: value,
												selectedKey: index,
												selectedLabel: label,
											});
										}
									})
									return [
										index > 0 && (<View key={index} style={styles.separator} />),
										newChild
									]
								})}
							</View>
						</ScrollView>
					</View>
				</Modal>
			</TouchableOpacity>
		);
	}

	static Item = PickerItem;

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
		borderBottomColor:'#EFEFEF',
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
	imageStyle: {
		width: 25,
		height: 25,
		resizeMode: 'center'
	},
	separator: {
		height:1,
		backgroundColor:'#FAFAFA'
	},
	itemTextStyle: {
		fontSize: 16,
		color: '#212121'
	},
	placeholderTitleStyle: {
		fontSize: 15,
		color:'#757575'
	},
	selectedTitleStyle: {
		fontSize: 16,
		color:'#252525'
	}
});