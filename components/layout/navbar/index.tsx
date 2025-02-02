// components/Navbar.tsx
import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white border-b border-neutral-200">
      <nav className="flex items-center justify-between p-4 lg:px-6">
        {/* LEFT SECTION: Mobile Menu & Desktop Navigation Links */}
        <div className="flex items-center flex-1">
          {/* Mobile Menu (visible on small screens) */}
          <div className="block md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>
          {/* Desktop Navigation Links (visible on medium+ screens) */}
          {menu.length ? (
            <ul className="hidden md:flex gap-6 text-sm items-center ml-4">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* CENTER SECTION: Logo & Store Name */}
        <div className="flex items-center">
          <Link
            href="/"
            prefetch={true}
            className="flex items-center justify-center"
          >
            <LogoSquare />
            <div className="ml-2 text-sm font-medium uppercase hidden md:block">
              {SITE_NAME}
            </div>
          </Link>
        </div>

        {/* RIGHT SECTION: Search, Account & Cart */}
        <div className="flex items-center flex-1 justify-end space-x-4">
          {/* Search (only on medium+ screens) */}
          <div className="hidden md:block">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          {/* Optional: Account Link */}
          <Link
            href="/account"
            className="hidden md:block text-neutral-500 hover:text-black"
          >
            Account
          </Link>
          {/* Cart Modal */}
          <CartModal />
        </div>
      </nav>
    </div>
  );
}