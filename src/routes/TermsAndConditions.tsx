import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/TermsAndConditions")({
  component: TermsAndConditionsPage,
});

function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-card p-8 sm:p-12 rounded-xl border border-border shadow-sm">
          
          <header className="border-b border-border pb-6 mb-8 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Terms and Conditions
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </header>

          <div className="prose prose-sm sm:prose max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>These terms and conditions outline the rules and regulations for the use of Decobay Interiors LLC's Website, located in The Bay Area, California, USA.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Decobay Interiors LLC if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Cookies</h3>
            <p>We employ the use of cookies. By accessing Decobay Interiors LLC, you agreed to use cookies in agreement with our Privacy Policy.</p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">License & Intellectual Property</h3>
            <p>Unless otherwise stated, Decobay Interiors LLC and/or its licensors own the intellectual property rights for all material on Decobay Interiors LLC. All intellectual property rights are reserved.</p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Note to Customer</h3>
            <p className="bg-muted/50 p-4 rounded-lg border border-border text-sm">
              ALL PAYMENTS MADE WITH CREDIT CARD SHALL BE SUBJECT TO A CONVENIENCE FEE OF 2.99% OF THE INVOICED AMOUNT. HENCEFORTH, YOUR PAYMENT BY CREDIT CARD SHALL CONSTITUTE YOUR ACCEPTANCE OF FEE CHARGED.
              <br /><br />
              ALL SALES FINAL - NO RETURNS. SPECIAL ORDER PRODUCTS ARE NON-CANCELABLE, NON-RETURNABLE AND NON-REFUNDABLE.
            </p>
          </div>

          <footer className="border-t border-border mt-12 pt-6 text-center sm:text-right">
            <p className="text-xs text-muted-foreground">
              If you have any questions regarding these terms, please contact us at Susan@decobaydesign.com.
            </p>
          </footer>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsAndConditionsPage;