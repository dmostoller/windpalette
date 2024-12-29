"use client";
import { Shield, Lock, Eye, Trash2, Database } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--background)] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            We value your privacy and are committed to protecting your data
          </p>
        </div>

        {/* Main content */}
        <div className="grid gap-8">
          {/* Data Collection Section */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-semibold">Data Collection</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                We collect minimal data to provide you with the best possible experience. The only data we
                collect includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Authentication information (email and name)</li>
                <li>Your saved theme preferences (when you choose to save them)</li>
                <li>Anonymous usage statistics through Google Analytics</li>
              </ul>
            </div>
          </section>

          {/* Google Analytics Section */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-[var(--secondary)]" />
              <h2 className="text-2xl font-semibold">Analytics Usage</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                We use Google Analytics to understand how users interact with our theme generator. This helps
                us improve the user experience and fix potential issues. The analytics data collected is:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Anonymous usage patterns</li>
                <li>Device and browser information</li>
                <li>Geographic region (country level only)</li>
                <li>Time spent on the application</li>
              </ul>
            </div>
          </section>

          {/* Data Storage Section */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-[var(--accent)]" />
              <h2 className="text-2xl font-semibold">Your Saved Themes</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>When you save a theme, we store:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Theme name</li>
                <li>Color configurations</li>
                <li>Associated user ID (for access control)</li>
              </ul>
              <p>You maintain full control over your saved themes and can delete them at any time.</p>
            </div>
          </section>

          {/* Data Control Section */}
          <section className="p-6 bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-[var(--success)]" />
              <h2 className="text-2xl font-semibold">Your Data Control</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>You have complete control over your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>View all your saved themes in your profile</li>
                <li>Delete individual themes at any time</li>
                <li>Request account deletion with all associated data</li>
              </ul>
            </div>
          </section>

          {/* Account Deletion */}
          <section className="p-6 bg-[var(--error)/10] border border-[var(--error)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-6 h-6 text-[var(--error)]" />
              <h2 className="text-2xl font-semibold">Account Deletion</h2>
            </div>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                You can delete your account and all associated data at any time through the Account Settings
                page. Navigate to the{" "}
                <a href="/app" className="text-[var(--primary)] hover:underline">
                  User Page
                </a>{" "}
                , click &quot;Account&quot; in the settings menu, then select &quot;Delete Account&quot; and
                follow the prompts.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-sm text-[var(--text-secondary)] pt-8">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              If you have any questions about our privacy policy, please{" "}
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
