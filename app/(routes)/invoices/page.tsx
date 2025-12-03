"use client";

import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { useFinance } from "@/app/context/FinanceContext";
import { formatCurrency } from "@/app/utils/calculator";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

export default function Invoices() {
  const { invoices } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    Paid: "bg-success/10 text-success hover:bg-success/20",
    Sent: "bg-primary/10 text-primary hover:bg-primary/20",
    Draft: "bg-muted text-muted-foreground hover:bg-muted/80",
    Overdue: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track all your invoices
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by client or invoice number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-gradient-card">
          <p className="text-sm text-muted-foreground mb-1">Total</p>
          <p className="text-2xl font-bold text-foreground">
            {invoices.length}
          </p>
        </Card>
        <Card className="p-4 bg-gradient-card">
          <p className="text-sm text-muted-foreground mb-1">Paid</p>
          <p className="text-2xl font-bold text-success">
            {invoices.filter((i) => i.status === "Paid").length}
          </p>
        </Card>
        <Card className="p-4 bg-gradient-card">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold text-primary">
            {invoices.filter((i) => i.status === "Sent").length}
          </p>
        </Card>
        <Card className="p-4 bg-gradient-card">
          <p className="text-sm text-muted-foreground mb-1">Draft</p>
          <p className="text-2xl font-bold text-muted-foreground">
            {invoices.filter((i) => i.status === "Draft").length}
          </p>
        </Card>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {filteredInvoices.map((invoice) => (
          <Dialog key={invoice.id}>
            <Card className="p-6 bg-gradient-card hover:shadow-lg transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg text-foreground">
                      {invoice.id}
                    </h3>
                    <Badge className={statusColors[invoice.status]}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <p className="text-foreground font-medium mb-1">
                    {invoice.clientName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {invoice.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                    <span>Issued: {format(invoice.date, "MMM dd, yyyy")}</span>
                    <span>•</span>
                    <span>Due: {format(invoice.dueDate, "MMM dd, yyyy")}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-right">
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(invoice.amount)}
                  </p>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 cursor-pointer"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </Card>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invoice #{invoice.id}</DialogTitle>
                <DialogDescription>
                  View details for invoice from{" "}
                  <span className="font-medium">{invoice.clientName}</span>
                  {" — "}amount:{" "}
                  <span className="font-semibold">
                    {formatCurrency(invoice.amount)}
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium text-foreground">
                    {invoice.clientName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium text-foreground">
                    {invoice.description}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-semibold text-foreground text-lg">
                    {formatCurrency(invoice.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[invoice.status]}>
                    {invoice.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Issued</p>
                  <p className="font-medium text-foreground">
                    {format(invoice.date, "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due</p>
                  <p className="font-medium text-foreground">
                    {format(invoice.dueDate, "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
