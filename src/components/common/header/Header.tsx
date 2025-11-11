import React from 'react'
import Topbar from '@/components/common/topbar/Topbar'
import Menu from '@/components/common/menu/Menu'

export default function Header() {
  return (
    <div className='w-full absolute z-50'>
      <Topbar />
      <Menu />
    </div>
  )
}
