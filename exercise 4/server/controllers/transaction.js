import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res, next) => {
  let { date } = req.body;
  try {
    date = new Date(date).toDateString();
    console.log(date);

    const transaction = await Transaction.create({
      ...req.body,
      date,
      createdBy: req.user._id,
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const getMyTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.find({ createdBy: req.user._id });
    if (!transaction)
      return res.status(404).json({ message: "transactions not found" });

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

// export const monthlySummary = async (req, res, next) => {
//   const { date } = req.query;

//   try {
//     const parsedDate = new Date(date);

//     if (!date || isNaN(parsedDate.getTime())) {
//       return res.status(400).json({ message: "Invalid date value." });
//     }

//     const startOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
//     const endOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 1);

//     const summary = await Transaction.aggregate([
//       {
//         $match: {
//           date: { $gte: startOfMonth, $lt: endOfMonth }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             category: "$category",
//             type: "$type",
//           },
//           total: { $sum: "$amount" },
//         },
//       },
//     ]);

//     if (summary.length === 0) {
//       return res.status(404).json({ message: "No transactions found for this month." });
//     }

//     res.json(summary);
//   } catch (error) {
//     next(error);
//   }
// };


export const updateTransactions = async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!transaction)
      return res.status(404).json({ message: "transactions not found" });

    res.json(transaction);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction)
      return res.status(404).json({ message: "transactions not found" });

    res.json({ message: "transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const monthlySummary = async (req, res, next) => {
  const { date } = req.query;

  try {
    const parsedDate = new Date(date);

    if (!date || isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date value." });
    }

    const startOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
    const endOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 1);

    // Enhanced aggregation to get both category totals and overall totals
    const [categoryData, overallTotals] = await Promise.all([
      // Category-wise aggregation
      Transaction.aggregate([
        {
          $match: {
            date: { $gte: startOfMonth, $lt: endOfMonth }
          }
        },
        {
          $group: {
            _id: {
              category: "$category",
              type: "$type",
            },
            total: { $sum: "$amount" },
            count: { $sum: 1 },
            transactions: {
              $push: {
                id: "$_id",
                title: "$title",
                amount: "$amount",
                date: "$date"
              }
            }
          },
        },
        {
          $group: {
            _id: "$_id.category",
            data: {
              $push: {
                type: "$_id.type",
                total: "$total",
                count: "$count",
                transactions: "$transactions"
              }
            }
          }
        }
      ]),

      // Overall totals aggregation
      Transaction.aggregate([
        {
          $match: {
            date: { $gte: startOfMonth, $lt: endOfMonth }
          }
        },
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    if (categoryData.length === 0) {
      return res.status(404).json({ message: "No transactions found for this month." });
    }

    // Calculate overall totals
    let totalSpent = 0;
    let totalEarned = 0;
    let expenseCount = 0;
    let incomeCount = 0;

    overallTotals.forEach(item => {
      if (item._id === 'expense') {
        totalSpent = item.total;
        expenseCount = item.count;
      } else if (item._id === 'income') {
        totalEarned = item.total;
        incomeCount = item.count;
      }
    });

    // Transform category data to match UI structure
    const categories = categoryData.map(category => {
      let spent = 0;
      let earned = 0;
      let expenseTransactions = [];
      let incomeTransactions = [];

      category.data.forEach(typeData => {
        if (typeData.type === 'expense') {
          spent = typeData.total;
          expenseTransactions = typeData.transactions;
        } else if (typeData.type === 'income') {
          earned = typeData.total;
          incomeTransactions = typeData.transactions;
        }
      });

      return {
        name: category._id,
        spent: spent,
        earned: earned,
        expenseCount: expenseTransactions.length,
        incomeCount: incomeTransactions.length,
        // Include sample transactions for reference
        recentTransactions: [...expenseTransactions, ...incomeTransactions]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3) // Get 3 most recent transactions per category
      };
    });

    // Format month string
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = `${monthNames[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`;

    // Structure response to match UI expectations
    const response = {
      month: month,
      totalSpent: totalSpent,
      totalEarned: totalEarned,
      netAmount: totalEarned - totalSpent,
      transactionCounts: {
        expenses: expenseCount,
        income: incomeCount,
        total: expenseCount + incomeCount
      },
      categories: categories,
      summary: {
        categoriesCount: categories.length,
        dateRange: {
          start: startOfMonth.toISOString(),
          end: endOfMonth.toISOString()
        }
      }
    };

    res.json(response);

  } catch (error) {
    console.error('Monthly summary error:', error);
    next(error);
  }
};