

declare module 'react-native-select-picker' {
	
	export interface ItemProps {
		label: string;
		value: any;
		key?: string | number;
	}

	export class SelectPickerItem extends React.Component<ItemProps> {}

	export interface PickerProps {
		/** 
		 * Callback for when an item is selected
		 */
		onValueChange: (value: any, index: number) => void;
		
		/** 
		 * selected property to set the default selected value
		 */
		selected: any;

		/**
		 * dismissable property to set the modal as dismissable or not. 
		 */
		dismissable?: boolean;

		/**
		 * disabled property to set whole element as selectable or not.
		 */
		disabled?: boolean;

		/**
		 * placeholder property to show when nothing has been selected.
		 */
		placeholder?: string;

		/**
		 *  style sheet to use when an option is selected.
		 */
		onSelectedStyle?: StyleSheet;

		/**
		 *  style sheet to use when placeholder is still selected.
		 */
		placeholderStyle?: StyleSheet;

		/**
		 *  style sheet to use for the wrapping view
		 */
		style?: StyleSheet;

		/**
		 * container style sheet for the modal container holding the option values
		 */
		containerStyle?: StyleSheet;

		/**
		 * Done button text (located at the header section)
		 */
		doneButtonText?: string;

		/**
		 * Done button styling. (Text component styling)
		 */
		doneButtonTextStyle?: StyleSheet;
		
	}

	export default class SelectPicker extends React.Component<PickerProps> {

		/**
		 * The static class Item.
		 * used as: <SelectPicker.Item />
		 */
		static Item: typeof SelectPickerItem;
	}
}