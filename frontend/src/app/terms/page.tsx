'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Terms of Service</CardTitle>
          <CardDescription>Last Updated: June 14, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-sm md:text-base">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to DeGen (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of our website, mobile application, and services (collectively, the &ldquo;Services&rdquo;).
            </p>
            <p className="mt-2">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
            <p>
              To use certain features of our Services, you may need to connect your digital wallet. You are responsible for maintaining the security of your wallet and all activities that occur in connection with your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Blockchain Services</h2>
            <p>
              Our platform facilitates interactions with blockchain networks. You acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Blockchain transactions are irreversible and we cannot recover or assist in recovering digital assets once transactions are confirmed.</li>
              <li>You are solely responsible for keeping your private keys and recovery phrases secure.</li>
              <li>We do not store your private keys, recovery phrases, or have the ability to access your digital assets.</li>
              <li>Blockchain technology and digital assets involve significant risks, including price volatility and regulatory uncertainty.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. User Conduct</h2>
            <p>
              You agree not to use our Services to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Violate any applicable laws or regulations.</li>
              <li>Infringe on the intellectual property or other rights of any person or entity.</li>
              <li>Distribute malware or other harmful content.</li>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts.</li>
              <li>Engage in any activity that could disable, overburden, or impair the proper functioning of our Services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Disclaimers</h2>
            <p>
              THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO, USE OF, OR INABILITY TO ACCESS OR USE THE SERVICES.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you through our Services or by other means. Your continued use of the Services after such modifications constitutes your acceptance of the modified Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild>
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
