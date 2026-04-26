import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  Users,
  Building2,
  Sparkles,
  ClipboardList,
  HeartHandshake,
  Minus,
  Plus,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Mail,
  Truck,
  Camera,
  Car,
  FileText,
  Utensils,
  Zap,
  UserCheck,
  Package,
  Tablet,
  BarChart3,
  Shirt,
  MapPin,
  Star,
  Shield,
  TrendingDown,
  X,
  DoorOpen,
  Wine,
  Globe,
} from 'lucide-react';

// ─── Service Types matching Street Teams Co's 9 roles ───
const SERVICE_TYPES = [
  {
    id: 'street-teams',
    label: 'Street Teams',
    icon: Users,
    lowRate: 25,
    highRate: 45,
    description: 'Flyering, canvassing, guerrilla activations, high-traffic outreach.',
    popular: true,
  },
  {
    id: 'brand-ambassadors',
    label: 'Brand Ambassadors',
    icon: Sparkles,
    lowRate: 30,
    highRate: 55,
    description: 'Product sampling, consumer engagement, brand representation.',
  },
  {
    id: 'promo-models',
    label: 'Promotional Models',
    icon: Star,
    lowRate: 35,
    highRate: 65,
    description: 'Photo activations, brand visibility, premium consumer engagement.',
  },
  {
    id: 'team-leads',
    label: 'Team Leads',
    icon: ClipboardList,
    lowRate: 40,
    highRate: 75,
    description: 'On-site supervision, quality assurance, team coordination.',
  },
  {
    id: 'product-demonstrators',
    label: 'Product Demonstrators',
    icon: HeartHandshake,
    lowRate: 35,
    highRate: 55,
    description: 'In-store demos, trade show booths, tech product showcases.',
  },
  {
    id: 'booth-staff',
    label: 'Booth Staff',
    icon: Building2,
    lowRate: 30,
    highRate: 50,
    description: 'Trade shows, expos, conferences, lead qualification.',
  },
  {
    id: 'hosts-greeters',
    label: 'Hosts & Greeters',
    icon: DoorOpen,
    lowRate: 25,
    highRate: 40,
    description: 'Registration, check-in, VIP areas, corporate events.',
  },
  {
    id: 'bilingual-staff',
    label: 'Bilingual Staff',
    icon: Globe,
    lowRate: 35,
    highRate: 60,
    description: 'Spanish, Mandarin, and other language campaigns.',
  },
  {
    id: 'licensed-bartenders',
    label: 'Licensed Bartenders',
    icon: Wine,
    lowRate: 40,
    highRate: 65,
    description: 'Events with alcohol service, brand tastings.',
  },
];

// ─── Market Tiers ───
interface City {
  name: string;
  value: string;
}

interface MarketTier {
  label: string;
  multiplier: number;
  cities: City[];
}

