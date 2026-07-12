/**
 * AFM Lead Pipeline — Website Lead Logger (Google Apps Script Web App)
 * ---------------------------------------------------------------------
 * Appends every website lead to the "Website Leads" tab of the AFM Lead
 * Pipeline sheet. Immune to Formspree — the site posts here directly via
 * the /api/sheet-log Vercel relay.
 *
 * SHEET: 1mut2EAVnONPneTXlo0nPnrPB9L3nSZ7rRRMrwMAZ7LY
 *
 * DEPLOY STEPS (one time):
 *   1. Go to https://script.google.com  →  New project
 *   2. Paste this whole file in, save.
 *   3. Deploy ▸ New deployment ▸ type "Web app"
 *        - Execute as: Me (joey@airfreshmarketing.com)
 *        - Who has access: Anyone
 *   4. Copy the Web App URL (ends in /exec)
 *   5. Send that URL to Forge — it becomes the SHEET_LOG_URL env var on Vercel.
 */

var SHEET_ID = '1mut2EAVnONPneTXlo0nPnrPB9L3nSZ7rRRMrwMAZ7LY';
var TAB_NAME = 'Website Leads';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(TAB_NAME);

    // Auto-create the tab + header row if missing
    if (!sheet) {
      sheet = ss.insertSheet(TAB_NAME);
      sheet.appendRow([
        'Timestamp', 'Source', 'Name', 'Email', 'Phone', 'Company',
        'Campaign Type', 'Budget Range', 'Timeline', 'Message'
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.source || '',
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.campaign_type || '',
      data.budget_range || '',
      data.timeline || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional GET for a quick health check in the browser
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'AFM Lead Logger' }))
    .setMimeType(ContentService.MimeType.JSON);
}
