import React, { PureComponent } from 'react';
import { AppRegistry, View, Modal, TouchableOpacity, StyleSheet, ScrollView, Text, Platform, Animated, Dimensions, Picker } from 'react-native';
import PickerItem from './components/pickeritem';
import PickerItemNative from './components/picketitem-native';

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
			dismissable: this.props.dismissable || true,
			disabled: this.props.disabled || false,
			placeholder: this.props.placeholder || "",
			children: null,

			// ScrollView Position.
			scrollY: 0
		};
		
	}

	showSelectModal = () => {
		this.stateSet({
			visible: true
		});
	}

	componentDidMount() {
		this.componentIsMounted = true; // Set component is mounted to true so we know it is okay to update states.
		this.getSelectedLabel();
		this.renderChildren();
	}

	componentWillUnmount() {
		this.componentIsMounted = false; // Set component is mounted to false so we know it is not okay to update states.
	}

	/* Creation of our customized setState which checks if component is mounted or not */
	stateSet = (...args) => {
		if (this.componentIsMounted) {
			this.setState(...args); // set the state and call the callback function if any...
		}
		// else do nothing to prevent memory leak.
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.children != this.props.children) {
			this.stateSet({
				childrenItems: this.props.children
			}, () => {
				this.renderChildren();
			});
		}

		let update = {}; //Initialize the update object
		if (prevProps.selected != this.props.selected) update.selected = this.props.selected;
		if (prevProps.dismissable != this.props.dismissable) update.dismissable = this.props.dismissable;
		if (prevProps.disabled != this.props.disabled) update.disabled = this.props.disabled;
		if (prevProps.placeholder != this.props.placeholder) update.placeholder = this.props.placeholder;

		// Check if update object is not empty.
		if (Object.keys(update).length > 0) {
			this.stateSet(update);
		}
	}

	renderChildren = () => {
		const { childrenItems } = this.state;

		let childrenRender = null;
		if (Platform.OS != "ios" && Platform.OS != "macos") {
			childrenRender = React.Children.map(childrenItems, (child, index) => {
				let selected = (child.props.value == this.state.selected);
				/* let key = (child.props.key != null) ? child.props.key : index; */
				// if (selected) this.setScrollViewPosition();
				let newChild = React.cloneElement(child, {
					selected: selected,
					/* key: index, */
					pickSelected: (value, i, label) => {
						this.stateSet({
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
		} else {
			childrenRender = React.Children.map(childrenItems, (child, index) => {
				if (child.props.value == this.state.selected) {
					this.stateSet({
						selectedLabel: child.props.label
					});
				}
				return [
					(index == 0) && (<PickerItemNative label={this.state.placeholder != "" ? this.state.placeholder : "-- select --"} value={null} />),
					<PickerItemNative {...child.props} />
				]
			});
		}
		
		this.stateSet({
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
					this.stateSet({
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
			this.stateSet({
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
		if (this.state.selected != null && this.state.selected != undefined && String(this.state.selected).length > 0) {
			return (<Text numberOfLines={1} style={[styles.selectedTitleStyle, this.props.onSelectedStyle]}>{this.state.selectedLabel}</Text>);
		}
		
		return (<Text numberOfLines={1} style={[styles.placeholderTitleStyle, this.props.placeholderStyle]}>{this.props.placeholder}</Text>);
	}

	render() {
		return (
			<TouchableOpacity activeOpacity={0.9} style={[styles.inputStyle, this.props.style]} onPress={() => { this.showSelectModal() }}>
				{/* Get title of the select element */}
				{this.getSelectTitle()}
				
				{/* Modal to display on touch */}
				<Modal visible={this.state.visible} onRequestClose={() => this.onValueChange()} transparent>
					<View style={[styles.upperView, {height:'60%'}]}>
						<TouchableOpacity activeOpacity={1} onPress={() => this.onValueChange()} style={{flex:1}} />
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
						{(Platform.OS != "ios" && Platform.OS != "macos") && (<ScrollView
							onLayout={event => {this.setScrollViewPosition()}}
							ref={el => {this.selectionView = el}}
							>
							<View style={styles.pickerBody}>
								{this.state.children}
							</View>
						</ScrollView>)}
						{(Platform.OS == "macos" || Platform.OS == "ios") && (
							<Picker
								onValueChange={(item, index) => {
									this.stateSet({
										selected: item,
										selectedKey: index
									});
								}}
								selectedValue={this.state.selected}
								>
								{this.state.children}
							</Picker>
						)}
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