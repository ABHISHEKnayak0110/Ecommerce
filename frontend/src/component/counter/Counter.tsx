import React, { useEffect, useState } from 'react'
import style from "./Counter.module.scss"

interface props {
    getValue: (value: number) => void
    data: number | undefined
}
function Counter(props: props) {
    const [value, setValue] = useState(0)

    /** Function for Increase Value  **/
    const increase = () => {
        setValue(value + 1)
        props.getValue(value + 1)
    }
    /** Function for Decrease Value  **/
    const decrease = () => {
        const data = value - 1 >= 0 ? value - 1 : 0
        setValue(data)
        props.getValue(data)
    }

     /** Setting Value from Outside **/
    useEffect(
        () => {
            if (props.data === 0) {
                setValue(0)
            }
        }, [props.data]
    )

    return (
        <div className={style.countWrapper}>
            <div className={style.sign} onClick={decrease}>-</div>
            <div className={style.value}>{value}</div>
            <div className={style.plus} onClick={increase}>+</div>
        </div>
    )
}

export default Counter