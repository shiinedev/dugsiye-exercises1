"use client"

import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart, type Product } from "@/lib/cart-context"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"

// Mock Data
const CATEGORIES = [
  {
    id: "cat-1",
    name: "Bathmats",
    count: 4,
    image: "https://images.unsplash.com/photo-1694796446470-71f9874f73ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJhdGhtYXRzJTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    color: "bg-[#F0EFE9]",
  },
  {
    id: "cat-2",
    name: "Rugs",
    count: 8,
    image: "https://plus.unsplash.com/premium_photo-1725721362512-2f47d969e554?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UnVncyUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
    color: "bg-[#E8E6E1]",
  },
  {
    id: "cat-3",
    name: "Pillows",
    count: 5,
    image: "https://plus.unsplash.com/premium_photo-1661884177973-3068b241e80d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvenktYmVkcm9vbS1pbnRlcmlvci18ZW58MHx8MHx8fDA%3D",
    color: "bg-[#F5F5F0]",
  },
]

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Moss Garden Rug",
    category: "Rugs",
    price: 245.0,
    image: "https://media.istockphoto.com/id/2213687739/photo/grass-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=3I7vbe-ABuGyoTLhYELP2DMeTxREl_KsukQOaVVwbmo=",
  },
  {
    id: "p2",
    name: "Cloud Form Pillow",
    category: "Pillows",
    price: 85.0,
    image: "https://plus.unsplash.com/premium_photo-1753401940479-6dbe150d40d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2xvdWQlMjBGb3JtJTIwUGlsbG93fGVufDB8fDB8fHww",
  },
  {
    id: "p3",
    name: "Abstract Wave Mat",
    category: "Bathmats",
    price: 65.0,
    image: "https://images.unsplash.com/photo-1719836567950-b0127bbbdf2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWJzdHJhY3QlMjBXYXZlJTIwTWF0fGVufDB8fDB8fHww",
  },
  {
    id: "p4",
    name: "Pebble Stack",
    category: "Decor",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1622561924156-808a6331524e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGViYmxlJTIwU3RhY2t8ZW58MHx8MHx8fDA%3D",
  },
]

export default function Home() {
  const { addItem } = useCart()

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full px-4 pt-8 pb-16 md:py-12">
          <div className="container mx-auto">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-[#EAE8E2]">
              <Image src="https://images.unsplash.com/photo-1678203699263-917199c725b2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero Image" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black/5" />
            </div>

            <div className="mt-12 max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight text-balance">
                Welcome to a new dimension of home decor —{" "}
                <span className="text-muted-foreground">
                  Mush Studios blends intricate design, considered function and luxury materials to transform your home.
                </span>
              </h1>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className={`group relative aspect-[4/5] ${cat.color} rounded-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 duration-300`}
                >
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center z-10">
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={cat.image || "/placeholder.svg"}
                        alt={cat.name}
                        fill
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                    <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-2">
                      {cat.count} PRODUCTS
                    </p>
                    <h3 className="text-2xl font-serif">{cat.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 px-4 border-y border-border/50">
          <div className="container mx-auto text-center max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-6">RECOGNITION</p>
            <blockquote className="text-2xl md:text-4xl font-serif leading-relaxed mb-8">
              "Playful, vibrant, and bizarrely compelling."
            </blockquote>
            <div className="font-bold text-xl tracking-tight">t-mag</div>
          </div>
        </section>

        {/* Featured / Shop Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-4">Curated Collection</h2>
                <p className="text-muted-foreground max-w-md">Hand-picked favorites for the modern sanctuary.</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors">
                View all products <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => addItem(product)}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
                      aria-label="Add to cart"
                    >
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <span className="font-medium">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <button className="inline-flex items-center gap-2 text-sm font-medium border border-border px-6 py-3 rounded-full hover:bg-secondary transition-colors">
                View all products <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Feature Banner */}
        <section className="px-4 pb-24">
          <div className="container mx-auto">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
              <Image src="https://plus.unsplash.com/premium_photo-1661884177973-3068b241e80d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvenktYmVkcm9vbS1pbnRlcmlvci18ZW58MHx8MHx8fDA%3D" alt="Interior Feature" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white max-w-2xl leading-tight mb-8">
                  Escape reality without leaving your bedroom
                </h2>
                <button className="w-fit px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
                  Explore Mush
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary pt-20 pb-10 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mush Studios</h4>
              <p className="text-sm leading-relaxed max-w-xs">
                We dream up products that bring otherworldly comfort to the home.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Instagram ↗
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Stockists
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Custom
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Samples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Newsletter</h4>
              <p className="text-sm mb-4">Receive 10% off your first order, exclusive updates, inspiration and more.</p>
              <div className="flex gap-2 border-b border-border pb-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted-foreground/70"
                />
                <button className="text-muted-foreground hover:text-foreground">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">USD</span>
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
              © 2025 Mush Studios, All rights reserved
            </div>
          </div>

          {/* Big Logo Footer */}
          <div className="mt-16 opacity-5 select-none pointer-events-none">
            <h1 className="text-[15vw] leading-none text-center font-serif tracking-tighter">Mush</h1>
          </div>
        </div>
      </footer>
    </div>
  )
}
