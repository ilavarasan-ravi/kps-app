import React from 'react'
import './menu-item.component.scss'

const MenuItem = ({ title, imageUrl, size }) => (
    <div
        style={{
            background: `url(${imageUrl})`
        }}
        // className='menu-item'
        className={`${size} menu-item`}
    >
        <div className='content'>
            <h2 className='title'> {title}</h2>
            <span className='sub-title'> SHOP NOW</span>
        </div>
    </div >
)

export default MenuItem;