const MARKET_TIERS: MarketTier[] = [
  {
    label: 'Tier 1 - Premium Markets',
    multiplier: 1.2,
    cities: [
      { name: 'San Francisco', value: 'san-francisco' },
      { name: 'New York City', value: 'new-york' },
      { name: 'Los Angeles', value: 'los-angeles' },
    ],
  },
  {
    label: 'Tier 2 - Major Markets',
    multiplier: 1.1,
    cities: [
      { name: 'Chicago', value: 'chicago' },
      { name: 'Miami', value: 'miami' },
      { name: 'Boston', value: 'boston' },
      { name: 'Seattle', value: 'seattle' },
      { name: 'Washington D.C.', value: 'washington-dc' },
      { name: 'Philadelphia', value: 'philadelphia' },
      { name: 'San Diego', value: 'san-diego' },
      { name: 'Minneapolis', value: 'minneapolis' },
    ],
  },
  {
    label: 'Tier 3 - Core Markets',
    multiplier: 1.0,
    cities: [
      { name: 'Denver', value: 'denver' },
      { name: 'Dallas', value: 'dallas' },
      { name: 'Atlanta', value: 'atlanta' },
      { name: 'Houston', value: 'houston' },
      { name: 'Phoenix', value: 'phoenix' },
      { name: 'Las Vegas', value: 'las-vegas' },
      { name: 'Austin', value: 'austin' },
      { name: 'Nashville', value: 'nashville' },
      { name: 'Charlotte', value: 'charlotte' },
      { name: 'Tampa', value: 'tampa' },
      { name: 'Portland', value: 'portland' },
      { name: 'Orlando', value: 'orlando' },
      { name: 'San Antonio', value: 'san-antonio' },
      { name: 'New Orleans', value: 'new-orleans' },
      { name: 'Salt Lake City', value: 'salt-lake-city' },
      { name: 'Raleigh', value: 'raleigh' },
      { name: 'Columbus', value: 'columbus' },
    ],
  },
  {
    label: 'Tier 4 - Other Markets',
    multiplier: 0.95,
    cities: [
      { name: 'Indianapolis', value: 'indianapolis' },
      { name: 'Kansas City', value: 'kansas-city' },
      { name: 'Milwaukee', value: 'milwaukee' },
      { name: 'Cincinnati', value: 'cincinnati' },
      { name: 'Cleveland', value: 'cleveland' },
      { name: 'Pittsburgh', value: 'pittsburgh' },
      { name: 'St. Louis', value: 'st-louis' },
      { name: 'Detroit', value: 'detroit' },
      { name: 'Baltimore', value: 'baltimore' },
      { name: 'Richmond', value: 'richmond' },
      { name: 'Birmingham', value: 'birmingham' },
      { name: 'Memphis', value: 'memphis' },
      { name: 'Jacksonville', value: 'jacksonville' },
      { name: 'Oklahoma City', value: 'oklahoma-city' },
      { name: 'Louisville', value: 'louisville' },
      { name: 'Hartford', value: 'hartford' },
      { name: 'Buffalo', value: 'buffalo' },
      { name: 'Tucson', value: 'tucson' },
      { name: 'Albuquerque', value: 'albuquerque' },
      { name: 'Boise', value: 'boise' },
      { name: 'Omaha', value: 'omaha' },
      { name: 'El Paso', value: 'el-paso' },
      { name: 'Honolulu', value: 'honolulu' },
      { name: 'Anchorage', value: 'anchorage' },
    ],
  },
];

const CITY_MULTIPLIER_MAP: Record<string, number> = {};
MARKET_TIERS.forEach((tier) => {
  tier.cities.forEach((city) => {
    CITY_MULTIPLIER_MAP[city.value] = tier.multiplier;
  });
});

// ─── Add-ons ───
interface AddOn {
  id: string;
  label: string;
  costLabel: string;
  icon: typeof Users;
  type: 'flat' | 'per-person' | 'per-hour' | 'per-person-day' | 'per-device' | 'surcharge';
  lowCost: number;
  highCost: number;
}

