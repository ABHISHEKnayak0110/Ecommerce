import React, { useState } from 'react'
import style from "./Card.module.scss"
import Counter from '../counter/Counter';


interface CardProps {
    img: string;
    title: string;
    quantity: number
    price: number
    handleAddToCart: (data: any) => void
    allDetails: any
}
function Card(props: CardProps) {
    const [quantity, setQuantity] = useState<number | undefined>(0)
    
       /** Function for getting value from counter  **/
    const getQuantity = (value: number) => {
        setQuantity(value)
    }
       /** Function for Add Cart   **/
    const handleAddTOCart = () => {
        let body = {
            itemId: props.allDetails?.id,
            quantity: quantity,
            name: props.title,
            userId: 1   // we dont have login so i am considering every time same user
        }
        props.handleAddToCart(body)
        setQuantity(0)
    }

    return (
        <div className={style.cardWrapper}>
            <img className={style.imgPoster} src={props.img}></img>
            <div className={style.title}>{props.title}</div>
            <div className={style.infoDiv}>
                <span className={style.styleDetails}>
                    <span>Price :</span>
                    <span>RS {props.price}</span>
                </span>
                <span className={style.styleDetails}>
                    <span>Quantity :</span>
                    <span>{props.quantity}</span>
                </span>
            </div>
            <div className={style.incCounter}>
                <span>Add quantity :</span>
                <Counter data={quantity} getValue={getQuantity} />
            </div>
            <div className={style.buttonDiv}>
                <button onClick={handleAddTOCart}
                    disabled={quantity === 0 ? true : false}
                    className={quantity === 0 ? style.disableOpacity : ""}
                >Add To Cart
                </button>
            </div>
        </div>
    )
}

export default Card