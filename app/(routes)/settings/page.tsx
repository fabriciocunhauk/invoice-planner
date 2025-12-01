"use client";

import { useFinance } from "@/app/context/FinanceContext";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Calculator, DollarSign, Percent } from "lucide-react";
// import { formatCurrency } from "@/app/utils/calculator";

export default function Settings() {
  const { taxSettings } = useFinance();

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-6 md:pt-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your tax and business settings
        </p>
      </div>

      {/* Tax Settings */}
      <Card className="p-6 mb-6 bg-gradient-card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Tax Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your tax calculation preferences
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="taxRate"
                className="flex items-center text-foreground mb-2"
              >
                <Percent className="w-4 h-4 mr-2" />
                Tax Rate
              </Label>
              <Input
                id="taxRate"
                type="number"
                value={taxSettings.taxRate}
                readOnly
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Your estimated self-employment tax rate
              </p>
            </div>

            <div>
              <Label
                htmlFor="quarterlyPayment"
                className="flex items-center text-foreground mb-2"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Quarterly Payment Goal
              </Label>
              <Input
                id="quarterlyPayment"
                type="number"
                value={taxSettings.estimatedQuarterlyPayment}
                readOnly
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Target amount for quarterly tax payments
              </p>
            </div>
          </div>

          <div>
            <Label className="text-foreground mb-3 block">
              Deductible Expense Categories
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {taxSettings.deductibleExpenseCategories.map(
                (category: string) => (
                  <div
                    key={category}
                    className="px-3 py-2 rounded-lg bg-success/10 text-success text-sm font-medium text-center"
                  >
                    {category}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Business Info */}
      <Card className="p-6 bg-gradient-card">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Business Information
        </h2>
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="businessName"
              className="text-foreground mb-2 block"
            >
              Business Name
            </Label>
            <Input
              id="businessName"
              placeholder="Your Business Name"
              className="bg-background"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground mb-2 block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="business@example.com"
              className="bg-background"
            />
          </div>
          <div>
            <Label htmlFor="address" className="text-foreground mb-2 block">
              Business Address
            </Label>
            <Input
              id="address"
              placeholder="123 Business St, City, State ZIP"
              className="bg-background"
            />
          </div>
        </div>
        <Button className="mt-6 bg-gradient-primary hover:opacity-90">
          Save Changes
        </Button>
      </Card>

      {/* Tax Information Card */}
      <Card className="p-6 mt-6 bg-gradient-primary text-primary-foreground">
        <h3 className="text-lg font-semibold mb-2">Tax Tip</h3>
        <p className="text-sm opacity-90">
          As a freelancer, you&apos;re typically required to make quarterly
          estimated tax payments. Keep track of your income and deductible
          expenses throughout the year to avoid surprises at tax time. Consider
          consulting with a tax professional for personalized advice.
        </p>
      </Card>
    </div>
  );
}
