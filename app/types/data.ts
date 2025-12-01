export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue';

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  date: Date;
  dueDate: Date;
  description: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export type ExpenseCategory = 
  | 'Office Supplies'
  | 'Software'
  | 'Marketing'
  | 'Travel'
  | 'Meals'
  | 'Equipment'
  | 'Utilities'
  | 'Other';

export interface Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  date: Date;
  description: string;
  receiptUrl?: string;
}

export interface TaxSettings {
  taxRate: number; // Percentage
  estimatedQuarterlyPayment: number;
  deductibleExpenseCategories: ExpenseCategory[];
}
