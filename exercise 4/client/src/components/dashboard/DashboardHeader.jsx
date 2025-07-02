import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DashboardWelcome = ({ onCreateTransaction }) => {
  return (
    <div className="max-w-6xl mx-auto ">
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2 flex flex-col items-start">
              <CardTitle className="text-2xl">Welcome back!</CardTitle>
              <CardDescription className="text-base">
                Here's what's happening with your transactions today.
              </CardDescription>
            </div>
            {/* TODO: create new task */}
            <Button onClick={onCreateTransaction}>
              Create New Transaction
            </Button>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashboardWelcome;


//import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Separator } from "@/components/ui/separator"
// import {
//   ArrowDownIcon,
//   ArrowUpIcon,
//   ShoppingCart,
//   Car,
//   Home,
//   Utensils,
//   Gamepad2,
//   Briefcase,
//   PiggyBank,
//   CreditCard,
// } from "lucide-react"

// export default function MonthlyTransactionSummary() {
//   // Sample data - in real app this would come from your API
//   const monthlyData = {
//     month: "December 2024",
//     totalSpent: 3240.5,
//     totalEarned: 4500.0,
//     categories: [
//       {
//         name: "Groceries",
//         icon: ShoppingCart,
//         spent: 680.25,
//         earned: 0,
//         budget: 800,
//         color: "bg-red-500",
//       },
//       {
//         name: "Transportation",
//         icon: Car,
//         spent: 245.8,
//         earned: 0,
//         budget: 300,
//         color: "bg-blue-500",
//       },
//       {
//         name: "Housing",
//         icon: Home,
//         spent: 1200.0,
//         earned: 0,
//         budget: 1200,
//         color: "bg-purple-500",
//       },
//       {
//         name: "Dining Out",
//         icon: Utensils,
//         spent: 420.15,
//         earned: 0,
//         budget: 400,
//         color: "bg-orange-500",
//       },
//       {
//         name: "Entertainment",
//         icon: Gamepad2,
//         spent: 180.3,
//         earned: 0,
//         budget: 250,
//         color: "bg-pink-500",
//       },
//       {
//         name: "Salary",
//         icon: Briefcase,
//         spent: 0,
//         earned: 4200.0,
//         budget: 0,
//         color: "bg-green-500",
//       },
//       {
//         name: "Freelance",
//         icon: PiggyBank,
//         spent: 0,
//         earned: 300.0,
//         budget: 0,
//         color: "bg-emerald-500",
//       },
//       {
//         name: "Miscellaneous",
//         icon: CreditCard,
//         spent: 514.0,
//         earned: 0,
//         budget: 200,
//         color: "bg-gray-500",
//       },
//     ],
//   }

//   const netAmount = monthlyData.totalEarned - monthlyData.totalSpent
//   const isPositive = netAmount >= 0

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       {/* Header */}
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold tracking-tight">Monthly Summary</h1>
//         <p className="text-muted-foreground">{monthlyData.month}</p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
//             <ArrowDownIcon className="h-4 w-4 text-red-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">-${monthlyData.totalSpent.toLocaleString()}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
//             <ArrowUpIcon className="h-4 w-4 text-green-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">+${monthlyData.totalEarned.toLocaleString()}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
//             {isPositive ? (
//               <ArrowUpIcon className="h-4 w-4 text-green-500" />
//             ) : (
//               <ArrowDownIcon className="h-4 w-4 text-red-500" />
//             )}
//           </CardHeader>
//           <CardContent>
//             <div className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
//               {isPositive ? "+" : ""}${netAmount.toLocaleString()}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Categories Breakdown */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Category Breakdown</CardTitle>
//           <CardDescription>Detailed view of spending and earnings by category</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {monthlyData.categories.map((category, index) => {
//             const Icon = category.icon
//             const isExpense = category.spent > 0
//             const amount = isExpense ? category.spent : category.earned
//             const budgetUsed = category.budget > 0 ? (category.spent / category.budget) * 100 : 0

//             return (
//               <div key={category.name} className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className={`p-2 rounded-full ${category.color}`}>
//                       <Icon className="h-4 w-4 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-medium">{category.name}</p>
//                       {category.budget > 0 && (
//                         <p className="text-sm text-muted-foreground">Budget: ${category.budget.toLocaleString()}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-semibold ${isExpense ? "text-red-600" : "text-green-600"}`}>
//                       {isExpense ? "-" : "+"}${amount.toLocaleString()}
//                     </p>
//                     {category.budget > 0 && (
//                       <Badge variant={budgetUsed > 100 ? "destructive" : budgetUsed > 80 ? "secondary" : "outline"}>
//                         {budgetUsed.toFixed(0)}% used
//                       </Badge>
//                     )}
//                   </div>
//                 </div>

//                 {category.budget > 0 && <Progress value={Math.min(budgetUsed, 100)} className="h-2" />}

//                 {index < monthlyData.categories.length - 1 && <Separator />}
//               </div>
//             )
//           })}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
