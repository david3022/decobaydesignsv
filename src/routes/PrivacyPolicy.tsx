import React from "react";
import { Helmet } from "react-helmet-async";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Registrar la ruta en TanStack Router
export const Route = createFileRoute("/PrivacyPolicy")({
  component: Privacy,
});

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Privacy Policy | Decobay Interiors LLC - Bay Area Architecture & Interior Design</title>
        <meta 
          name="description" 
          content="Read Decobay Interiors LLC's privacy policy. Learn how we protect your personal information, handle architectural plans, and ensure confidentiality for our architecture and interior design services in The Bay Area, California." 
        />
        <meta 
          name="keywords" 
          content="privacy policy, data protection, architectural design privacy, Bay Area architecture studio, California interior design, confidential architectural plans, personal information protection, Decobay Interiors LLC" 
        />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Decobay Interiors LLC" />
        <meta property="og:title" content="Privacy Policy | Decobay Interiors LLC - Bay Area Architecture Studio" />
        <meta property="og:description" content="Read Decobay Interiors LLC's privacy policy. Learn how we protect your personal information and ensure confidentiality for your architectural and interior design projects." />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@decobayinteriors" />
        <meta name="twitter:title" content="Privacy Policy | Decobay Interiors LLC" />
        <meta name="twitter:description" content="Learn how Decobay Interiors LLC protects your personal information and ensures confidentiality for your architectural and design project." />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy | Decobay Interiors LLC",
            "description": "Privacy policy and data protection practices for Decobay Interiors LLC, an  Architectural & Interior Design Firm in The Bay Area, California.",
            "inLanguage": "en-US",
            "about": {
              "@type": "Thing",
              "name": "Privacy Policy",
              "description": "Information about how Decobay Interiors LLC collects, uses, and protects personal data."
            }
          })}
        </script>
      </Helmet>

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto bg-card p-8 sm:p-12 rounded-xl border border-border shadow-sm w-full">
          
          <header className="border-b border-border pb-6 mb-8 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Privacy Policy for <span className="text-accent">Decobay Interiors LLC</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString("en-US", { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-3xl">
              At Decobay Interiors LLC, we are committed to protecting your privacy and ensuring the security of your personal 
              information when you engage with our architecture, structural planning, interior design, and landscape design services in The Bay Area, California, USA.
            </p>
          </header>

          <div className="prose prose-sm sm:prose max-w-none text-muted-foreground leading-relaxed space-y-6">
            
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal identification information from you in various ways, including when you visit our site, fill out an architectural project inquiry form, subscribe to our newsletter, or book a consultation. This information may include:
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
              Contact Data
            </h3>
            <p>Name, email address, phone number, and physical or mailing address.</p>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
              Project & Architectural Details
            </h3>
            <p>Information regarding your property location in the Bay Area, lot dimensions, structural preferences, project scope, spatial requirements, and estimated budget.</p>
            
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
              Technical Data
            </h3>
            <p>IP address, browser type, and usage data collected automatically through cookies when interacting with our digital blueprints, high-definition galleries, and 3D architectural renders.</p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p>
              The information we collect is utilized to deliver a tailored, high-end architectural and design experience. Specifically, we use your data to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Process, review, and respond to your architectural, structural, and interior remodeling inquiries.</li>
              <li>Schedule architectural consultations, site visits, and coordinate project development in the Bay Area.</li>
              <li>Optimize our website performance, ensuring that immersive media, CAD renders, and 360-degree virtual walkthroughs load smoothly on your device.</li>
              <li>Send periodic updates, architectural lookbooks, or project milestones regarding our services.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              3. Architectural Assets and Media Protection
            </h2>
            <p>
              We treat all architectural layouts, structural floor plans, site surveys, and property photographs provided by clients or prospects with the highest level of confidentiality. Before-and-after photographs, 3D renderings, and spatial designs generated during our collaboration will only be displayed on our public portfolio or marketing assets with explicit client consent.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              4. Data Retention and Security
            </h2>
            <p>
              We adopt robust data collection, storage practices, and security measures to protect your personal files and property plans against unauthorized access, alteration, or disclosure. Your sensitive details are stored securely, and we do not sell, trade, or rent client information to third-party marketing agencies.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              5. Cookies and Interactive Elements
            </h2>
            <p>
              Our website uses cookies to enhance user navigation and track engagement with our architectural portfolio assets. Cookies help us understand user behavior, allowing us to continuously refine our digital interface and showcase our work effectively. You can adjust your browser settings to refuse cookies, though some interactive features may not function as intended.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              6. Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our operational, legal, or regulatory practices in California. We encourage users to frequently check this page to stay informed about how we protect personal information.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              7. Contact Information
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our architectural services, please don't hesitate to contact us.
            </p>

          </div>

          <footer className="border-t border-border mt-12 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Decobay Interiors LLC</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Location: The Bay Area, California, USA<br />
                  Email: Susan@decobaydesign.com<br />
                  Phone: +1-408-410-7671
                </p>
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-sm font-semibold text-foreground">Services</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Architecture · Interior Design · Hardscape & Landscape
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Decobay Interiors LLC. All rights reserved.
              </p>
            </div>
          </footer>

        </div>
      </main>
    </>
  );
}

