import { Invoice, Expense, TaxSettings } from '@/app/types/data';

export function calculateTotalEarnings(invoices: Invoice[]): number {
  return invoices
    .filter(invoice => invoice.status === 'Paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
}

export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function calculateTaxableIncome(earnings: number, expenses: number): number {
  return Math.max(0, earnings - expenses);
}

export function calculateEstimatedTax(
  taxableIncome: number,
  taxSettings: TaxSettings
): number {
  return taxableIncome * (taxSettings.taxRate / 100);
}

export function calculatePendingRevenue(invoices: Invoice[]): number {
  return invoices
    .filter(invoice => invoice.status === 'Sent' || invoice.status === 'Overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
