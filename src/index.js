import React, { PureComponent } from 'react';
import { AppRegistry, View, Modal, TouchableOpacity, StyleSheet, ScrollView, Text, Platform, Animated, Dimensions } from 'react-native';
import PickerItem from './components/pickeritem';

export default class SelectPicker extends PureComponent {

	// Build selection index
	selectionView = null; //Reference of the scroll view.
	scrollY = 0;
	
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			childrenItems: this.props.children || [],
			selected: this.props.selected || null,
			selectedKey: null,
			selectedLabel: null,
			dismissable: this.props.dismissable || false,
			disabled: this.props.disabled || false,
			placeholder: this.props.placeholder || "",
			children: null,

			// ScrollView Position.
			scrollY: 0,
			
		};
		
	}

	showSelectModal = () => {
		this.setState({
			visible: true
		});
	}

	componentDidMount() {
		this.getSelectedLabel();
		this.renderChildren();
	}

	componentWillReceiveProps = newProps => {
		if (newProps.children != this.state.childrenItems) {
			this.setState({
				childrenItems: newProps.children
			});
		}
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

	renderChildren = () => {
		const { childrenItems } = this.state;

		let childrenRender = React.Children.map(childrenItems, (child, index) => {
			let selected = (child.props.value == this.state.selected);
			/* let key = (child.props.key != null) ? child.props.key : index; */
			// if (selected) this.setScrollViewPosition();
			let newChild = React.cloneElement(child, {
				selected: selected,
				/* key: index, */
				pickSelected: (value, i, label) => {
					this.setState({
						selected: value,
						selectedKey: index,
						selectedLabel: label
					}, () => {
						this.renderChildren();
					});
				},
				returnPosition: (y) => {
					if (selected) {
						this.scrollY = y;
						console.log("Selected Y Position =>", this.scrollY);
					};
				}
			});
			
			return [
				index > 0 && (<View key={index} style={styles.separator} />),
				newChild
			]
		});
		this.setState({
			children: childrenRender
		});
	}

	getSelectedLabel = () => {
		const { selected } = this.state;
		const { children } = this.props;

		if (selected != null) {
			React.Children.map(children, (child, index) => {
				if (child.props.value == selected) {
					console.log("Selected Label =>", child.props.value);
					this.setState({
						selectedLabel: child.props.label,
						selectedKey: child.props.key || index,
					})
				}
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
			<TouchableOpacity activeOpacity={0.9} style={[styles.inputStyle, this.props.style]} onPress={() => { this.showSelectModal() }}>
				{/* Get title of the select element */}
				{this.getSelectTitle()}
				
				{/* Modal to display on touch */}
				<Modal visible={this.state.visible} onRequestClose={() => this.handleDismiss()} transparent>
					<View style={[styles.upperView, {height:'60%'}]}>
						<TouchableOpacity activeOpacity={1} onPress={() => this.handleDismiss()} style={{flex:1}} />
					</View>
					<View style={[styles.lowerView, this.props.containerStyle]}>
						
						{/* Header */}
						<View style={styles.pickerHeader}>
							<View style={{flex:1}}>
							
							</View>
							<TouchableOpacity onPress={() => this.onValueChange()} activeOpacity={0.9} style={[{padding:5}, styles.px10]}>
								<Text style={[styles.defaultButtonTextStyle, this.props.doneButtonTextStyle]}>{this.props.doneButtonText || 'Done'}</Text>
							</TouchableOpacity>
						</View>
						
						{/* Body */}
						<ScrollView
							onLayout={event => {this.setScrollViewPosition()}}
							ref={el => {this.selectionView = el}}
							>
							<View style={styles.pickerBody}>
								{this.state.children}
							</View>
						</ScrollView>
					</View>
				</Modal>
			</TouchableOpacity>
		);
	}

	setScrollViewPosition = () => {
		setTimeout(() => {
			if (this.selectionView != null) this.selectionView.scrollTo({x:0, y:this.scrollY, duration:0, animated:false});
		}, 200); 
		// Reason for setting timeout is because on iOS, the children elements might have not fully rendered before this method is fired. We have to get a way to slow it down and get the latest scrollY;
	}

	static Item = PickerItem;

}

const styles = StyleSheet.create({
	transparent: {
		backgroundColor:'#00000000',
	},
	upperView: {
		backgroundColor:'#00000044'
	},
	lowerView: {
		backgroundColor:'#FFFFFF',
		height: '40%',
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
		color: '#757575',
		fontWeight: '400',
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
		fontSize: 15,
		color:'#252525'
	},
	px10: {
		paddingHorizontal: 10,
	},
	py10: {
		paddingVertical: 10,
	}
});

AppRegistry.registerComponent('SelectPicker', () => SelectPicker);