export default function Privacy() {
  return (
    <>
      <Header />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}

// import React from "react";
// // 1. Import your existing layout components
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// function PrivacyPolicy() {
//   return (
//     <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground min-h-screen flex items-center">
//       <div className="max-w-4xl mx-auto bg-card p-8 sm:p-12 rounded-xl border border-border shadow-sm w-full">
        
//         {/* Document Header */}
//         <header className="border-b border-border pb-6 mb-8 text-center sm:text-left">
//           <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
//             Privacy Policy
//           </h1>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Last updated: {new Date().toLocaleDateString("en-US")}
//           </p>
//         </header>

//         {/* Legal Contract Content Container */}
//         <div className="prose prose-sm sm:prose max-w-none text-muted-foreground leading-relaxed space-y-6">
          
//           {/* ================================================================= */}
//           {/* SPACE FOR THE CONTRACT STARTS HERE: PASTE YOUR LEGAL TEXT BELOW    */}
//           {/* ================================================================= */}
          
//           <p>
//             Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website...
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             1. Information We Collect
//           </h2>
//           <p>
//             We may collect personal identification information from users in a variety of ways, including, but not limited to, when users visit our site, fill out a contact form, or interact with our interactive assets...
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             2. How We Use Collected Information
//           </h2>
//           <p>
//             Any information we collect from you may be used to personalize your experience, improve our website functionality, display high-end design assets efficiently, or respond to customer service inquiries...
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             3. Data Protection
//           </h2>
//           <p>
//             We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data...
//           </p>
          
//           {/* ================================================================= */}
//           {/* SPACE FOR THE CONTRACT ENDS HERE                                  */}
//           {/* ================================================================= */}

//           <p>
//             At our studio, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website, interact with our 3D visualization tools, or engage with our professional architecture and interior remodeling services.
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             1. Information We Collect
//           </h2>
//           <p>
//             We may collect personal identification information from you in various ways, including when you visit our site, fill out a project inquiry form, subscribe to our newsletter, or book a design consultation. This information may include:
//           </p>
//           <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
//             <li><strong>Contact Data:</strong> Name, email address, phone number, and physical or mailing address.</li>
//             <li><strong>Project Details:</strong> Information regarding your property, space dimensions, design preferences, scope of work, and estimated budget.</li>
//             <li><strong>Technical Data:</strong> IP address, browser type, and usage data collected automatically through cookies when interacting with our high-definition galleries and 3D virtual tours.</li>
//           </ul>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             2. How We Use Your Information
//           </h2>
//           <p>
//             The information we collect is utilized to deliver a premium, personalized design experience. Specifically, we use your data to:
//           </p>
//           <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
//             <li>Process, review, and respond to your architectural and interior remodeling inquiries.</li>
//             <li>Schedule design consultations, site visits, and coordinate project development.</li>
//             <li>Optimize our website performance, ensuring that immersive media, interactive blueprints, and 360-degree virtual walkthroughs load smoothly on your device.</li>
//             <li>Send periodic updates, design lookbooks, or promotional materials regarding our premium remodeling services (you may opt out at any time).</li>
//           </ul>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             3. Project Assets and Media Protection
//           </h2>
//           <p>
//             We treat all architectural layouts, structural floor plans, and property photographs provided by clients or prospects with the highest level of confidentiality. Before-and-after photographs, 3D renderings, and spatial designs generated during our collaboration will only be displayed on our public portfolio or marketing assets with explicit client consent.
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             4. Data Retention and Security
//           </h2>
//           <p>
//             We adopt robust data collection, storage practices, and security measures to protect your personal files against unauthorized access, alteration, or disclosure. Your sensitive details are stored securely, and we do not sell, trade, or rent client information to third-party marketing agencies.
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             5. Cookies and Interactive Elements
//           </h2>
//           <p>
//             Our website uses cookies to enhance user navigation and track engagement with our portfolio assets. Cookies help us understand user behavior, allowing us to continuously refine our digital interface and showcase our interior remodeling work effectively. You can adjust your browser settings to refuse cookies, though some interactive features may not function as intended.
//           </p>

//           <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
//             6. Changes to This Privacy Policy
//           </h2>
//           <p>
//             We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our operational, legal, or regulatory practices. We encourage users to frequently check this page to stay informed about how we protect the personal information we collect.
//           </p>



//         </div>

//         {/* Internal Legal Footer Note */}
//         <footer className="border-t border-border mt-12 pt-6 text-center sm:text-right">
//           <p className="text-xs text-muted-foreground">
//             If you have any questions about this Privacy Policy, please contact us.
//           </p>
//         </footer>

//       </div>
//     </main>
//   );
// }

// // 2. Multiple export format matching your layout bundler structure
// export default function Privacy() {
//   return (
//     <main className="bg-background text-foreground overflow-x-hidden">
      
//       <Header/>
//       <PrivacyPolicy />
//       <Footer />
//     </main>
//   );
// }