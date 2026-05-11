import { redirectToCheckout } from '../utils/stripeCheckout';

export default function LandingPage() {
  const handleCheckout = async () => {
    redirectToCheckout();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-radial from-[color-mix(in_srgb,var(--accent)_3%,transparent)] via-transparent to-transparent opacity-50" />
        <div id="cf-texture" className="absolute inset-0" />
      </div>

      {/* Header */}
      <header className="relative z-10 sticky top-0 backdrop-blur-md bg-[rgba(18,19,24,0.7)] border-b border-[var(--border-light)]">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900">⚙</span>
            </div>
            <span className="font-bold text-lg">ShopLogic</span>
          </div>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-lg transition-all"
          >
            Get ShopLogic
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              All your workshop calculations in one place
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed">
              Shoplogic helps woodworkers, makers, and small shops plan materials, price jobs, avoid costly mistakes, and keep project math organized without juggling five different tools.
            </p>
            <p className="text-base sm:text-lg text-[var(--text-muted)] font-medium">
              One better quote, one saved sheet of plywood, or one avoided bad cut can pay for the app.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-lg transition-all text-center"
            >
              Buy Shoplogic
            </button>
            <button className="px-6 py-3 font-semibold rounded-lg border border-[var(--border-light)] bg-[rgba(255,255,255,0.03)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.06)] transition-all text-center">
              See What's Inside
            </button>
          </div>

          {/* Trust line */}
          <p className="text-sm text-[var(--text-muted)] space-x-3">
            <span>✓ One-time purchase</span>
            <span>✓ No subscription</span>
            <span>✓ Built for real shop work</span>
          </p>
        </section>

        {/* Problem Section */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-5">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Shop mistakes get expensive fast
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                Too much shop math still happens on scraps of paper, phone notes, memory, and whatever calculator happens to be nearby.
              </p>
              <p>
                That leads to bad estimates, wasted material, awkward quoting, and unnecessary second trips for more lumber or plywood.
              </p>
              <p className="font-medium text-[var(--text-primary)]">
                Shoplogic gives you one place to make the decisions before they become expensive mistakes.
              </p>
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-5">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Built to save more than it costs
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                Shoplogic is designed to earn its keep quickly.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold mt-1">→</span>
                  <span>A more accurate quote can protect your margin.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold mt-1">→</span>
                  <span>A better sheet layout can save material.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--accent)] font-bold mt-1">→</span>
                  <span>A single avoided mistake can prevent wasted lumber, wasted time, and rework.</span>
                </li>
              </ul>
              <p className="pt-2 font-medium text-[var(--text-primary)]">
                In many cases, one project is enough for Shoplogic to pay for itself.
              </p>
            </div>
          </div>
        </section>

        {/* What It Helps You Do */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              More than a calculator
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                'Plan material needs before you buy',
                'Lay out cuts more efficiently',
                'Price work with more confidence',
                'Double-check setup math before cutting',
                'Keep project calculations and quote details together',
                'Work faster in the shop, on-site, or at the lumberyard'
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <span className="text-[var(--accent)] font-bold flex-shrink-0">✓</span>
                  <span className="text-sm sm:text-base text-[var(--text-secondary)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Capabilities */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need for the math side of a project
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  category: 'Material Planning',
                  tools: ['Board Feet', 'Plywood Planner', 'Finish Estimator']
                },
                {
                  category: 'Shop Setup',
                  tools: ['Cut List', 'Joinery Spacer', 'Stair Calculator']
                },
                {
                  category: 'Reference + Utility',
                  tools: ['Wood Database', 'Wood Movement', 'Metric Converter']
                },
                {
                  category: 'Pricing + Quote Support',
                  tools: ['Board Feet Pricing', 'Metal Weight', 'Fasteners']
                }
              ].map((group, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-lg bg-[rgba(251,191,36,0.05)] border border-[var(--border-light)]">
                  <h3 className="font-semibold text-[var(--accent)] mb-3">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.tools.map((tool, toolIdx) => (
                      <li key={toolIdx} className="text-sm text-[var(--text-secondary)] flex gap-2">
                        <span className="text-[var(--accent)]">+</span>
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Organization / Future */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-5 p-5 sm:p-6 rounded-lg border border-[var(--border-light)] bg-[rgba(251,191,36,0.03)]">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Built for where the app is going next
            </h2>
            <p className="text-[var(--text-secondary)]">
              Shoplogic is growing beyond one-off calculations. Planned project organization features will make it easier to keep quotes, saved calculations, and project details together in one place.
            </p>
            <div className="inline-block">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-[rgba(251,191,36,0.2)] text-[var(--accent)] border border-[var(--accent)]">
                Coming Soon: Project Folders
              </span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Simple when you need it
              </h2>
              <p className="text-[var(--text-muted)]">
                No spreadsheet gymnastics. No hunting through old notes. No bouncing between apps.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { num: '1', text: 'Open Shoplogic on your phone, tablet, or computer' },
                { num: '2', text: 'Choose the tool for the job' },
                { num: '3', text: 'Save the numbers you need and get back to building' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-orange-600 flex items-center justify-center flex-shrink-0 font-bold text-gray-900">
                    {step.num}
                  </div>
                  <p className="text-[var(--text-secondary)] pt-1">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-5">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Made for practical builders
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                Shoplogic is for woodworkers, furniture makers, cabinet builders, contractors, side hustlers, and small shops who want faster decisions and fewer costly mistakes.
              </p>
              <p>
                Whether you are quoting jobs for clients or building for yourself, it helps keep the math under control.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Buy it once. Use it on every project.
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-lg border border-[var(--accent)] bg-[rgba(251,191,36,0.08)]">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[var(--text-muted)] mb-2">Launch Price</p>
                  <p className="text-5xl sm:text-6xl font-bold text-[var(--accent)]">$29</p>
                  <p className="text-sm text-[var(--text-muted)] mt-2">one-time</p>
                </div>

                <div className="pt-4 border-t border-[var(--border-light)] space-y-3">
                  <p className="text-sm font-medium text-[var(--accent)]">
                    Planned price: $49 after the first 50 customers or when Project Folders launches.
                  </p>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p>✓ Full access to Shoplogic</p>
                    <p>✓ All current tools</p>
                    <p>✓ Includes Shoplogic 1.x updates</p>
                    <p>✓ No subscription</p>
                    <p>✓ Loyalty discount if a major future version is released</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-light)]">
                  <p className="text-sm text-[var(--text-muted)] italic">
                    If Shoplogic helps you avoid one bad cut, improve one quote, or save one sheet of material, it may pay for itself immediately.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-lg transition-all"
                >
                  Get Shoplogic
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Questions?
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Is Shoplogic a subscription?',
                  a: 'No. Shoplogic is a one-time purchase.'
                },
                {
                  q: 'Will I get updates?',
                  a: 'Yes. Your purchase includes Shoplogic 1.x updates.'
                },
                {
                  q: 'What happens if there\'s a major future version?',
                  a: 'Existing customers will receive a loyalty discount.'
                },
                {
                  q: 'Is it made for mobile use?',
                  a: 'Yes. Shoplogic is designed to be practical in the shop and easy to use on the go.'
                },
                {
                  q: 'Is this only for professionals?',
                  a: 'No. It\'s useful for hobbyists, side hustlers, and professional shops alike.'
                },
                {
                  q: 'What if it\'s not the right fit?',
                  a: 'We offer a 14-day refund window if you\'re not satisfied.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)]">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)]">
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                Stop losing money to shop math
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                Keep your calculations, planning, and project decisions in one place with a tool built for real work.
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="px-8 py-4 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-lg transition-all text-lg mx-auto block"
            >
              Buy Shoplogic
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 sm:py-12 max-w-4xl mx-auto border-t border-[var(--border-light)] text-center">
          <p className="text-sm text-[var(--text-muted)]">
            ShopLogic • Workshop Utility for Makers & Builders
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            © 2025 ShopLogic. One-time purchase • No subscription • Built for real shop work.
          </p>
        </footer>
      </main>
    </div>
  );
}
