'use client'

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Zap, 
  Play, 
  Wallet, 
  TrendingUp, 
  Vote, 
  Lock, 
  Cpu, 
  Coins, 
  IdCard, 
  HeartPulse, 
  Phone, 
  Briefcase, 
  FileText, 
  CreditCard, 
  Layers, 
  Check,
  Twitter,
  Github,
  Linkedin,
  Facebook,
  Instagram
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen mt-16">
      {/* Hero Section */}
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 -z-10"></div>
        
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Shield className="text-primary h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold">SecureDeFi</h1>
          </div>
          <h2 className="text-xl font-medium text-muted-foreground mb-4">
            Confidential DeFi with iExec Data Protection
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            The first mobile DeFi wallet with built-in confidential computing and data protection powered by iExec technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button 
              size="lg" 
              className="font-medium"
              onClick={handleGetStarted}
            >
              <Zap className="mr-2 h-4 w-4" />
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="font-medium"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>
          
          <div className="relative mx-auto max-w-xs">
            <Badge className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground">
              Powered by iExec
            </Badge>
            {/* <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg border bg-muted">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                App Screenshot
              </div>
            </div> */}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-2">Features</Badge>
          <h2 className="text-2xl font-bold mb-2">Why Choose SecureDeFi?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Combining the best of DeFi with confidential computing for unmatched security and privacy
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Data Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Protect sensitive data with iExec&apos;s confidential computing technology
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Wallet className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Multi-Currency Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage crypto, mobile money, and bank accounts in one place
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <TrendingUp className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Yield Farming</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn passive income with secure yield farming options
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Vote className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Conditional Voting</h3>
                  <p className="text-sm text-muted-foreground">
                    Participate in decentralized prediction markets with Chainlink VRF
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* iExec Integration Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-2">iExec Integration</Badge>
          <h2 className="text-2xl font-bold mb-2">Confidential Computing</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Process sensitive data without exposing it, powered by iExec&apos;s trusted execution environments
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-center mb-8 max-w-6xl mx-auto">
          <div className="flex-1">
            <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg border bg-muted">
              <div className="flex items-center justify-center h-full text-muted-foreground">
                iExec Integration Image
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary/10 p-2 rounded-full">
                <Lock className="text-secondary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted locally before being processed in secure enclaves
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-secondary/10 p-2 rounded-full">
                <Cpu className="text-secondary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Trusted Execution Environment</h3>
                <p className="text-sm text-muted-foreground">
                  Computations run in isolated, secure hardware environments
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-secondary/10 p-2 rounded-full">
                <Coins className="text-secondary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Data Monetization</h3>
                <p className="text-sm text-muted-foreground">
                  Earn by sharing your data without compromising privacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="text-center mb-8">
          <Badge className="mb-2">Use Cases</Badge>
          <h2 className="text-2xl font-bold mb-2">Protected Data Types</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Secure your most sensitive information with iExec Data Protector
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          {[
            { icon: IdCard, title: "Passport", desc: "Secure identity verification" },
            { icon: HeartPulse, title: "Health Data", desc: "Private medical records" },
            { icon: Phone, title: "Phone Number", desc: "Contact information" },
            { icon: Briefcase, title: "Employee Info", desc: "Work history & credentials" },
            { icon: FileText, title: "Legal Documents", desc: "Contracts & agreements" },
            { icon: CreditCard, title: "Financial Data", desc: "Banking & payment info" }
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="bg-secondary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="text-secondary h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      {/* App Modes Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="text-center mb-8">
          <Badge className="mb-2">App Modes</Badge>
          <h2 className="text-2xl font-bold mb-2">Choose Your Experience</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start with Lite Mode for simplicity or unlock Pro Mode for advanced features
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8 max-w-6xl mx-auto">
          <Card className="flex-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Zap className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Lite Mode</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                Perfect for beginners and everyday transactions with a simplified interface
              </p>
              
              <ul className="space-y-2 mb-6">
                {["Basic account management", "Send & receive crypto", "Mobile money integration", "Exchange rates", "Basic data protection"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="text-green-500 h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" className="w-full" onClick={() => router.push('/lite')}>
                Start with Lite Mode
              </Button>
            </CardContent>
          </Card>
          
          <Card className="flex-1 border-2 border-primary bg-gradient-to-b from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Layers className="text-primary h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Pro Mode</h3>
                <Badge variant="secondary">Recommended</Badge>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                Full-featured experience with advanced DeFi tools and complete data protection
              </p>
              
              <ul className="space-y-2 mb-6">
                {[
                  "Everything in Lite Mode",
                  "Full iExec integration",
                  "Advanced data protection",
                  "Yield farming",
                  "Conditional voting",
                  "Data monetization",
                  "Confidential computing"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="text-green-500 h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full" onClick={handleGetStarted}>
                Upgrade to Pro Mode
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="text-center mb-8">
          <Badge className="mb-2">Testimonials</Badge>
          <h2 className="text-2xl font-bold mb-2">What Users Say</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join thousands of satisfied users protecting their data while using DeFi
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                  <div className="flex items-center justify-center h-full text-xs">SK</div>
                </div>
                <div>
                  <p className="font-semibold">Sarah K.</p>
                  <p className="text-xs text-muted-foreground">Financial Analyst</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                &quot;The iExec data protection gives me peace of mind when handling sensitive financial information. I can finally use DeFi without compromising my privacy.&quot;
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                  <div className="flex items-center justify-center h-full text-xs">MT</div>
                </div>
                <div>
                  <p className="font-semibold">Michael T.</p>
                  <p className="text-xs text-muted-foreground">Healthcare Professional</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                &quot;Being able to protect my health data while still participating in research studies is revolutionary. The confidential computing aspect is a game-changer.&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Join the future of confidential DeFi with iExec data protection
          </p>
          
          <Button 
            size="lg" 
            className="font-medium"
            onClick={handleGetStarted}
          >
            Launch App Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-muted">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="text-primary h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">SecureDeFi</h3>
        </div>
        
        <Separator className="mb-4" />
        
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {["About", "Features", "Privacy", "Terms", "Contact", "Support"].map((item, index) => (
            <Button key={index} variant="ghost" size="sm">
              {item}
            </Button>
          ))}
        </div>
        
        <div className="flex justify-center gap-3 mb-4">
          {[Twitter, Github, Linkedin, Facebook, Instagram].map((Icon, index) => (
            <Button key={index} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          © 2025 SecureDeFi. Powered by iExec. All rights reserved.
        </p>
      </footer>
    </div>
  );
}