"use client";

import { useState } from "react";
import { Plus, Search, Mail, MapPin } from "lucide-react";
import { useFinance } from "@/app/context/FinanceContext";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { format } from "date-fns";

export default function Clients() {
  const { clients, invoices } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats per client
  const getClientStats = (clientId: string) => {
    const clientInvoices = invoices.filter((inv) => inv.clientId === clientId);
    const totalRevenue = clientInvoices
      .filter((inv) => inv.status === "Paid")
      .reduce((sum, inv) => sum + inv.amount, 0);
    const pendingInvoices = clientInvoices.filter(
      (inv) => inv.status === "Sent" || inv.status === "Overdue"
    ).length;

    return {
      totalRevenue,
      pendingInvoices,
      totalInvoices: clientInvoices.length,
    };
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client relationships
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-card">
          <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
          <p className="text-3xl font-bold text-foreground">{clients.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-card">
          <p className="text-sm text-muted-foreground mb-1">Active Projects</p>
          <p className="text-3xl font-bold text-primary">
            {
              invoices.filter(
                (inv) => inv.status === "Sent" || inv.status === "Draft"
              ).length
            }
          </p>
        </Card>
        <Card className="p-4 bg-gradient-card">
          <p className="text-sm text-muted-foreground mb-1">Total Invoices</p>
          <p className="text-3xl font-bold text-foreground">
            {invoices.length}
          </p>
        </Card>
      </div>

      {/* Clients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClients.map((client) => {
          const stats = getClientStats(client.id);
          return (
            <Card
              key={client.id}
              className="p-6 bg-gradient-card hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {client.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Client since {format(client.createdAt, "MMM yyyy")}
                  </p>
                </div>
                {stats.pendingInvoices > 0 && (
                  <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
                    {stats.pendingInvoices} Pending
                  </Badge>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-start text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{client.address}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="text-lg font-bold text-success">
                    ${stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Invoices</p>
                  <p className="text-lg font-bold text-foreground">
                    {stats.totalInvoices}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
