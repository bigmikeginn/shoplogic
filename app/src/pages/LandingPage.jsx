import { useState, useEffect } from 'react';
import { redirectToCheckout } from '../utils/stripeCheckout';

export default function LandingPage({ onGetStarted, onSignIn }) {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCheckout = async () => {
    redirectToCheckout();
  };

  const handleSeeInside = () => {
    document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const AnimatedSection = ({ id, children }) => (
    <div
      id={id}
      data-animate
      className={`transition-all duration-700 ${
        visibleSections[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-radial from-[color-mix(in_srgb,var(--accent)_3%,transparent)] via-transparent to-transparent opacity-50" />
        <div id="cf-texture" className="absolute inset-0" />
      </div>

      {/* Header */}
      <header className={`relative z-20 sticky top-0 transition-all duration-300 ${
        isHeaderScrolled
          ? 'backdrop-blur-lg bg-[rgba(18,19,24,0.95)] border-b border-[var(--border-light)] shadow-lg'
          : 'backdrop-blur-md bg-[rgba(18,19,24,0.7)] border-b border-[var(--border-light)]'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900">⚙</span>
            </div>
            <span className="font-bold text-lg">ShopLogic</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSignIn}
              className="px-3 py-2 text-sm font-semibold rounded-lg border border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all"
            >
              Sign In
            </button>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-xl hover:shadow-[var(--accent)]/50 hover:scale-105 transition-all"
            >
              Get ShopLogic
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <AnimatedSection id="hero">
          <section className="px-4 py-16 sm:py-24 max-w-4xl mx-auto">
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent)] to-orange-400 bg-clip-text text-transparent">
                All your workshop calculations in one place
              </h1>
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                Shoplogic helps woodworkers, makers, and small shops plan materials, price jobs, avoid costly mistakes, and keep project math organized without juggling five different tools.
              </p>
              <p className="text-base sm:text-lg text-[var(--text-muted)] font-medium">
                One better quote, one saved sheet of plywood, or one avoided bad cut can pay for the app. 🎯
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <button
                onClick={onGetStarted}
                className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-2xl hover:shadow-[var(--accent)]/50 hover:scale-105 transition-all text-center"
              >
                Create Account
              </button>
              <button
                onClick={handleSeeInside}
                className="px-6 py-3 font-semibold rounded-lg border border-[var(--border-light)] bg-[rgba(255,255,255,0.03)] text-[var(--text-primary)] hover:bg-[rgba(251,191,36,0.1)] hover:border-[var(--accent)] hover:scale-105 transition-all text-center"
              >
                See What's Inside
              </button>
            </div>

            {/* Trust line */}
            <div className="flex flex-col sm:flex-row gap-3 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> One-time purchase</span>
              <span className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> No subscription</span>
              <span className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Built for real shop work</span>
            </div>

            {/* Trial offer */}
            <div className="mt-6 p-4 sm:p-5 rounded-lg bg-gradient-to-r from-[rgba(251,191,36,0.15)] to-[rgba(251,191,36,0.05)] border border-[var(--accent)] border-opacity-30">
              <p className="text-base font-semibold text-[var(--accent)]">
                🎁 Free 2-week trial of premium features included
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                Try project folders and saved outputs at no extra cost. After 2 weeks, enjoy them forever with your purchase.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* Problem Section */}
        <AnimatedSection id="problem">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Shop mistakes get expensive fast 😰
              </h2>
              <div className="space-y-5 text-[var(--text-secondary)]">
                <p className="text-lg leading-relaxed">
                  Too much shop math still happens on scraps of paper, phone notes, memory, and whatever calculator happens to be nearby.
                </p>
                <p className="text-lg leading-relaxed">
                  That leads to bad estimates, wasted material, awkward quoting, and unnecessary second trips for more lumber or plywood.
                </p>
                <div className="p-4 sm:p-5 rounded-lg bg-gradient-to-r from-[rgba(251,191,36,0.1)] to-[rgba(251,191,36,0.05)] border border-[rgba(251,191,36,0.2)] mt-6">
                  <p className="font-semibold text-[var(--text-primary)] text-lg">
                    Shoplogic gives you one place to make the decisions before they become expensive mistakes.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* ROI Section */}
        <AnimatedSection id="roi">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Built to save more than it costs 💰
              </h2>
              <div className="space-y-6 text-[var(--text-secondary)]">
                <p className="text-lg">
                  Shoplogic is designed to earn its keep quickly.
                </p>
                <ul className="space-y-4">
                  {[
                    'A more accurate quote can protect your margin.',
                    'A better sheet layout can save material.',
                    'A single avoided mistake can prevent wasted lumber, wasted time, and rework.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] hover:border-[var(--accent)] hover:bg-[rgba(251,191,36,0.05)] transition-all">
                      <span className="text-[var(--accent)] font-bold flex-shrink-0 text-lg">→</span>
                      <span className="text-base sm:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 mt-4 border-t border-[var(--border-light)]">
                  <p className="text-lg font-semibold text-[var(--accent)]">
                    In many cases, one project is enough for Shoplogic to pay for itself.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* What It Helps You Do */}
        <AnimatedSection id="features">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                More than a calculator ⚡
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {[
                  'Plan material needs before you buy',
                  'Lay out cuts more efficiently',
                  'Price work with more confidence',
                  'Double-check setup math before cutting',
                  'Keep project calculations and quote details together',
                  'Work faster in the shop, on-site, or at the lumberyard'
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] hover:border-[var(--accent)] hover:bg-[rgba(251,191,36,0.08)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all"
                  >
                    <span className="text-[var(--accent)] font-bold flex-shrink-0 text-lg">✓</span>
                    <span className="text-sm sm:text-base text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Key Capabilities */}
        <AnimatedSection id="capabilities">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Everything you need for the math side of a project 🛠️
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {[
                  {
                    category: 'Material Planning',
                    emoji: '📊',
                    tools: ['Board Feet', 'Plywood Planner', 'Finish Estimator']
                  },
                  {
                    category: 'Shop Setup',
                    emoji: '🎯',
                    tools: ['Cut List', 'Joinery Spacer', 'Stair Calculator']
                  },
                  {
                    category: 'Reference + Utility',
                    emoji: '📚',
                    tools: ['Wood Database', 'Wood Movement', 'Metric Converter']
                  },
                  {
                    category: 'Pricing + Quote Support',
                    emoji: '💵',
                    tools: ['Board Feet Pricing', 'Metal Weight', 'Fasteners']
                  }
                ].map((group, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-lg bg-gradient-to-br from-[rgba(251,191,36,0.08)] to-[rgba(251,191,36,0.02)] border border-[var(--border-light)] hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all"
                  >
                    <h3 className="font-semibold text-[var(--accent)] mb-4 flex items-center gap-2 text-lg">
                      <span>{group.emoji}</span>
                      {group.category}
                    </h3>
                    <ul className="space-y-2">
                      {group.tools.map((tool, toolIdx) => (
                        <li key={toolIdx} className="text-sm text-[var(--text-secondary)] flex gap-2">
                          <span className="text-[var(--accent)] font-bold">+</span>
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Project Organization / Future */}
        <AnimatedSection id="future">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-6 p-6 sm:p-8 rounded-lg border border-[var(--border-light)] bg-gradient-to-br from-[rgba(251,191,36,0.08)] to-[rgba(251,191,36,0.02)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Built for where the app is going next 🚀
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Shoplogic is growing beyond one-off calculations. Planned project organization features will make it easier to keep quotes, saved calculations, and project details together in one place.
              </p>
              <div className="inline-block">
                <span className="px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-[rgba(251,191,36,0.3)] to-[rgba(251,191,36,0.1)] text-[var(--accent)] border border-[var(--accent)] animate-pulse">
                  Coming Soon: Project Folders
                </span>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* How It Works */}
        <AnimatedSection id="how-it-works">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-3">
                  Simple when you need it 🎪
                </h2>
                <p className="text-lg text-[var(--text-muted)]">
                  No spreadsheet gymnastics. No hunting through old notes. No bouncing between apps.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { num: '1', emoji: '📱', text: 'Open Shoplogic on your phone, tablet, or computer' },
                  { num: '2', emoji: '🎯', text: 'Choose the tool for the job' },
                  { num: '3', emoji: '💾', text: 'Save the numbers you need and get back to building' }
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-5 sm:p-6 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] hover:border-[var(--accent)] hover:bg-[rgba(251,191,36,0.05)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent)] to-orange-600 flex items-center justify-center flex-shrink-0 font-bold text-gray-900 text-xl">
                      {step.num}
                    </div>
                    <div className="pt-1">
                      <p className="text-[var(--text-secondary)] text-base">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Who It's For */}
        <AnimatedSection id="who">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Made for practical builders 👷
              </h2>
              <div className="space-y-5 text-[var(--text-secondary)]">
                <p className="text-lg leading-relaxed">
                  Shoplogic is for woodworkers, furniture makers, cabinet builders, contractors, side hustlers, and small shops who want faster decisions and fewer costly mistakes.
                </p>
                <p className="text-lg leading-relaxed">
                  Whether you are quoting jobs for clients or building for yourself, it helps keep the math under control.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Pricing Section */}
        <AnimatedSection id="pricing">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-8">
              <div className="space-y-3 text-center sm:text-left">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Buy it once. Use it on every project.
                </h2>
                <p className="text-lg text-[var(--text-muted)]">
                  One-time purchase, lifetime access.
                </p>
              </div>

              <div className="relative p-6 sm:p-8 rounded-lg border border-[var(--accent)] bg-gradient-to-br from-[rgba(251,191,36,0.12)] via-[rgba(251,191,36,0.05)] to-[rgba(251,191,36,0.02)] shadow-xl shadow-[var(--accent)]/10 hover:shadow-2xl hover:shadow-[var(--accent)]/20 transition-all">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-[var(--accent)] mb-2">LAUNCH PRICE</p>
                    <div className="space-y-1">
                      <p className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-[var(--accent)] to-orange-400 bg-clip-text text-transparent">
                        $29
                      </p>
                      <p className="text-base text-[var(--text-muted)]">one-time purchase</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[rgba(251,191,36,0.2)] space-y-4">
                    <p className="text-base font-semibold text-[var(--accent)]">
                      Planned price: $49 after the first 50 customers or when Project Folders launches.
                    </p>
                    <div className="space-y-3 text-base text-[var(--text-secondary)]">
                      {[
                        'Full access to Shoplogic',
                        'All current tools',
                        'Free 2-week trial of project folders & saved outputs',
                        'Includes Shoplogic 1.x updates',
                        'No subscription',
                        'Loyalty discount on future versions'
                      ].map((item, idx) => (
                        <p key={idx} className="flex items-center gap-3">
                          <span className="text-[var(--accent)] font-bold">✓</span>
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[rgba(251,191,36,0.2)]">
                    <p className="text-base text-[var(--text-muted)] italic">
                      If Shoplogic helps you avoid one bad cut, improve one quote, or save one sheet of material, it may pay for itself immediately.
                    </p>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-2xl hover:shadow-[var(--accent)]/50 hover:scale-105 transition-all text-lg"
                  >
                    Get Shoplogic
                  </button>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection id="faq">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Questions? We have answers. 🤔
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
                  <div
                    key={idx}
                    className="p-5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--border-light)] hover:border-[var(--accent)] hover:bg-[rgba(251,191,36,0.05)] hover:shadow-lg hover:shadow-[var(--accent)]/10 transition-all"
                  >
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-lg">{faq.q}</h3>
                    <p className="text-base text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Final CTA */}
        <AnimatedSection id="final-cta">
          <section className="px-4 py-16 sm:py-20 max-w-4xl mx-auto border-t border-[var(--border-light)]">
            <div className="space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold">
                  Stop losing money to shop math
                </h2>
                <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
                  Keep your calculations, planning, and project decisions in one place with a tool built for real work.
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="px-10 py-4 font-semibold rounded-lg bg-gradient-to-br from-[var(--accent)] to-orange-600 text-gray-900 hover:shadow-2xl hover:shadow-[var(--accent)]/50 hover:scale-105 transition-all text-lg mx-auto block"
              >
                Buy Shoplogic Now
              </button>
            </div>
          </section>
        </AnimatedSection>

        {/* Footer */}
        <footer className="px-4 py-12 sm:py-16 max-w-4xl mx-auto border-t border-[var(--border-light)] text-center">
          <p className="text-base font-semibold text-[var(--text-primary)]">
            ShopLogic
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Workshop Utility for Makers & Builders
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            © 2025 ShopLogic • One-time purchase • No subscription • Built for real shop work
          </p>
        </footer>
      </main>
    </div>
  );
}
