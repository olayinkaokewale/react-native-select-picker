import React, { PureComponent } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class SelectPicker extends PureComponent {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			selected: this.props.selected | "",
		};
	}

	componentWillReceiveProps = newProps => {
		if (newProps.selected != this.props.selected) {
			this.setState({
				selected: newProps.selected
			})
		}
	}

	onValueChange = () => {
		this.setModalVisibility(false);
		if (typeof this.props.onValueChange == 'function') {
			return this.props.onValueChange(this.state.selected);
		} else {
			console.log("onValueChange props must be a function. Function not passed");
		}
	}

	setModalVisibility = bool => {
		this.setState({
			visible: bool
		})
	}

	render() {
		const children = this.props.children;
		return (
			<TouchableOpacity activeOpacity={0.9} style={[styles.inputStyle, styles.centerContent, this.props.style]} onPress={() => { this.setModalVisibility(true) }}>
				
				{/* Modal to display on touch */}
				<Modal visible={this.state.visible}>
					<TouchableOpacity style={styles.upperView} />
					<View style={[styles.lowerView, this.props.containerStyle]}>
						
						{/* Header */}
						<View style={styles.pickerHeader}>
							<View style={{flex:1}}>
							
							</View>
							<TouchableOpacity onPress={() => this.onValueChange()} activeOpacity={0.9} style={{padding:5}}>
								<Text style={[this.props.selectButtonTextStyle, styles.detaultButtonTextStyle]}>{this.props.selectButton || 'Done'}</Text>
							</TouchableOpacity>
						</View>
						
						{/* Body */}
						<View style={styles.pickerBody}>
							{React.Children.map(children, (child, index) => {
								let selected = (child.props.value == this.state.selected);
								let key = (child.props.key) ? child.props.key : index;
								let newChild = React.cloneElement(child, {
									selected: selected,
									pickSelected: (value) => {
										this.setState({
											selected: value
										});
									},
									key: key
								})
								return [
									index > 0 && (<View key={index} style={styles.separator} />),
									newChild
								]
							})}
						</View>
					</View>
				</Modal>
			</TouchableOpacity>
		);
	}

	static Item = Item;

}

class Item extends PureComponent {

	render() {
		let icon = (this.props.selected) ? require('./assets/icons/selected.png') : require('./assets/icons/unselected.png');
		return (
			<TouchableOpacity key={this.props.key} activeOpacity={0.8} onPress={() => this.props.pickSelected(this.props.value)}>
				<View style={[{flexDirection:'row'}, styles.centerContent]}>
					<Image source={icon} style={styles.imageStyle} />
					<Text style={styles.itemTextStyle}>{this.props.label}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	transparent: {
		backgroundColor:'#0000',
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
	imageStyle: {
		width: 25,
		height: 25,
		resizeMode: 'center'
	},
	separator: {
		height:1,
		backgroundColor:'#BDBDBD'
	},
	itemTextStyle: {
		fontSize: 16,
		color: '#212121'
	}
});