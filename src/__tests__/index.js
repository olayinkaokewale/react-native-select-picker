import React, { useState } from 'react';
import {create} from 'react-test-renderer';
import Logger from '../utils/logger';
import SelectPicker from '..';

const options = ["Apple", "Banana", "Orange"];
const TestComponent = ({}) => {
    const [selected, setSelected] = useState();

    return (
        <>
            <SelectPicker selected={selected} onValueChange={val => {
                setSelected(val);
            }}>
                {Object.values(options).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                ))}
            </SelectPicker>
        </>
    )
}

test('Expects index to be successfully rendered', () => {
    const renderer = create(
        <TestComponent />
    );
    Logger.log(renderer.toJSON());
});
