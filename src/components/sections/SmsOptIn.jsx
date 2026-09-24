// ── src/components/sections/SmsOptIn.jsx ──
// Bridge (bridge.insure) SMS text opt-in embed.
//
// We embed the HOSTED FORM LINK directly via iframe rather than Bridge's
// "form script" snippet. Why: the script the rep provided
// (https://api4.bridge.insure/form/2jOlEshp) returns an empty body (HTTP 200,
// 0 bytes), so it injects nothing — the iframe rendered blank. The hosted link
// below serves the real form and sends no X-Frame-Options/frame-ancestors
// header, so it embeds cleanly. The rep confirmed both the script and the
// hosted link push opt-in consent into Bridge automatically (no webhook needed).
//
// NOTE: Bridge's form CANNOT be prefilled (verified 2026-09-24). Its code reads
// only uuid/shortcode/referrer from the URL, it has no postMessage listener,
// and the iframe is cross-origin so we can't touch its fields. The best we can
// do is show the details the visitor just entered so they can copy them over.
import React from "react";
import { MessageSquareText } from "lucide-react";
import "./SmsOptIn.css";

const BRIDGE_FORM_URL = "https://forms.bridge.insure/southeast-text-opt-in";

export default function SmsOptIn({ contact }) {
  const firstName = contact?.fullName?.trim().split(/\s+/)[0];

  return (
    <div className="sms-optin">
      <div className="sms-optin-header">
        <div className="sms-optin-icon">
          <MessageSquareText />
        </div>
        <div className="sms-optin-heading">
          <h4>One last step — get text updates{firstName ? `, ${firstName}` : ""}</h4>
          <p>
            Opt in below to receive quote and policy updates by text. This is
            optional and separate from your quote request — message &amp; data
            rates may apply, reply STOP to cancel anytime.
          </p>
        </div>
      </div>

      {contact && (
        <div className="sms-optin-hint">
          <p>Use the same details you just entered:</p>
          <dl className="sms-optin-details">
            <dt>Name</dt>
            <dd>{contact.fullName}</dd>
            <dt>Email</dt>
            <dd>{contact.email}</dd>
            <dt>Mobile</dt>
            <dd>{contact.phone}</dd>
          </dl>
        </div>
      )}

      <iframe
        src={BRIDGE_FORM_URL}
        title="Text message opt-in"
        className="sms-optin-frame"
        loading="lazy"
      />
    </div>
  );
}
