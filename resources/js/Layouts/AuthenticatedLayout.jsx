import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SidebarToggle from '@/Components/ui/toggles/SidebarToggle';
import ThemeToggle from '@/Components/ui/toggles/ThemeToggle';
import ProfileDropdown from '@/Components/ui/ProfileDropdown';
import { LogOut, User } from 'react-feather';
import SidebarLink from '@/Components/ui/SidebarLink';

export default function Authenticated({ user, header, children }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* navbar */}
        <div className="navbar bg-neutral">
          <div className="flex-1 flex gap-1 items-center">
            <SidebarToggle />
          </div>
          <div className="flex gap-2 items-center flex-none">
            <ThemeToggle />

            <ProfileDropdown name={user.name} role={"admin"} avatarSrc={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}>
              <ProfileDropdown.Link href={route('profile.edit')}>
                <User className='w-4 h-4' />
                Profile
              </ProfileDropdown.Link>
              <ProfileDropdown.Link href={route('logout')} method="post" as="button" error>
                <LogOut className='w-4 h-4' />
                Log Out
              </ProfileDropdown.Link>
            </ProfileDropdown>
          </div>
        </div>
        {/* navbar end */}

        {/* main content */}
        <main className="p-4 w-full">
          {children}
        </main>
        {/* main content end */}
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" aria-label="close sidebar" className="drawer-overlay" />
        <div className="sidebar">
          {/* sidebar icon */}
          <span className="p-5 flex items-center gap-2 mb-1">
            <ApplicationLogo />
            <span className="flex flex-col">
              <h1 className="text-lg text-primary font-bold">EffortLess</h1>
              <small className="text-grey-steel -mt-1">Simple Blog</small>
            </span>
          </span>
          {/* sidebar icon end */}

          {/* links */}
          <SidebarLink href={route('dashboard')} active={route().current('dashboard')}>
            <i data-feather="grid" />
            <span>Dashboard</span>
          </SidebarLink>
          {/* links end */}
        </div>
      </div>
    </div>

  );
}
