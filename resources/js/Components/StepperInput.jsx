import { forwardRef, useEffect, useRef, useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default forwardRef(function StepperInput({ className = '', isFocused = false, onChange, value, ...props }, ref) {
    const input = ref ? ref : useRef();

    const [inputValue, setInputValue] = useState(value || 0);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleValueChange = (type) => {
        setInputValue(prevValue => {
            const newValue = type === '+' ? parseInt(prevValue) + 1 : parseInt(prevValue) - 1;
            const val =  newValue >= 0 ? newValue : 0;
            onChange({ target: { value: val }});
            return val;
        });
    };

    const handleChange = (e) => {
        setInputValue(parseInt(e.target.value));
        onChange(e);
    };

    return (
        <div className='py-2 px-2 inline-block bg-gray-100 dark:bg-gray-900 rounded-lg'>
            <div className="flex items-center gap-x-0.5">
                <Button type={'button'} className={'border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-1 rounded-2xl'}
                onClick={() => handleValueChange('-')}>
                    <MinusIcon className='w-3'/>
                </Button>
                <TextInput className={'p-0 w-14 bg-transparent text-center border-transparent  ' + className} value={inputValue} onChange={handleChange}/>
                <Button type={'button'} className={'border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-1 rounded-2xl'}
                onClick={() => handleValueChange('+')}>
                    <PlusIcon className='w-3'/>
                </Button>
            </div>
        </div>
    );
});
