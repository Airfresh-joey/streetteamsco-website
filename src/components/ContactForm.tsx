import { useState, useRef, useEffect, type FormEvent } from 'react';
import { trackFormSubmit, trackFormAbandonment } from '../analytics';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    campaign_type: '',
    budget_range: '',
    timeline: '',
    message: '',
  });

  // Track the last focused field for abandonment detection
  const lastFocusedField = useRef<string>('');
  const formTouched = useRef(false);

  const handleFieldFocus = (fieldName: string) => {
    lastFocusedField.current = fieldName;
    formTouched.current = true;
  };

  // Detect form abandonment on unmount
  useEffect(() => {
    return () => {
      if (formTouched.current && status !== 'success') {
        trackFormAbandonment('contact_form', lastFocusedField.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Fire-and-forget copy to the AFM Proposals Command Center — runs in
    // parallel and never blocks or affects the Formspree submission below.
    try {
      fetch('https://proposal-dashboard-blond.vercel.app/api/leads/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'streetteamsco' }),
      }).catch(() => {});
    } catch {
      // ignore — best-effort only
    }

    try {
      const response = await fetch('https://formspree.io/p/3037394180927126767/f/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _source: 'StreetTeamsCo',
          _subject: `[Street Teams Co] New inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        trackFormSubmit('contact_form');
        setFormData({ name: '', email: '', phone: '', company: '', campaign_type: '', budget_range: '', timeline: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form-success">
        <div className="success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out! We'll get back to you with a custom proposal.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Your Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="John Smith"
            value={formData.name}
            onFocus={() => handleFieldFocus('name')}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john@company.com"
            value={formData.email}
            onFocus={() => handleFieldFocus('email')}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onFocus={() => handleFieldFocus('phone')}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Your Company"
            value={formData.company}
            onFocus={() => handleFieldFocus('company')}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="campaign_type">Campaign Type</label>
        <select
          id="campaign_type"
          name="campaign_type"
          value={formData.campaign_type}
          onFocus={() => handleFieldFocus('campaign_type')}
          onChange={(e) => setFormData({ ...formData, campaign_type: e.target.value })}
        >
          <option value="">Select a campaign type...</option>
          <option value="street_activation">Street Activation</option>
          <option value="brand_ambassadors">Brand Ambassadors</option>
          <option value="event_staffing">Event Staffing</option>
          <option value="product_sampling">Product Sampling</option>
          <option value="flyering">Flyer Distribution</option>
          <option value="multi_city">Multi-City Campaign</option>
          <option value="long_term">Long-Term Program</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="budget_range">Budget Range</label>
          <select
            id="budget_range"
            name="budget_range"
            value={formData.budget_range}
            onFocus={() => handleFieldFocus('budget_range')}
            onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
          >
            <option value="">Select budget range...</option>
            <option value="under_5k">Under $5K</option>
            <option value="5k_10k">$5K-$10K</option>
            <option value="10k_25k">$10K-$25K</option>
            <option value="25k_50k">$25K-$50K</option>
            <option value="50k_plus">$50K+</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="timeline">Timeline</label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onFocus={() => handleFieldFocus('timeline')}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          >
            <option value="">Select timeline...</option>
            <option value="this_week">This week</option>
            <option value="within_2_weeks">Within 2 weeks</option>
            <option value="within_a_month">Within a month</option>
            <option value="1_3_months">1-3 months</option>
            <option value="just_exploring">Just exploring</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Tell us about your campaign *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Campaign goals, locations, number of staff needed..."
          value={formData.message}
          onFocus={() => handleFieldFocus('message')}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Get Started'}
      </button>

      {status === 'error' && (
        <p className="form-error">Something went wrong. Please email hello@streetteamsco.com directly.</p>
      )}
    </form>
  );
}
