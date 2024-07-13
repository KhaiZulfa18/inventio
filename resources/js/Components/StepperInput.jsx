import { forwardRef, useEffect, useRef, useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default forwardRef(function StepperInput({ className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    const [value, setValue] = useState(props.value || 0);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const handleValueChange = (type) => {
        setValue(prevValue => {
            const newValue = type === '+' ? prevValue + 1 : prevValue - 1;
            return newValue >= 0 ? newValue : 0;
        });
    };

    const handleChange = (e) => {
        setValue(parseInt(e.target.value, 10) || 0);
    };

    return (
        <div className='py-2 px-2 inline-block bg-slate-200 dark:bg-gray-900 rounded-lg'>
            <div className="flex items-center gap-x-0.5">
                <Button type={'button'} className={'border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-1 rounded-l rounded-r-none'}
                onClick={() => handleValueChange('-')}>
                    <MinusIcon className='w-3'/>
                </Button>
                <TextInput className={'p-0 w-14 bg-transparent text-center border-transparent  ' + className} value={value} onChange={handleChange} {...props}/>
                <Button type={'button'} className={'border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-1 rounded-r rounded-l-none'}
                onClick={() => handleValueChange('+')}>
                    <PlusIcon className='w-3'/>
                </Button>
            </div>
        </div>
    );
});
