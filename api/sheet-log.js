// Vercel serverless function — appends every lead to the AFM Lead Pipeline
// Google Sheet, independent of Formspree. This is the safety net: even if
// Formspree caps or stops emailing, every website lead still lands in the sheet.
//
// The append is done via a Google Apps Script Web App whose URL lives ONLY in
// the SHEET_LOG_URL server-side env var (never in client code — repo is public).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sheetUrl = process.env.SHEET_LOG_URL;
  if (!sheetUrl) {
    console.error('SHEET_LOG_URL is not set');
    return res.status(500).json({ error: 'Sheet logging not configured' });
  }

  const b = req.body || {};
  const row = {
    timestamp: new Date().toISOString(),
    source: b.source || 'streetteamsco.com',
    name: b.name || '',
    email: b.email || '',
    phone: b.phone || '',
    company: b.company || '',
    campaign_type: b.campaign_type || '',
    budget_range: b.budget_range || '',
    timeline: b.timeline || '',
    message: b.message || '',
  };

  try {
    const r = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });
    if (!r.ok) {
      const t = await r.text();
      console.error('Sheet log error', r.status, t);
      return res.status(502).json({ error: 'Sheet append failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Sheet log error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
