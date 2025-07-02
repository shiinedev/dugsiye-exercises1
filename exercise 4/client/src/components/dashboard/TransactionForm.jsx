import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/schemas/transaction";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorExtract } from "@/utils/errorUtils";
import api from "@/lib/apiClient";


const TransactionForm = ({ open, onOpenChange, transaction }) => {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      type: "expense",
      category:"",

    },
  });


  useEffect(()=>{
    if(transaction){
        console.log(transaction);
        
        form.setValue("title",transaction.title || "");
        form.setValue("amount",transaction.amount || "")
        form.setValue("category",transaction.category || "")
        form.setValue("type",transaction.type || "expense")
        form.setValue("date",transaction.date
          ? new Date(transaction.date).toISOString().split("T")[0]
          : "",)
    }
  },[transaction])

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data) => {
        const response = await api.post("/transaction/create",data);
        return response.data;
    },
    onSuccess:(data) =>{
        console.log('Transaction created successfully',data);
        queryClient.invalidateQueries(["transactions"])
        onOpenChange?.(false);
        form.reset()
    },
    onError:(err) =>{
        console.log("transaction creation error",errorExtract(err));
    }
  })
  const updateMutation = useMutation({
    mutationFn: async (data) => {
        const response = await api.put(`/transaction/${transaction._id}`,data);
        return response.data;
    },
    onSuccess:(data) =>{
        console.log('Transaction updated successfully',data);
        queryClient.invalidateQueries(["transactions"])
        onOpenChange?.(false);
        form.reset()
    },
    onError:(err) =>{
        console.log("transaction update error",errorExtract(err));
        form.reset()
    }
  })


  const onSubmit = (data) => {
    console.log(data);
    if(transaction){
        updateMutation.mutate(data)
    }else{
         createMutation.mutate(data)
    }
   
  };

  

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={"text-center"}>
              {transaction ? "Edit Transaction" : "Create Transaction"}
            </DialogTitle>
            <DialogDescription className={"text-center"}>
              {transaction ? "Update Your Transaction" : "Create New Transaction"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="enter your title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="enter your amount"
                         
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      Category
                      <FormControl>
                        <Input {...field} placeholder="enter category" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="Date"
                          {...field}
                          placeholder="Duration in minutes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className={"mt-2"}>
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Transaction </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionForm;
