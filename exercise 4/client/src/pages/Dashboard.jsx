import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TransactionForm from "@/components/dashboard/TransactionForm";
import TransactionList from "@/components/dashboard/TransactionList";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Dashboard = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleCreateTransaction = () => {
    setShowCreateForm(true);
  };

  const handleFormClose = () =>{
    setShowCreateForm(false);
    setEditingTransaction(null);
  }

 

  return (
    <div className="p-4">

      <DashboardHeader onCreateTransaction={ handleCreateTransaction } />

      <TransactionForm
        open={showCreateForm || !!editingTransaction}
        onOpenChange={handleFormClose}
        transaction={editingTransaction}
      />

      <TransactionList
      setEditingTransaction={setEditingTransaction}
      />

    </div>
  );
};

export default Dashboard;
