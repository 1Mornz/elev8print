"use client";

import styles from "./tos.module.css";

const TOC = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "services", label: "2. Description of Services" },
  { id: "accounts", label: "3. User Accounts" },
  { id: "orders", label: "4. Orders and Payment" },
  { id: "intellectual", label: "5. Intellectual Property" },
  { id: "prohibited", label: "6. Prohibited Uses" },
  { id: "privacy", label: "7. Privacy Policy" },
  { id: "limitation", label: "8. Limitation of Liability" },
  { id: "termination", label: "9. Termination" },
  { id: "contact", label: "10. Contact Information" },
];

export default function TermsOfServicePage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles["terms-of-service"]}>
      <div className={styles.container}>
        <div className={styles["terms-header"]}>
          <h1>Terms of Service</h1>
          <p className={styles["last-updated"]}>Last updated: September 10, 2025</p>
        </div>

        <div className={styles["terms-content"]}>
          <div className={styles["terms-nav"]}>
            <h3>Table of Contents</h3>
            <ul>
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles["terms-text"]}>
            <section id="acceptance" className={styles["terms-section"]}>
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and using ELEV8 PRINT&apos;s website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
              <p>These Terms of Service (&quot;Terms&quot;) govern your use of our website located at elev8print.com (the &quot;Service&quot;) operated by ELEV8 PRINT (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).</p>
            </section>

            <section id="services" className={styles["terms-section"]}>
              <h2>2. Description of Services</h2>
              <p>ELEV8 PRINT provides custom printing services including but not limited to:</p>
              <ul>
                <li>Custom stickers and labels</li>
                <li>Die-cut stickers in various shapes</li>
                <li>Vinyl, paper, and specialty material printing</li>
                <li>Design consultation and file preparation</li>
                <li>Bulk and wholesale printing services</li>
              </ul>
              <p>We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without notice.</p>
            </section>

            <section id="accounts" className={styles["terms-section"]}>
              <h2>3. User Accounts</h2>
              <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for maintaining the confidentiality of your account.</p>
              <p>You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.</p>
            </section>

            <section id="orders" className={styles["terms-section"]}>
              <h2>4. Orders and Payment</h2>
              <h3>Order Process</h3>
              <p>All orders are subject to acceptance by ELEV8 PRINT. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or problems identified by our fraud detection systems.</p>
              <h3>Pricing and Payment</h3>
              <p>All prices are listed in USD and are subject to change without notice. Payment is due at the time of order placement. We accept major credit cards, PayPal, and other payment methods as indicated on our website.</p>
              <h3>Production and Shipping</h3>
              <p>Production times vary based on order complexity and current queue. Standard production time is 3-5 business days, with express options available. Shipping times are separate from production times.</p>
            </section>

            <section id="intellectual" className={styles["terms-section"]}>
              <h2>5. Intellectual Property Rights</h2>
              <h3>Your Content</h3>
              <p>You retain ownership of any intellectual property rights that you hold in content that you submit to us for printing. However, by submitting content, you grant us a limited license to use, reproduce, and modify your content solely for the purpose of fulfilling your order.</p>
              <h3>Our Content</h3>
              <p>The Service and its original content, features, and functionality are and will remain the exclusive property of ELEV8 PRINT and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
              <h3>Copyright Compliance</h3>
              <p>You warrant that you have the right to use any content you submit for printing and that such use does not infringe upon the rights of any third party. We reserve the right to refuse orders that may infringe on intellectual property rights.</p>
            </section>

            <section id="prohibited" className={styles["terms-section"]}>
              <h2>6. Prohibited Uses</h2>
              <p>You may not use our Service:</p>
              <ul>
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of the Service</li>
              </ul>
            </section>

            <section id="privacy" className={styles["terms-section"]}>
              <h2>7. Privacy Policy</h2>
              <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.</p>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section id="limitation" className={styles["terms-section"]}>
              <h2>8. Limitation of Liability</h2>
              <p>In no event shall ELEV8 PRINT, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.</p>
              <p>Our total liability to you for any damages arising out of or related to these Terms or the Service shall not exceed the amount you paid to us in the twelve (12) months preceding the event giving rise to the liability.</p>
            </section>

            <section id="termination" className={styles["terms-section"]}>
              <h2>9. Termination</h2>
              <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              <p>If you wish to terminate your account, you may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination.</p>
            </section>

            <section id="contact" className={styles["terms-section"]}>
              <h2>10. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <div className={styles["contact-info"]}>
                <p><strong>Email:</strong> admin@elaborate-designs.com</p>
                <p><strong>Phone:</strong> (248) 884-3965</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
