"use client";

import { DollarSign, TrendingUp, Receipt, Calculator } from "lucide-react";
import { useFinance } from "@/app/context/FinanceContext";
import {
  calculateTotalEarnings,
  calculateTotalExpenses,
  calculateTaxableIncome,
  calculateEstimatedTax,
  calculatePendingRevenue,
  formatCurrency,
} from "@/app/utils/calculator";
import MetricCard from "@/app/components/MetricCard";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { format } from "date-fns";

export default function Dashboard() {
  const { invoices, expenses, taxSettings } = useFinance();

  const totalEarnings = calculateTotalEarnings(invoices);
  const totalExpenses = calculateTotalExpenses(expenses);
  const taxableIncome = calculateTaxableIncome(totalEarnings, totalExpenses);
  const estimatedTax = calculateEstimatedTax(taxableIncome, taxSettings);
  const pendingRevenue = calculatePendingRevenue(invoices);

  // Get recent transactions
  const recentInvoices = [...invoices]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const statusColors: Record<string, string> = {
    Paid: "bg-success/10 text-success hover:bg-success/20",
    Sent: "bg-primary/10 text-primary hover:bg-primary/20",
    Draft: "bg-muted text-muted-foreground hover:bg-muted/80",
    Overdue: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your financial overview.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Earnings"
          value={formatCurrency(totalEarnings)}
          subtitle="Paid invoices"
          icon={DollarSign}
          variant="success"
          trend={{ value: "12.5%", isPositive: true }}
        />
        <MetricCard
          title="Pending Revenue"
          value={formatCurrency(pendingRevenue)}
          subtitle="Awaiting payment"
          icon={TrendingUp}
          variant="warning"
        />
        <MetricCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          subtitle="Deductible costs"
          icon={Receipt}
          variant="default"
        />
        <MetricCard
          title="Estimated Tax"
          value={formatCurrency(estimatedTax)}
          subtitle={`${taxSettings.taxRate}% of taxable income`}
          icon={Calculator}
          variant="default"
        />
      </div>

      {/* Tax Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 lg:col-span-2 bg-gradient-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Tax Calculation Breakdown
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-muted-foreground">Gross Income</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(totalEarnings)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-muted-foreground">Deductible Expenses</span>
              <span className="font-semibold text-foreground">
                -{formatCurrency(totalExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="font-medium text-foreground">
                Taxable Income
              </span>
              <span className="font-bold text-foreground">
                {formatCurrency(taxableIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-medium text-foreground">
                Estimated Tax Due ({taxSettings.taxRate}%)
              </span>
              <span className="font-bold text-lg text-primary">
                {formatCurrency(estimatedTax)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-primary text-primary-foreground">
          <h3 className="text-lg font-semibold mb-2">Net Income</h3>
          <p className="text-4xl font-bold mb-4">
            {formatCurrency(taxableIncome)}
          </p>
          <p className="text-sm opacity-90">After deductible expenses</p>
          <div className="mt-6 pt-6 border-t border-primary-foreground/20">
            <p className="text-sm opacity-90 mb-1">Quarterly Payment</p>
            <p className="text-xl font-semibold">
              {formatCurrency(taxSettings.estimatedQuarterlyPayment)}
            </p>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6 bg-gradient-card">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Recent Invoices
        </h2>
        <div className="space-y-3">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <p className="font-medium text-foreground">
                    {invoice.clientName}
                  </p>
                  <Badge className={statusColors[invoice.status]}>
                    {invoice.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {invoice.description}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-foreground">
                  {formatCurrency(invoice.amount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(invoice.date, "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
