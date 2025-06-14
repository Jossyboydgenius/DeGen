'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <Card className="border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Privacy Policy</CardTitle>
          <CardDescription>Last Updated: June 14, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-sm md:text-base">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              DeGen (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Blockchain Data:</strong> Public blockchain addresses, transaction history, and other on-chain data that is publicly visible.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our Services, including access times, pages viewed, and the routes you take through our platform.
              </li>
              <li>
                <strong>Device Information:</strong> Information about the device you use to access our Services, including hardware model, operating system, unique device identifiers, and mobile network information.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide, maintain, and improve our Services.</li>
              <li>Process transactions and send related information.</li>
              <li>Send you technical notices, updates, security alerts, and administrative messages.</li>
              <li>Respond to your comments, questions, and customer service requests.</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Services.</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
              <li>Personalize and improve your experience on our Services.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Data Sharing and Disclosure</h2>
            <p>
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>With third-party service providers who perform services on our behalf.</li>
              <li>To comply with applicable laws, regulations, legal processes, or governmental requests.</li>
              <li>To enforce our Terms of Service and other agreements.</li>
              <li>To protect the rights, property, or safety of DeGen, our users, or others.</li>
              <li>In connection with a business transaction such as a merger, acquisition, or sale of assets.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Blockchain Transparency</h2>
            <p>
              Please be aware that blockchain technology operates on principles of transparency and immutability. Information recorded on a public blockchain, including wallet addresses and transaction data, is publicly accessible. We cannot alter, remove, or erase information that has been recorded on the blockchain.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Security</h2>
            <p>
              We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request correction or deletion of your personal data.</li>
              <li>The right to restrict or object to our processing of your personal data.</li>
              <li>The right to data portability.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you through our Services or by other means.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@degenplatform.io
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/terms">Terms of Service</Link>
            </Button>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
