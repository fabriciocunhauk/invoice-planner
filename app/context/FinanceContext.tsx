"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Client, Invoice, Expense, TaxSettings } from "@/app/types/data";

interface FinanceContextType {
  clients: Client[];
  invoices: Invoice[];
  expenses: Expense[];
  taxSettings: TaxSettings;
  addClient: (client: Client) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateTaxSettings: (settings: Partial<TaxSettings>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

// Mock data for demonstration
const mockClients: Client[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "billing@acme.com",
    address: "123 Business St, New York, NY 10001",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "TechStart Inc",
    email: "accounts@techstart.io",
    address: "456 Innovation Ave, San Francisco, CA 94102",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Global Solutions LLC",
    email: "finance@globalsolutions.com",
    address: "789 Enterprise Blvd, Austin, TX 78701",
    createdAt: new Date("2024-03-10"),
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    clientId: "1",
    clientName: "Acme Corporation",
    amount: 5000,
    status: "Paid",
    date: new Date("2024-10-01"),
    dueDate: new Date("2024-10-31"),
    description: "Website Development - October",
    items: [
      {
        id: "1",
        description: "Frontend Development",
        quantity: 40,
        rate: 100,
        amount: 4000,
      },
      {
        id: "2",
        description: "Design Services",
        quantity: 10,
        rate: 100,
        amount: 1000,
      },
    ],
  },
  {
    id: "INV-002",
    clientId: "2",
    clientName: "TechStart Inc",
    amount: 3500,
    status: "Sent",
    date: new Date("2024-10-15"),
    dueDate: new Date("2024-11-15"),
    description: "Mobile App Consultation",
    items: [
      {
        id: "1",
        description: "Consultation Hours",
        quantity: 35,
        rate: 100,
        amount: 3500,
      },
    ],
  },
  {
    id: "INV-003",
    clientId: "3",
    clientName: "Global Solutions LLC",
    amount: 7500,
    status: "Paid",
    date: new Date("2024-09-20"),
    dueDate: new Date("2024-10-20"),
    description: "E-commerce Platform Development",
    items: [
      {
        id: "1",
        description: "Backend Development",
        quantity: 50,
        rate: 120,
        amount: 6000,
      },
      {
        id: "2",
        description: "Integration Services",
        quantity: 15,
        rate: 100,
        amount: 1500,
      },
    ],
  },
];

const mockExpenses: Expense[] = [
  {
    id: "1",
    category: "Software",
    amount: 299,
    date: new Date("2024-10-01"),
    description: "Adobe Creative Cloud Subscription",
  },
  {
    id: "2",
    category: "Office Supplies",
    amount: 150,
    date: new Date("2024-10-05"),
    description: "Desk and Office Equipment",
  },
  {
    id: "3",
    category: "Marketing",
    amount: 500,
    date: new Date("2024-10-10"),
    description: "Google Ads Campaign",
  },
  {
    id: "4",
    category: "Software",
    amount: 199,
    date: new Date("2024-10-01"),
    description: "GitHub Pro Subscription",
  },
];

const defaultTaxSettings: TaxSettings = {
  taxRate: 25,
  estimatedQuarterlyPayment: 3000,
  deductibleExpenseCategories: [
    "Office Supplies",
    "Software",
    "Marketing",
    "Travel",
    "Equipment",
    "Utilities",
  ],
};

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [taxSettings, setTaxSettings] =
    useState<TaxSettings>(defaultTaxSettings);

  const addClient = (client: Client) => {
    setClients((prev) => [...prev, client]);
  };

  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [...prev, invoice]);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...invoice, ...updates } : invoice
      )
    );
  };

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const updateTaxSettings = (settings: Partial<TaxSettings>) => {
    setTaxSettings((prev) => ({ ...prev, ...settings }));
  };

  return (
    <FinanceContext.Provider
      value={{
        clients,
        invoices,
        expenses,
        taxSettings,
        addClient,
        addInvoice,
        updateInvoice,
        addExpense,
        deleteExpense,
        updateTaxSettings,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
