import { forwardRef, useEffect, useRef } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default forwardRef(function StepperInput({ className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='flex items-center'>
            <Button type={'button'} style={'primary'} className={'p-1 rounded-l rounded-r-none'}>
                <MinusIcon className='w-4'/>
            </Button>
            <TextInput className={'appearance-none w-14 text-center ' + className} {...props}/>
            <Button type={'button'} style={'primary'} className={'p-1 rounded-r rounded-l-none'}>
                <PlusIcon className='w-4'/>
            </Button>
        </div>
    );
});
