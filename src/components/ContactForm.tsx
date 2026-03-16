import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    campaign_type: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/myznknaa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `[Street Teams Co] New inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', campaign_type: '', message: '' });
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
        <p>Thanks for reaching out! We'll get back to you within 24 hours.</p>
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
          onChange={(e) => setFormData({ ...formData, campaign_type: e.target.value })}
        >
          <option value="">Select a campaign type...</option>
          <option value="street_activation">Street Activation</option>
          <option value="brand_ambassadors">Brand Ambassadors</option>
          <option value="event_staffing">Event Staffing</option>
          <option value="product_sampling">Product Sampling</option>
          <option value="flyering">Flyer Distribution</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Tell us about your campaign *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Campaign goals, timeline, locations, budget range..."
          value={formData.message}
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
