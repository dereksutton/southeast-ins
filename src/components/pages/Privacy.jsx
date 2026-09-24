// ── src/components/pages/Privacy.jsx ──
// Texting Terms & Privacy — the legal home for our SMS program.
// The Bridge opt-in consent text points visitors here, and carriers look for
// this page during 10DLC review, so it must stay reachable at /privacy.
import React, { useEffect } from "react";
import Footer from "../layout/Footer";
import "./Privacy.css";

export default function Privacy() {
  // index.html carries the homepage title, so set our own for this route.
  useEffect(() => {
    document.title = "Texting Terms & Privacy | Southeast Insurance Agency";
  }, []);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="legal-header-inner">
          <a href="/">
            <img
              src="/img/southeast-logo.png"
              alt="Southeast Insurance"
              className="legal-logo"
            />
          </a>
        </div>
      </header>

      <main className="legal-main">
        <span className="legal-eyebrow">Legal</span>
        <h1 className="legal-title">Texting Terms &amp; Privacy</h1>
        <p className="legal-updated">Last updated: September 24, 2026</p>

        <div className="legal-body">
          <p>
            Our clients may opt-in to receive text communications from Southeast
            Insurance Agency &ldquo;the Agency&rdquo; through our Text Opt-in
            form found on our website or received in an email. Consent is not a
            condition of purchase.
          </p>

          <p>
            Upon submission of the form to our office, our Agency may send text
            messages in various formats and with various contents, including but
            not limited to text messages about insurance policies, agency
            information, replies to transactions initiated by You, or marketing
            the products/services offered by the Agency. Message frequency
            varies, but we typically send 1&ndash;2 messages per week. Message
            and Data Rates may apply. Wireless carriers are not liable for
            delayed or undelivered messages.
          </p>

          <p>
            By submitting the form, you acknowledge that you are the owner or
            authorized user of the mobile phone number you submit and will
            notify us immediately if you are no longer the owner or authorized
            user of the submitted mobile phone number. Additionally, you
            recognize that you are solely responsible for any message and data
            charges associated with such text messages.
          </p>

          <p>
            To opt out of receiving text messages from the Agency at any time,
            reply to a text with STOP, and you will be removed from our opt-in
            list. To receive future messages, you will need to resubmit the
            opt-in form.
          </p>

          <p>
            If at any time you would like assistance, you may text HELP to{" "}
            <a href="tel:+13862589998">386-258-9998</a>. You may also call us at{" "}
            <a href="tel:+13862589998">386-258-9998</a> or email us at{" "}
            <a href="mailto:brandon@southeastins.com">brandon@southeastins.com</a>.
          </p>

          <p>
            Your privacy is important to us. We do not share, sell, or lease our
            contact data collected for texting to any third-party individual,
            government agency, or company at any time unless compelled to do so
            by law.
          </p>
        </div>

        <a href="/" className="legal-back">
          &larr; Back to Southeast Insurance
        </a>
      </main>

      <Footer />
    </div>
  );
}
