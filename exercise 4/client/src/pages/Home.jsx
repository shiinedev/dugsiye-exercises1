import { Button } from "@/components/ui/button"
import {
  ArrowRight,
} from "lucide-react"
import { Link } from "react-router"

export default function Home() {
  return (
    <div className="min-h-screen  ">
   
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Take Control of Your
            <span className="text-blue-600 block">Financial Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Track expenses, set budgets, and achieve your financial goals with our intuitive personal finance management
            platform. Start building wealth today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
            <Button size="lg" className="text-lg px-8 py-6">
              Start  For Free 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 FinanceTrack. All rights reserved.</p>
          </div>
      </footer>
    </div>
  )
}
