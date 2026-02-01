import React, { useId } from "react"

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div>
            {label && <label> </label>}
            <select className={`${className}`} {...props} ref={ref} id={id} >
                {options && options.map(option => {
                    <option value={option} key={option}>

                    </option>
                })}
            </select>
        </div>
    )
}


export default React.forwardRef(Select);