import React from 'react'
import { Link } from '@inertiajs/react';
import { ChevronDown } from 'react-feather';

const ProfileDropdown = ({ children, name, role, avatarSrc }) => {
  return (
    <details className="dropdown dropdown-end">
      {/* button */}
      <summary className="btn bg-base-100 hover:bg-base-200/80 rounded-full h-11 min-h-11 px-1 flex gap-1 items-center">
        <div className="avatar">
          <div className="w-9 rounded-full">
            <img src={avatarSrc} />
          </div>
        </div>
        <span className="flex flex-col items-start text-graphite">
          <h5 className="text-sm font-semibold">{name}</h5>
          <small className="text-xs opacity-70">{role}</small>
        </span>
        <ChevronDown className="w-4 h-4 ml-4" />
      </summary>
      {/* button end */}

      {/* dropdown content */}
      <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-md w-52">
        {children}
      </ul>
      {/* dropdown content end */}
    </details>
  )
}

const DropdownLink = ({ className = '', children, error = false, ...props }) => {
  return (
    <li>
      <Link {...props} className={`dropdown-item ${error && 'error'}`}>
        {children}
      </Link>
    </li>
  );
};

ProfileDropdown.Link = DropdownLink;
export default ProfileDropdown;
