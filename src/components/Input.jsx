import { useId } from "react";
import React from "react";

const Input = React.forwardRef(({
    label = "",
    input = "text",
    className = "",
    ...props
}, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label className="inline-block -mb-1 pl-1" htmlFor={id}>
                {label}
            </label>}
            <input
                type={input}
                className={`${className}`}
                ref = {ref}
                {...props} id={id}
                >
            </input>


        </div>
    )

});


export default Input;