"use client"

import Link from "next/link"
import { Search, ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export function SiteHeader() {
  const { setIsCartOpen, cartCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            SHOP
          </Link>
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            EXPLORE
          </Link>
          <Link href="#" className="hover:text-muted-foreground transition-colors">
            ABOUT
          </Link>
        </nav>

        {/* Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="font-serif text-3xl text-center tracking-tighter">
            Mush
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Sign up for our newsletter</span>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Search size={18} />
            </button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-secondary rounded-full transition-colors"
          >
            <span className="text-xs font-medium hidden md:inline-block">CART</span>
            <div className="relative">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4">
          <Link href="#" className="text-lg font-medium">
            Shop
          </Link>
          <Link href="#" className="text-lg font-medium">
            Explore
          </Link>
          <Link href="#" className="text-lg font-medium">
            About
          </Link>
          <div className="h-px bg-border my-2" />
          <Link href="#" className="text-sm text-muted-foreground">
            Sign up for newsletter
          </Link>
        </div>
      )}
    </header>
  )
}
