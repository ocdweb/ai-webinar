/* ──────────────────────────────────────────────────────────────
   Webinar schedule (single source of truth for both pages)

   The live date is PINNED — the site shows SCHEDULE[ACTIVE_INDEX] and
   does NOT advance on its own. To move to the next session, change
   ACTIVE_INDEX below (and/or edit SCHEDULE), then publish only after
   the client confirms. This keeps every date change under manual review.

   All sessions are 4:00 PM Melbourne time. Melbourne is AEDT (UTC+11)
   during daylight saving (Oct–Apr) and AEST (UTC+10) otherwise, so set
   OFFSET / TZ_LABEL to match the active date below.
   ────────────────────────────────────────────────────────────── */
(function () {
  var SCHEDULE = [
    { date: '2026-10-22', label: 'Thursday 22 October',  labelLong: 'Thursday 22nd of October' },
    { date: '2026-11-05', label: 'Thursday 5 November',  labelLong: 'Thursday 5th of November' },
    { date: '2026-11-19', label: 'Thursday 19 November', labelLong: 'Thursday 19th of November' },
    { date: '2026-12-03', label: 'Thursday 3 December',  labelLong: 'Thursday 3rd of December' }
  ];

  // Which session is live right now. Advance ONLY on client confirmation.
  var ACTIVE_INDEX = 0;           // 0 = Thursday 22 October

  var START_LOCAL = '16:00:00';   // 4:00 PM
  var END_LOCAL   = '18:00:00';   // 6:00 PM (2-hour block)
  var OFFSET      = '+11:00';     // AEDT (UTC+11) for these Oct–Dec dates
  var TZ_LABEL    = 'AEDT';
  var DURATION_MS = 2 * 3600000;

  function pad(n) { return String(n).padStart(2, '0'); }
  function startInstant(e) { return new Date(e.date + 'T' + START_LOCAL + OFFSET); }
  function utcCompact(d) {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
      'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z';
  }

  var e     = SCHEDULE[ACTIVE_INDEX] || SCHEDULE[0];
  var start = startInstant(e);
  var end   = new Date(start.getTime() + DURATION_MS);
  var timeLabel = '4:00 PM ' + TZ_LABEL;

  window.WEBINAR = {
    start:        start,                                  // Date object for countdown
    timeLabel:    timeLabel,                              // "4:00 PM AEDT"
    label:        e.label,                                // "Thursday 22 October"
    labelLong:    e.labelLong,                            // "Thursday 22nd of October"
    full:         e.label + ', ' + timeLabel,             // "Thursday 22 October, 4:00 PM AEDT"
    fullLong:     e.labelLong + ' at ' + timeLabel,       // "Thursday 22nd of October at 4:00 PM AEDT"
    gcalDates:    utcCompact(start) + '/' + utcCompact(end),
    icsStart:     utcCompact(start),
    icsEnd:       utcCompact(end),
    outlookStart: e.date + 'T' + START_LOCAL,
    outlookEnd:   e.date + 'T' + END_LOCAL
  };
})();
