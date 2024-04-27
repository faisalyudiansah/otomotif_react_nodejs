import React from 'react'

export const Navbar = () => {
  return (
    <div id='navbar' className="navbar bg-base-200 p-5">
      <div className="flex">
        <a className="btn btn-ghost text-2xl font-bold ml-5" href='/'>Otomotif</a>
      </div>
      <div className="flex-none ml-10">
        <ul className="menu menu-horizontal px-1">
          <li><a href='/'>Home</a></li>
        </ul>
      </div>
    </div>
  )
}