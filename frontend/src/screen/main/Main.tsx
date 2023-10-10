import React, { useEffect, useState } from 'react'
import style from "./Main.module.scss"
import Header from '../../component/header/Header'
import Card from '../../component/card/Card'
import bottle from "../../img/bottle.webp"
import chair from "../../img/chair.jpeg"
import axios from 'axios'
import PopUp from '../../component/popUp/PopUp'
import { toast } from "react-toastify";

function Main() {
  const [allItem, setAllItem] = useState([])
  const [totalCartItem, setTotalCartItem] = useState<number>(0)
  const [cartItemList, setCartItemList] = useState([])
  const [openCart, setOpenCart] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [checkoutDetails, setCheckoutDetails] = useState<any>({})
  const imgArray = [bottle, chair]

  /** Get all items **/
  const getAllItems = () => {
    axios.get('http://localhost:3050/api/item/allItems').then(
      res => {
        setAllItem(res?.data?.data)
        getAllCartItem()
      }
    ).catch(e => console.log(e))
  }
  /** Default Call  **/
  useEffect(
    () => {
      getAllItems()
    }, []
  )

  /** Function for adding in cart **/
  const handleAddToCart = (data: any) => {
    axios.post("http://localhost:3050/api/item/addToCart", data).then(
      (res: any) => {
        getAllCartItem()
        getAllItems()
        toast.success("Item Added Successfully to Cart!")
  
      }
    ).catch(err => {
      console.log(err?.response?.data?.error)
      toast.error(err?.response?.data?.error)
    })
  }

  /** Function for get All Items in Cart  **/
  const getAllCartItem = async () => {
    try {
      const itemList = await axios.get('http://localhost:3050/api/item/allCartItem')
      // 1 is user id 
      setCartItemList(itemList?.data?.data?.["1"] || [])
      const total = itemList?.data?.data?.["1"]?.reduce((total: number, item: any) => {
        return total += item?.quantity
      }, 0)
      setTotalCartItem(total ? total : 0)
    } catch (err) {
      console.log(err)
    }

  }
  /** Function for Open Pop Up Cart   **/
  const handleCartClick = () => {
    setOpenCart(true)
  }
  /** Function for Close Pop Up Cart   **/
  const handleClose = () => {
    setOpenCart(false)
  }
  /** Function for Close Pop Up Cart Detaiils **/
  const handleCloseChecOut = () => {
    setShowDetails(false)
  }
  /** Function for Calling Api for Checkout   **/
  const handleCheckout = () => {
    axios.post("http://localhost:3050/api/checkout", { userId: 1 }).then(
      res => {
        setCheckoutDetails(res?.data || {})
        getAllCartItem()
        getAllItems()
        setOpenCart(false)
        setShowDetails(true)
      }
    ).catch(err => console.log(err))
  }

  return (
    <div className={style.mainWrapper}>
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.cardHeader}>
        {totalCartItem > 0 && <span>Click to check Cart items</span>}
        <p onClick={handleCartClick}
        >{`Cart Data : ${totalCartItem}`}</p></div>
      <div className={style.itemContainer}>
        {
          allItem?.map((item: any, index) => {
            return <div className={style.cardDiv} key={index}>
              <Card
                img={imgArray[index % 2]}
                price={item?.price}
                quantity={item?.stock}
                title={item?.name}
                allDetails={item}
                handleAddToCart={handleAddToCart}
              />
            </div>
          })
        }
      </div>
      {
        openCart &&
        <PopUp>
          <div className={style.popUpCartItem}>
            <div className={style.crossIcon} onClick={() => handleClose()}><span>X</span></div>
            <div className={style.titleName}>Cart Items</div>
            <div className={style.cartListDiv}>
              {
                cartItemList?.length ?
                  <div className={style.itemList}>
                    <ol>
                      {
                        cartItemList?.map((item: any) => {
                          return <li >
                            <span>{item?.name}</span>
                            <span> quantity : {item.quantity}</span>
                          </li>
                        })
                      }
                    </ol>
                    <div className={style.buttonDivCheckout}>
                      <button onClick={handleCheckout}>Check out</button>
                    </div>
                  </div>

                  :

                  <p className={style.noItem}>No Item </p>
              }
            </div>

          </div>
        </PopUp>
      }
      {
        showDetails &&
        <PopUp>
          <div className={style.popUpCartItem}>
            <div className={style.crossIcon} onClick={() => handleCloseChecOut()}><span>X</span></div>
            <div className={style.titleName}>Check Out Details:</div>
            <div className={style.detailsDiv}>
              {Object.keys(checkoutDetails)?.map((data: any, index) => {
                return <li key={index} >
                  <span>{`${data} =  ${checkoutDetails?.[data]} ${index < 2 ? "Rs" : ""}`}</span>
                </li>
              })
              }
            </div>

          </div>
        </PopUp>
      }
    </div>
  )
}

export default Main