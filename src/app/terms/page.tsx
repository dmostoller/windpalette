import { AlertCircle, Copy, UserCheck, Ban, Handshake } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">Terms of Service</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Please read these terms carefully before using our service
          </p>
        </div>
        {/* Main content */}
        <div className="grid gap-8">
          {/* Acceptance */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Handshake className="w-6 h-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-semibold">Acceptance of Terms</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                By accessing or using WindPalette, you agree to be bound by these Terms of Service. If you do
                not agree to these terms, please do not use our service.
              </p>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material
                changes via email or through the service.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-[var(--secondary)]" />
              <h2 className="text-2xl font-semibold">User Responsibilities</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>As a user of WindPalette, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in compliance with applicable laws and regulations</li>
                <li>Not engage in any automated use of the system</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Copy className="w-6 h-6 text-[var(--accent)]" />
              <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                The service and its original content, features, and functionality are owned by WindPalette and
                are protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <p>Themes you create:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You retain ownership of themes you create</li>
                <li>You grant us license to store and display your themes</li>
                <li>You may export and use your themes in any project</li>
              </ul>
            </div>
          </section>

          {/* Limitations */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-[var(--warning)]" />
              <h2 className="text-2xl font-semibold">Limitations of Liability</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                WindPalette is provided &quot;as is&quot; without any warranties, expressed or implied. We do
                not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The service will be uninterrupted or error-free</li>
                <li>Defects will be corrected</li>
                <li>The service or server is free of viruses or harmful components</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-[var(--error)]" />
              <h2 className="text-2xl font-semibold">Account Termination</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>We reserve the right to terminate or suspend accounts for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violation of these terms</li>
                <li>Suspected fraudulent activity</li>
                <li>Abusive behavior towards other users or staff</li>
              </ul>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-[var(--text-secondary)] pt-8">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              If you have any questions about our terms, please{" "}
              <a href="mailto:dave.mostoller.dev@gmail.com" className="text-[var(--primary)] hover:underline">
                contact us
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
