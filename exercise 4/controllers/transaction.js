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

export const monthlySummary = async (req, res, next) => {
  const { date } = req.query;

  try {
    const parsedDate = new Date(date);

    if (!date || isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date value." });
    }

    const startOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
    const endOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 1);

    const summary = await Transaction.aggregate([
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
        },
      },
    ]);

    if (summary.length === 0) {
      return res.status(404).json({ message: "No transactions found for this month." });
    }

    res.json(summary);
  } catch (error) {
    next(error);
  }
};


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
