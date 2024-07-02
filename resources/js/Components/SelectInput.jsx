import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ children, className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-900 text-gray-700 dark:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        >
            {children}
        </select>
    );
});
