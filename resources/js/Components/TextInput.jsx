import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                ' focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-900 ' +
                className
            }
            ref={input}
        />
    );
});
