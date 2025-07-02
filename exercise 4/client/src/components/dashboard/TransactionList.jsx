import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/apiClient";
import { ArrowDownIcon, ArrowUpIcon, Edit2, Loader, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TransactionList = ({ setEditingTransaction }) => {
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("/transaction");
      return response.data;
    },
    retry: 1,
  });

  const getSpends = () =>{
    let totalSpent = 0;
    let totalEarned = 0;
    if(data){
       data.filter(transaction =>{ transaction.type == "income" ?
        totalEarned += transaction.amount : 
        totalSpent += transaction.amount})
    }


    return{totalEarned,totalSpent}
  }

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/transaction/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      console.log("transaction deleted successfully");
    },
    onError: (err) => {
      console.log("deleting error:", err);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutateAsync(id);
  };

  if (isPending) {
    <div className="flex items-center space-x-2">
      <Loader />
      Loading....
    </div>;
  }

  const {totalEarned,totalSpent} = getSpends();
  console.log(totalEarned,totalSpent);
  

  return (
    <div className="max-w-6xl mx-auto  mt-4 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -${totalSpent}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +${totalEarned}
            </div>
          </CardContent>
        </Card>
      </div>
      <Table className="border px-4">
        <TableCaption>A list of your Transaction.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? (
            data.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className="font-medium">
                  {new Date(transaction.date).toISOString().split("T")[0]}
                </TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell
                  className={`${
                    transaction.type == "income"
                      ? "text-green-500 font-medium"
                      : "text-red-500 font-medium"
                  }`}>
                  {transaction.type ? "-" : "+"} ${transaction.amount}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant={"outline"}
                    onClick={() => setEditingTransaction(transaction)}>
                    <Edit2 />
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => handleDelete(transaction._id)}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell className="text-center p-2">
              No Transactions Found
            </TableCell>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
