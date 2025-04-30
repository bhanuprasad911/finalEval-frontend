import React from 'react'
import style from '../styles/plan.module.css'
import checkicon from '../assets/checkicon.svg'

function plan({plan}) {
  return (
    <div className={style.main}>
        <h2 className={style.title}>{plan.title}</h2><br />
        <p className={style.description}>{plan.description}</p><br /><br />
        <div className={style.price}>
            <h2 className={style.pricetag}>{plan.price}</h2><p> /month</p>
        </div><br />
        <p>what's included</p>
        {
            plan.features.map((item, index) => {
                return (
                    <div className={style.feature} key={index}>
                        <img src={checkicon} />
                        <p>{item}</p>
                        </div>
                        )
                        })
        }
        <br />
        <button className={style.signbutton}>SIGN UP FOR {plan.title}</button>


      
    </div>
  )
}

export default plan
