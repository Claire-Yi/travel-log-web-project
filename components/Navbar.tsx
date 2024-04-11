import { NAV_LINKS } from '@/app/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ButtonPrimary from './Button'

const Navbar = () => {
  return (
      <nav className="px-24 py-6 w-full flex justify-between bg-slate-50 z-30">
        <Link href={"/"}>
          <Image src="/Triplog.svg" alt="logo" width={74} height={29} />
        </Link>
        <ul className="hidden gap-12 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link href="{link.href}" key={link.key} className="text-sm text-neutral-500 flex-center cursor-pointer transition-all hover:font-medium">
                {link.label}
              </Link>
            ))}
          </ul>
      </nav>
  )
}

export default Navbar
