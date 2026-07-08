// Vercel serverless function — relays lead notifications to Slack.
// The real Slack Incoming Webhook URL lives ONLY in the SLACK_WEBHOOK_URL
// server-side env var, never in client-side code (this repo is public).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('SLACK_WEBHOOK_URL is not set');
    return res.status(500).json({ error: 'Slack webhook not configured' });
  }

  const body = req.body || {};
  const {
    name = 'Unknown',
    email = 'Unknown',
    phone = '',
    company = '',
    message = '',
    campaign_type = '',
    budget_range = '',
    timeline = '',
    source = 'streetteamsco.com',
  } = body;

  const fields = [
    { type: 'mrkdwn', text: `*Name:*\n${name}` },
    { type: 'mrkdwn', text: `*Email:*\n${email}` },
  ];
  if (phone) fields.push({ type: 'mrkdwn', text: `*Phone:*\n${phone}` });
  if (company) fields.push({ type: 'mrkdwn', text: `*Company:*\n${company}` });
  if (campaign_type) fields.push({ type: 'mrkdwn', text: `*Campaign Type:*\n${campaign_type}` });
  if (budget_range) fields.push({ type: 'mrkdwn', text: `*Budget:*\n${budget_range}` });
  if (timeline) fields.push({ type: 'mrkdwn', text: `*Timeline:*\n${timeline}` });

  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: '🎯 New Lead — Street Teams Co', emoji: true } },
    { type: 'section', fields },
  ];
  if (message) {
    blocks.push({ type: 'section', text: { type: 'mrkdwn', text: `*Message:*\n${message}` } });
  }
  blocks.push({ type: 'context', elements: [{ type: 'mrkdwn', text: `Source: ${source}` }] });

  try {
    const slackRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks, text: `New lead: ${name} (${email})` }),
    });
    if (!slackRes.ok) {
      const text = await slackRes.text();
      console.error('Slack webhook error', slackRes.status, text);
      return res.status(502).json({ error: 'Slack delivery failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Slack notify error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