const ADD_ONS: AddOn[] = [
  { id: 'logistics', label: 'Event Logistics & Coordination', costLabel: '+$500 - $2,000', icon: ClipboardList, type: 'flat', lowCost: 500, highCost: 2000 },
  { id: 'uniforms', label: 'Custom Uniforms / Branded Apparel', costLabel: '+$25 - $50/person', icon: Shirt, type: 'per-person', lowCost: 25, highCost: 50 },
  { id: 'travel', label: 'Travel & Accommodation', costLabel: '+$200 - $500/person', icon: Truck, type: 'per-person', lowCost: 200, highCost: 500 },
  { id: 'tradeshow-setup', label: 'Trade Show Setup Support', costLabel: '+$1,000 - $3,000', icon: Building2, type: 'flat', lowCost: 1000, highCost: 3000 },
  { id: 'reporting', label: 'Real-Time Reporting & Analytics', costLabel: '+$300 - $800', icon: BarChart3, type: 'flat', lowCost: 300, highCost: 800 },
  { id: 'photography', label: 'Photography / Content Creation', costLabel: '+$500 - $1,500', icon: Camera, type: 'flat', lowCost: 500, highCost: 1500 },
  { id: 'vehicle-wrap', label: 'Vehicle / Mobile Tour Wrap', costLabel: '+$2,000 - $5,000', icon: Car, type: 'flat', lowCost: 2000, highCost: 5000 },
  { id: 'permits', label: 'Permit & Venue Coordination', costLabel: '+$300 - $1,000', icon: FileText, type: 'flat', lowCost: 300, highCost: 1000 },
  { id: 'storage', label: 'Product Storage & Inventory', costLabel: '+$200 - $600', icon: Package, type: 'flat', lowCost: 200, highCost: 600 },
  { id: 'lead-capture', label: 'Lead Capture Technology', costLabel: '+$50 - $100/device', icon: Tablet, type: 'per-device', lowCost: 50, highCost: 100 },
  { id: 'recap-report', label: 'Post-Event Recap & Analytics', costLabel: '+$500 - $1,200', icon: FileText, type: 'flat', lowCost: 500, highCost: 1200 },
  { id: 'meals', label: 'Staff Meals & Refreshments', costLabel: '+$15 - $25/person/day', icon: Utensils, type: 'per-person-day', lowCost: 15, highCost: 25 },
  { id: 'rush', label: 'Rush Booking (< 72hrs)', costLabel: '+15 - 25% surcharge', icon: Zap, type: 'surcharge', lowCost: 0.15, highCost: 0.25 },
  { id: 'team-lead', label: 'On-Site Team Lead / Manager', costLabel: '+$85 - $120/hr', icon: UserCheck, type: 'per-hour', lowCost: 85, highCost: 120 },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Animated Counter Hook ───
function useAnimatedValue(targetValue: number, duration: number = 500): number {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const animationRef = useRef<number | null>(null);
  const startValueRef = useRef(targetValue);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValueRef.current + (targetValue - startValueRef.current) * eased);
      setDisplayValue(current);
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue, duration]);

  return displayValue;
}

