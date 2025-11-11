import React from 'react'
import Map from './Map'
import Subscription from './Subscription'
import Copyright from './Copyright'
import FooterInfo from './FooterInfo'

export default function Footer() {
  return (
    <div>
      <footer className="w-full border-t border-white">
        <Map />
        <Subscription />
        <FooterInfo />
        <Copyright />
      </footer>
    </div>
  )
}
