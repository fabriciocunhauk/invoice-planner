"use client";

import { useState } from "react";
import { Plus, Search, TrendingDown } from "lucide-react";
import { useFinance } from "@/app/context/FinanceContext";
import { calculateTotalExpenses, formatCurrency } from "@/app/utils/calculator";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { format } from "date-fns";

const categoryColors: Record<string, string> = {
  "Office Supplies": "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
  Software: "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20",
  Marketing: "bg-pink-500/10 text-pink-600 hover:bg-pink-500/20",
  Travel: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
  Meals: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20",
  Equipment: "bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20",
  Utilities: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
  Other: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20",
};

export default function Expenses() {
  const { expenses } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");

  const totalExpenses = calculateTotalExpenses(expenses);

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Expenses</h1>
          <p className="text-muted-foreground">
            Track and categorize your business expenses
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Total Expenses Card */}
      <Card className="p-6 mb-6 bg-gradient-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
            <p className="text-4xl font-bold text-foreground">
              {formatCurrency(totalExpenses)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {expenses.length} expense{expenses.length !== 1 ? "s" : ""}{" "}
              recorded
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <TrendingDown className="w-8 h-8 text-destructive" />
          </div>
        </div>
      </Card>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Breakdown */}
      <Card className="p-6 mb-6 bg-gradient-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Expenses by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <div key={category} className="p-4 rounded-lg bg-background/50">
              <Badge
                className={categoryColors[category] || categoryColors.Other}
              >
                {category}
              </Badge>
              <p className="text-lg font-bold text-foreground mt-2">
                {formatCurrency(amount as number)}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Expenses List */}
      <div className="space-y-3">
        {filteredExpenses
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((expense) => (
            <Card
              key={expense.id}
              className="p-5 bg-gradient-card hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge
                      className={
                        categoryColors[expense.category] || categoryColors.Other
                      }
                    >
                      {expense.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(expense.date, "MMM dd, yyyy")}
                    </span>
                  </div>
                  <p className="font-medium text-foreground">
                    {expense.description}
                  </p>
                </div>
                <div className="ml-4">
                  <p className="text-xl font-bold text-foreground">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