export default function CostCalculator() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [staffCount, setStaffCount] = useState(5);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });

  useEffect(() => {
    const handleScroll = () => setShowMobileBar(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showQuoteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showQuoteModal]);

  const service = useMemo(() => SERVICE_TYPES.find((s) => s.id === selectedService), [selectedService]);
  const multiplier = useMemo(() => (selectedCity ? CITY_MULTIPLIER_MAP[selectedCity] || 1.0 : 1.0), [selectedCity]);

  const toggleAddOn = useCallback((id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const estimate = useMemo(() => {
    if (!service) return { low: 0, high: 0 };
    const totalHours = staffCount * hoursPerDay * numberOfDays;
    let baseLow = Math.round(service.lowRate * multiplier * totalHours);
    let baseHigh = Math.round(service.highRate * multiplier * totalHours);
    let addOnLow = 0, addOnHigh = 0;
    let surchargeRateLow = 0, surchargeRateHigh = 0;

    selectedAddOns.forEach((addOnId) => {
      const addOn = ADD_ONS.find((a) => a.id === addOnId);
      if (!addOn) return;
      switch (addOn.type) {
        case 'flat': addOnLow += addOn.lowCost; addOnHigh += addOn.highCost; break;
        case 'per-person': addOnLow += addOn.lowCost * staffCount; addOnHigh += addOn.highCost * staffCount; break;
        case 'per-hour': addOnLow += addOn.lowCost * hoursPerDay * numberOfDays; addOnHigh += addOn.highCost * hoursPerDay * numberOfDays; break;
        case 'per-person-day': addOnLow += addOn.lowCost * staffCount * numberOfDays; addOnHigh += addOn.highCost * staffCount * numberOfDays; break;
        case 'per-device': addOnLow += addOn.lowCost * staffCount; addOnHigh += addOn.highCost * staffCount; break;
        case 'surcharge': surchargeRateLow = addOn.lowCost; surchargeRateHigh = addOn.highCost; break;
      }
    });

    if (surchargeRateLow > 0) {
      baseLow = Math.round(baseLow * (1 + surchargeRateLow));
      baseHigh = Math.round(baseHigh * (1 + surchargeRateHigh));
    }
    return { low: baseLow + addOnLow, high: baseHigh + addOnHigh };
  }, [service, multiplier, staffCount, hoursPerDay, numberOfDays, selectedAddOns]);

  const animatedLow = useAnimatedValue(estimate.low, 400);
  const animatedHigh = useAnimatedValue(estimate.high, 400);

  const cityName = useMemo(() => {
    for (const tier of MARKET_TIERS) {
      const found = tier.cities.find((c) => c.value === selectedCity);
      if (found) return found.name;
    }
    return '';
  }, [selectedCity]);

  const progressParts = useMemo(() => {
    const parts: string[] = [];
    if (service) parts.push(service.label);
    if (cityName) parts.push(cityName);
    parts.push(`${staffCount} staff`);
    parts.push(`${hoursPerDay} hrs`);
    parts.push(`${numberOfDays} ${numberOfDays === 1 ? 'day' : 'days'}`);
    if (selectedAddOns.size > 0) parts.push(`${selectedAddOns.size} add-on${selectedAddOns.size > 1 ? 's' : ''}`);
    return parts;
  }, [service, cityName, staffCount, hoursPerDay, numberOfDays, selectedAddOns]);

  const handleOpenQuoteModal = () => {
    setFormStatus('idle');
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    setShowQuoteModal(true);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const addOnLabels = Array.from(selectedAddOns).map((id) => ADD_ONS.find((a) => a.id === id)?.label).filter(Boolean).join(', ');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      company: formData.company || 'Not provided',
      message: formData.message || 'No additional details',
      _subject: `[Street Teams Co] Quote Request from ${formData.name}`,
      serviceType: service?.label || 'Not selected',
      market: cityName || 'Not selected',
      staffCount: String(staffCount),
      hoursPerDay: String(hoursPerDay),
      numberOfDays: String(numberOfDays),
      addOns: addOnLabels || 'None',
      estimateRange: estimate.low > 0 ? `${formatCurrency(estimate.low)} - ${formatCurrency(estimate.high)}` : 'Not calculated',
    };

    try {
      const res = await fetch('https://formspree.io/f/myznknaa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="calc-wrapper">
      {/* Comparison Callout */}
      <div className="calc-callout">
        <div className="calc-callout-icon">
          <TrendingDown size={20} color="#fff" />
        </div>
        <div>
          <h4 className="calc-callout-title">Save 20-30% Compared to Hiring Directly</h4>
          <p className="calc-callout-text">
            Our all-inclusive rates cover recruitment, training, insurance, and management — no hidden fees, no surprises.
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="calc-progress">
        <Calculator size={16} color="#f59e0b" />
        <span className="calc-progress-label">Your config:</span>
        {progressParts.map((part, i) => (
          <span key={i} className="calc-progress-item">
            {i > 0 && <span className="calc-progress-dot">&middot;</span>}
            <span className={i < 2 && (service || cityName) ? 'calc-progress-bold' : ''}>{part}</span>
          </span>
        ))}
      </div>

      <div className="calc-layout">
        {/* Left: Calculator Sections */}
        <div className="calc-left">

          {/* Section 1: Service Type */}
          <div className="calc-section">
            <div className="calc-section-header">
              <div className="calc-step-number">1</div>
              <h2>Select Your Service Type</h2>
            </div>
            <p className="calc-section-desc">Choose the type of staffing you need. Each role comes with specialized training.</p>
            <div className="calc-service-grid">
              {SERVICE_TYPES.map((svc) => {
                const isSelected = selectedService === svc.id;
                const SvcIcon = svc.icon;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedService(svc.id)}
                    className={`calc-service-card ${isSelected ? 'calc-service-card--selected' : ''}`}
                  >
                    {svc.popular && <span className="calc-popular-badge">Most Popular</span>}
                    {isSelected && <span className="calc-selected-badge"><CheckCircle2 size={16} /></span>}
                    <div className={`calc-service-icon ${isSelected ? 'calc-service-icon--selected' : ''}`}>
                      <SvcIcon size={20} />
                    </div>
                    <h3>{svc.label}</h3>
                    <span className={`calc-rate-badge ${isSelected ? 'calc-rate-badge--selected' : ''}`}>
                      {formatCurrency(svc.lowRate)} - {formatCurrency(svc.highRate)}/hr
                    </span>
                    <p>{svc.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Market */}
          <div className="calc-section">
            <div className="calc-section-header">
              <div className="calc-step-number">2</div>
              <h2>Select Your Market</h2>
            </div>
            <p className="calc-section-desc">Rates vary by city based on cost of living and talent availability. We operate in 50+ U.S. markets.</p>
            <div className="calc-select-wrap">
              <MapPin size={18} className="calc-select-icon" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="calc-select"
              >
                <option value="">Choose a city...</option>
                {MARKET_TIERS.map((tier) => (
                  <optgroup key={tier.label} label={`${tier.label} (${tier.multiplier}x)`}>
                    {tier.cities.map((city) => (
                      <option key={city.value} value={city.value}>{city.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            {selectedCity && (
              <div className="calc-market-badge">
                <MapPin size={14} /> {cityName} — {multiplier}x rate multiplier
              </div>
            )}
          </div>

          {/* Section 3: Staff Count */}
          <div className="calc-section">
            <div className="calc-section-header">
              <div className="calc-step-number">3</div>
              <h2>Number of Staff</h2>
            </div>
            <p className="calc-section-desc">Most single-event activations use 2-6 staff, while large campaigns may need 20+.</p>
            <div className="calc-counter-row">
              <button className="calc-counter-btn" onClick={() => setStaffCount(Math.max(1, staffCount - 1))} aria-label="Decrease staff"><Minus size={18} /></button>
              <div className="calc-counter-display">
                <span className="calc-counter-value">{staffCount}</span>
                <span className="calc-counter-label">staff</span>
              </div>
              <button className="calc-counter-btn" onClick={() => setStaffCount(Math.min(100, staffCount + 1))} aria-label="Increase staff"><Plus size={18} /></button>
              <div className="calc-quick-picks">
                {[2, 5, 10, 20, 50].map((num) => (
                  <button key={num} onClick={() => setStaffCount(num)} className={`calc-quick-btn ${staffCount === num ? 'calc-quick-btn--active' : ''}`}>{num}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Hours Per Day */}
          <div className="calc-section">
            <div className="calc-section-header">
              <div className="calc-step-number">4</div>
              <h2>Hours Per Day</h2>
            </div>
            <p className="calc-section-desc">Standard shifts range from 4 to 12 hours. 4-hour minimum required.</p>
            <div className="calc-counter-row">
              <button className="calc-counter-btn" onClick={() => setHoursPerDay(Math.max(4, hoursPerDay - 1))} aria-label="Decrease hours"><Minus size={18} /></button>
              <div className="calc-counter-display">
                <span className="calc-counter-value">{hoursPerDay}</span>
                <span className="calc-counter-label">hrs/day</span>
              </div>
              <button className="calc-counter-btn" onClick={() => setHoursPerDay(Math.min(12, hoursPerDay + 1))} aria-label="Increase hours"><Plus size={18} /></button>
              <div className="calc-quick-picks">
                {[4, 6, 8, 10, 12].map((num) => (
                  <button key={num} onClick={() => setHoursPerDay(num)} className={`calc-quick-btn ${hoursPerDay === num ? 'calc-quick-btn--active' : ''}`}>{num}h</button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Number of Days */}
          <div className="calc-section">
            <div className="calc-section-header">
              <div className="calc-step-number">5</div>
              <h2>Number of Event Days</h2>
            </div>
            <p className="calc-section-desc">Multi-day bookings often qualify for better rates. Contact us for volume discounts on 7+ day engagements.</p>
            <div className="calc-counter-row">
              <button className="calc-counter-btn" onClick={() => setNumberOfDays(Math.max(1, numberOfDays - 1))} aria-label="Decrease days"><Minus size={18} /></button>
              <div className="calc-counter-display">
                <span className="calc-counter-value">{numberOfDays}</span>
                <span className="calc-counter-label">{numberOfDays === 1 ? 'day' : 'days'}</span>
              </div>
              <button className="calc-counter-btn" onClick={() => setNumberOfDays(Math.min(30, numberOfDays + 1))} aria-label="Increase days"><Plus size={18} /></button>
              <div className="calc-quick-picks">
                {[1, 2, 3, 5, 7, 14].map((num) => (
                  <button key={num} onClick={() => setNumberOfDays(num)} className={`calc-quick-btn ${numberOfDays === num ? 'calc-quick-btn--active' : ''}`}>{num}d</button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: Add-ons */}
          <div className="calc-section">
            <div className="calc-section-header">
              <div className="calc-step-number">6</div>
              <h2>Optional Add-ons</h2>
            </div>
            <p className="calc-section-desc">Enhance your campaign with these optional services. Select any that apply.</p>
            <div className="calc-addons-grid">
              {ADD_ONS.map((addOn) => {
                const isAddonSelected = selectedAddOns.has(addOn.id);
                const AddOnIcon = addOn.icon;
                return (
                  <button
                    key={addOn.id}
                    onClick={() => toggleAddOn(addOn.id)}
                    className={`calc-addon-card ${isAddonSelected ? 'calc-addon-card--selected' : ''}`}
                  >
                    <div className={`calc-addon-icon ${isAddonSelected ? 'calc-addon-icon--selected' : ''}`}>
                      <AddOnIcon size={18} />
                    </div>
                    <div className="calc-addon-text">
                      <h3>{addOn.label}</h3>
                      <span className={`calc-addon-cost ${isAddonSelected ? 'calc-addon-cost--selected' : ''}`}>{addOn.costLabel}</span>
                    </div>
                    <div className={`calc-addon-toggle ${isAddonSelected ? 'calc-addon-toggle--selected' : ''}`}>
                      {isAddonSelected && <CheckCircle2 size={14} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Sticky Sidebar */}
        <div className="calc-right">
          <div className="calc-sidebar-sticky">
            <div className="calc-sidebar">
              <div className="calc-sidebar-accent" />
              <div className="calc-sidebar-inner">
                <div className="calc-sidebar-header">
                  <div className="calc-sidebar-icon"><Calculator size={18} /></div>
                  <h3>Your Estimate</h3>
                </div>

                <div className="calc-sidebar-details">
                  <div className="calc-sidebar-row"><span>Service</span><strong>{service ? service.label : '--'}</strong></div>
                  <div className="calc-sidebar-row"><span>Market</span><strong>{cityName || '--'}</strong></div>
                  <div className="calc-sidebar-row"><span>Staff</span><strong>{staffCount}</strong></div>
                  <div className="calc-sidebar-row"><span>Hours/Day</span><strong>{hoursPerDay}</strong></div>
                  <div className="calc-sidebar-row"><span>Days</span><strong>{numberOfDays}</strong></div>
                  {selectedAddOns.size > 0 && (
                    <div className="calc-sidebar-row"><span>Add-ons</span><strong>{selectedAddOns.size} selected</strong></div>
                  )}
                  <div className="calc-sidebar-row calc-sidebar-row--muted"><span>Total Staff Hours</span><span>{staffCount * hoursPerDay * numberOfDays} hrs</span></div>
                </div>

                <div className="calc-sidebar-divider" />

                <div className="calc-estimate-display">
                  <div className="calc-estimate-label">Estimated Range</div>
                  {estimate.low > 0 ? (
                    <div className="calc-estimate-value">{formatCurrency(animatedLow)} - {formatCurrency(animatedHigh)}</div>
                  ) : (
                    <div className="calc-estimate-empty">Select a service to begin</div>
                  )}
                </div>

                <p className="calc-sidebar-fine-print">
                  This is an estimate. Actual pricing depends on event scope, staff experience, and specific logistics.
                </p>

                <button onClick={handleOpenQuoteModal} className="calc-cta-btn">
                  Get Your Exact Quote <ArrowRight size={16} />
                </button>
                <div className="calc-sidebar-email">
                  <a href="mailto:hello@streetteamsco.com">
                    <Mail size={14} /> hello@streetteamsco.com
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="calc-trust-grid">
              <div className="calc-trust-card"><div className="calc-trust-number">500+</div><div className="calc-trust-label">Campaigns</div></div>
              <div className="calc-trust-card">
                <div className="calc-trust-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <div className="calc-trust-number">4.9/5</div>
                <div className="calc-trust-label">Client Rating</div>
              </div>
              <div className="calc-trust-card"><div className="calc-trust-number">50+</div><div className="calc-trust-label">U.S. Markets</div></div>
              <div className="calc-trust-card"><div className="calc-trust-number">24hr</div><div className="calc-trust-label">Quote Turnaround</div></div>
            </div>

            {/* Guarantee */}
            <div className="calc-guarantee">
              <div className="calc-guarantee-icon"><Shield size={18} color="#fff" /></div>
              <div>
                <h4>All-Inclusive Pricing</h4>
                <p>Rates include recruitment, background checks, brand training, insurance, payroll, and post-campaign reporting. No hidden fees.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Estimate Bar */}
      {showMobileBar && (
        <div className="calc-mobile-bar">
          <div className="calc-mobile-bar-inner">
            <div className="calc-mobile-bar-left">
              <div className="calc-mobile-bar-label">Estimate</div>
              {estimate.low > 0 ? (
                <div className="calc-mobile-bar-value">{formatCurrency(animatedLow)} - {formatCurrency(animatedHigh)}</div>
              ) : (
                <div className="calc-mobile-bar-empty">Select a service</div>
              )}
            </div>
            <button onClick={handleOpenQuoteModal} className="calc-mobile-bar-btn">
              Get Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="calc-modal-overlay" onClick={() => setShowQuoteModal(false)}>
          <div className="calc-modal" onClick={(e) => e.stopPropagation()}>
            <button className="calc-modal-close" onClick={() => setShowQuoteModal(false)} aria-label="Close">
              <X size={20} />
            </button>

            {formStatus === 'success' ? (
              <div className="calc-modal-success">
                <div className="calc-modal-success-icon"><CheckCircle2 size={48} /></div>
                <h2>Quote Request Sent!</h2>
                <p>We'll send your custom proposal to <strong>{formData.email}</strong> within 24 hours.</p>
                <button className="calc-cta-btn" onClick={() => setShowQuoteModal(false)}>Close</button>
              </div>
            ) : (
              <>
                <div className="calc-modal-header">
                  {estimate.low > 0 && (
                    <div className="calc-modal-estimate">
                      Your Estimated Range: <strong>{formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}</strong>
                    </div>
                  )}
                  <p className="calc-modal-subtitle">
                    This is a preliminary estimate. Give us your contact info and as much detail as you can, and we'll have a custom proposal in your inbox within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmitQuote} className="calc-modal-form">
                  <div className="calc-modal-form-row">
                    <div className="calc-modal-field">
                      <label htmlFor="quote-name">Name *</label>
                      <input
                        id="quote-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="calc-modal-field">
                      <label htmlFor="quote-email">Email *</label>
                      <input
                        id="quote-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <div className="calc-modal-form-row">
                    <div className="calc-modal-field">
                      <label htmlFor="quote-phone">Phone</label>
                      <input
                        id="quote-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="calc-modal-field">
                      <label htmlFor="quote-company">Company</label>
                      <input
                        id="quote-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  <div className="calc-modal-field">
                    <label htmlFor="quote-message">Additional Details</label>
                    <textarea
                      id="quote-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your campaign — goals, timeline, special requirements..."
                    />
                  </div>

                  <div className="calc-modal-summary">
                    <h4>Campaign Summary</h4>
                    <div className="calc-modal-summary-grid">
                      <span>Service:</span><span>{service?.label || 'Not selected'}</span>
                      <span>Market:</span><span>{cityName || 'Not selected'}</span>
                      <span>Staff:</span><span>{staffCount}</span>
                      <span>Hours/Day:</span><span>{hoursPerDay}</span>
                      <span>Days:</span><span>{numberOfDays}</span>
                      {selectedAddOns.size > 0 && (
                        <>
                          <span>Add-ons:</span>
                          <span>{Array.from(selectedAddOns).map((id) => ADD_ONS.find((a) => a.id === id)?.label).filter(Boolean).join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {formStatus === 'error' && (
                    <p className="calc-modal-error">Something went wrong. Please try again or email us directly at hello@streetteamsco.com</p>
                  )}

                  <button type="submit" className="calc-cta-btn calc-cta-btn--full" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Quote Request'}
                    {formStatus !== 'submitting' && <ArrowRight size={16} />}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
