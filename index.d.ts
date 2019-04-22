

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
		onValueChange?: (value: any) => void;
		
		/** 
		 * selected property to set the default selected value
		 */
		selected?: any;
		
	}

	export default class SelectPicker extends React.Component<> {

		/**
		 * The static class Item.
		 * used as: <SelectPicker.Item />
		 */
		static Item: typeof SelectPickerItem;
	}
}