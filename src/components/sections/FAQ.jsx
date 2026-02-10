// src/components/sections/FAQ.jsx
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";
import Button from "../ui/Button";
import "./FAQ.css";

const faqData = [
  {
    category: "General Insurance",
    questions: [
      {
        q: "What types of insurance do you offer?",
        a: "We offer comprehensive coverage including Home Insurance, Auto Insurance, Flood Insurance, Umbrella Policies, Business Insurance, Boat & Marine Insurance, and Custom Coverage solutions. As an independent agency, we work with multiple top-rated carriers to find the best coverage and rates for your specific needs."
      },
      {
        q: "Why should I choose an independent insurance agency over a direct carrier?",
        a: "Independent agencies like Southeast Insurance work with multiple insurance carriers, allowing us to shop around and find you the best coverage at competitive rates. We're not limited to one company's products, which means we can tailor policies to your exact needs. Plus, you get personalized service from local experts who know Florida's unique insurance landscape."
      },
      {
        q: "How do I know if I have enough coverage?",
        a: "The right amount of coverage depends on your assets, lifestyle, and risk tolerance. We recommend scheduling a free coverage review with one of our agents. We'll assess your current policies, identify any gaps, and ensure you're adequately protected without paying for coverage you don't need."
      },
      {
        q: "What is a deductible and how does it work?",
        a: "A deductible is the amount you pay out-of-pocket before your insurance coverage kicks in. For example, if you have a $1,000 deductible and a $5,000 claim, you pay $1,000 and insurance covers the remaining $4,000. Generally, choosing a higher deductible lowers your premium, but means more out-of-pocket expense when you file a claim."
      },
      {
        q: "What does 'actual cash value' vs 'replacement cost' mean?",
        a: "Actual Cash Value (ACV) pays what your property is worth today, factoring in depreciation. Replacement Cost coverage pays to replace or repair your property with new items of similar quality, without deducting for depreciation. While replacement cost policies have slightly higher premiums, they provide significantly better protection."
      },
      {
        q: "How do insurance companies determine my premium?",
        a: "Insurers evaluate multiple risk factors including your location, claims history, credit score, the value of what you're insuring, chosen coverage limits and deductibles, and specific risk characteristics. In Florida, factors like proximity to the coast, roof age, and hurricane protection features heavily influence home insurance rates."
      },
      {
        q: "What is liability coverage and why is it important?",
        a: "Liability coverage protects you financially if you're responsible for injuring someone or damaging their property. It covers legal defense costs and settlements up to your policy limits. Without adequate liability coverage, your personal assets—home, savings, future wages—could be at risk in a lawsuit."
      },
      {
        q: "Can I bundle multiple insurance policies together?",
        a: "Yes! Bundling policies (like home and auto) with the same carrier typically saves 10-25% on premiums. Beyond savings, bundling simplifies management with one agent, one bill, and one renewal date. We'll help you determine if bundling makes sense for your specific situation."
      }
    ]
  },
  {
    category: "Home Insurance",
    questions: [
      {
        q: "What does homeowners insurance typically cover?",
        a: "Standard homeowners insurance typically covers your dwelling (the structure), other structures on your property, personal belongings, liability protection, and additional living expenses if you're displaced. However, it's important to note that flood and earthquake damage usually require separate policies. In Florida, wind/hurricane coverage may also have special considerations."
      },
      {
        q: "Do I need flood insurance in Florida?",
        a: "While not always legally required, flood insurance is highly recommended for Florida homeowners. Standard homeowners policies do NOT cover flood damage. Even if you're not in a high-risk flood zone, about 25% of flood claims come from moderate-to-low risk areas. Given Florida's hurricane exposure and heavy rainfall, flood insurance provides critical protection for your home investment."
      },
      {
        q: "What factors affect my home insurance premium?",
        a: "Several factors influence your premium: your home's age, construction type, and location; the roof's age and material; your claims history; chosen deductibles; security features; proximity to fire stations and coastline; and your credit score. We can help identify discounts you may qualify for, such as bundling policies, installing storm shutters, or having a newer roof."
      },
      {
        q: "How does hurricane/wind coverage work in Florida?",
        a: "In Florida, wind coverage often has a separate deductible—typically 2-5% of your dwelling coverage. So if your home is insured for $400,000 with a 2% hurricane deductible, you'd pay $8,000 out-of-pocket for wind damage before coverage applies. Some policies exclude wind entirely, requiring a separate windstorm policy. We'll help you understand exactly what your policy covers."
      },
      {
        q: "What is a wind mitigation inspection and why do I need one?",
        a: "A wind mitigation inspection documents your home's hurricane-resistant features—roof shape, construction, shutters, opening protection, and more. This report can qualify you for significant premium discounts, often saving hundreds or even thousands annually. The inspection typically costs $75-150 and is valid for 5 years."
      },
      {
        q: "Does homeowners insurance cover my home-based business?",
        a: "Standard homeowners policies provide very limited coverage for business equipment and zero liability coverage for business activities conducted at home. If you run a business from home, you likely need either an endorsement to your homeowners policy or a separate business insurance policy to be properly protected."
      },
      {
        q: "What is an umbrella policy and do I need one?",
        a: "An umbrella policy provides additional liability coverage beyond your home and auto policy limits. If you're sued and the judgment exceeds your standard policy limits, an umbrella policy covers the excess. We typically recommend umbrella coverage if you have significant assets to protect, a pool or trampoline, teen drivers, or host frequent gatherings."
      },
      {
        q: "How much dwelling coverage do I need?",
        a: "Your dwelling coverage should equal the cost to rebuild your home from the ground up—not its market value or purchase price. Rebuilding costs include labor, materials, and current building codes. We recommend getting a professional replacement cost estimate and reviewing it annually, as construction costs have increased significantly in recent years."
      },
      {
        q: "What's the difference between named-peril and all-risk coverage?",
        a: "Named-peril policies only cover specific events listed in your policy (fire, theft, vandalism, etc.). All-risk (or open-peril) policies cover everything EXCEPT what's specifically excluded. All-risk provides broader protection and is the standard for most homeowners policies. However, you should always review exclusions carefully."
      },
      {
        q: "Are my valuables fully covered under my homeowners policy?",
        a: "Standard policies have sub-limits for valuables like jewelry ($1,500), firearms ($2,500), and collectibles. If your items exceed these limits, you'll need scheduled personal property coverage (a 'floater') that provides full value coverage with no deductible. We recommend documenting valuables with photos and appraisals."
      }
    ]
  },
  {
    category: "Auto Insurance",
    questions: [
      {
        q: "What auto insurance coverage is required in Florida?",
        a: "Florida law requires Personal Injury Protection (PIP) of at least $10,000 and Property Damage Liability (PDL) of at least $10,000. However, these minimums may not adequately protect you. We strongly recommend adding Bodily Injury Liability, Uninsured/Underinsured Motorist coverage, and Collision/Comprehensive coverage for complete protection."
      },
      {
        q: "How can I lower my auto insurance premium?",
        a: "There are several ways to reduce your premium: maintain a clean driving record, bundle auto with home insurance (saves up to 25%), increase your deductible, ask about available discounts (safe driver, good student, anti-theft devices), take a defensive driving course, and review your coverage annually to ensure you're not over-insured on older vehicles."
      },
      {
        q: "What should I do if I'm involved in an accident?",
        a: "First, ensure everyone's safety and call 911 if there are injuries. Exchange information with other drivers, document the scene with photos, and file a police report. Contact us as soon as possible to report the claim—our 24/7 claims hotline is always available. Don't admit fault or sign anything from other insurance companies without consulting us first."
      },
      {
        q: "What's the difference between collision and comprehensive coverage?",
        a: "Collision covers damage to your vehicle from accidents with other vehicles or objects (hitting a tree, guardrail, etc.), regardless of fault. Comprehensive covers non-collision events: theft, vandalism, fire, weather damage, hitting an animal, and falling objects. Both are optional but highly recommended for newer vehicles."
      },
      {
        q: "What is uninsured/underinsured motorist coverage?",
        a: "This coverage protects you if you're hit by a driver with no insurance or insufficient coverage to pay for your damages. In Florida, about 20% of drivers are uninsured. UM/UIM coverage pays for your medical bills, lost wages, and pain and suffering when the at-fault driver can't. It's one of the most valuable coverages you can add."
      },
      {
        q: "Does my auto insurance cover rental cars?",
        a: "Your collision and comprehensive coverage typically extends to rental cars in the US. Liability coverage also transfers. However, you may want the rental company's coverage if you have high deductibles or want to avoid a claim on your policy. We also offer rental reimbursement coverage that pays for a rental while your car is being repaired after a covered claim."
      },
      {
        q: "How do accidents and tickets affect my premium?",
        a: "At-fault accidents typically increase premiums for 3-5 years, with the first accident causing a 20-40% increase. Moving violations like speeding tickets usually impact rates for 3 years. However, many carriers offer accident forgiveness programs that waive the surcharge for your first at-fault accident. Ask us about your options."
      },
      {
        q: "Should I drop collision/comprehensive on my older vehicle?",
        a: "Consider dropping these coverages when their annual cost exceeds 10% of your car's value. For example, if your car is worth $3,000 and collision/comprehensive costs $400/year, it may make sense to drop them. However, consider whether you could afford to replace your vehicle out-of-pocket if it's totaled."
      },
      {
        q: "What is gap insurance and do I need it?",
        a: "Gap insurance covers the difference between what you owe on your car loan and your vehicle's actual cash value if it's totaled. If you owe $25,000 but your car is only worth $20,000, gap insurance pays the $5,000 difference. It's essential if you made a small down payment, have a long loan term, or drive high-mileage."
      },
      {
        q: "Does my insurance cover rideshare driving (Uber/Lyft)?",
        a: "Personal auto policies typically exclude coverage while you're driving for a rideshare company. However, most carriers now offer rideshare endorsements that fill coverage gaps between your personal policy and the rideshare company's commercial coverage. If you drive for Uber or Lyft, this endorsement is essential."
      }
    ]
  },
  {
    category: "Claims Process",
    questions: [
      {
        q: "How do I file a claim?",
        a: "You can file a claim by calling our 24/7 claims hotline, visiting our office, or contacting us through our website. We'll guide you through the process, help you gather necessary documentation, and advocate on your behalf with the insurance carrier. Our goal is to make the claims process as smooth and stress-free as possible."
      },
      {
        q: "How long does it take to process a claim?",
        a: "Processing time varies depending on the complexity of the claim. Simple claims may be resolved within a few days, while more complex claims involving significant damage or liability disputes may take several weeks. We stay in constant communication with you throughout the process and work diligently to expedite your claim."
      },
      {
        q: "Will filing a claim increase my premium?",
        a: "Not all claims result in premium increases. Factors considered include the type and severity of the claim, your claims history, and whether you were at fault. Weather-related claims in Florida typically don't affect your rates as much as at-fault accidents. We can help you understand the potential impact before filing and explore all your options."
      },
      {
        q: "What documentation do I need when filing a claim?",
        a: "Gather as much documentation as possible: photos and videos of damage, police reports (for accidents or theft), receipts for damaged items, contact information for witnesses, and a detailed written description of what happened. For home claims, keep damaged items until the adjuster has seen them. The more documentation you have, the smoother the process."
      },
      {
        q: "What is a claims adjuster and what do they do?",
        a: "A claims adjuster investigates your claim, assesses the damage, reviews your policy coverage, and determines the settlement amount. For significant claims, an adjuster will schedule an inspection. You can also hire a public adjuster to represent your interests, though they typically charge 10-15% of your settlement."
      },
      {
        q: "Can I choose my own repair shop or contractor?",
        a: "Yes, you generally have the right to use any licensed repair shop or contractor. However, your insurer may have a network of preferred vendors that offer guaranteed work and direct billing. Using a preferred vendor can speed up the process, but the choice is ultimately yours."
      },
      {
        q: "What if I disagree with the claim settlement offer?",
        a: "If you believe the settlement is too low, you can negotiate with the insurance company. Provide additional documentation, get independent repair estimates, and request a detailed explanation of their valuation. If negotiations fail, you may be able to invoke the appraisal clause in your policy, file a complaint with the state, or consult an attorney."
      },
      {
        q: "How do I prepare for hurricane season claims-wise?",
        a: "Before hurricane season: document your home's condition with photos/video, create a home inventory with receipts, store important documents safely, and review your policy limits. After a storm: document all damage before making temporary repairs, keep receipts for emergency repairs, and file your claim promptly. We can provide a pre-season checklist."
      },
      {
        q: "What is the claims process timeline in Florida?",
        a: "Florida law requires insurers to acknowledge claims within 14 days, begin investigation within 10 days of acknowledgment, and make a coverage decision within 90 days. Payment must be made within 20 days of settlement agreement. If these deadlines aren't met, you may have additional remedies. We monitor all deadlines for our clients."
      },
      {
        q: "Should I make temporary repairs before the adjuster arrives?",
        a: "Yes—you're required to prevent further damage (this is called 'mitigating damages'). Cover broken windows, tarp damaged roofs, and stop water leaks. Keep all receipts for emergency repairs as they're typically reimbursable. However, don't make permanent repairs until the adjuster has documented the damage."
      }
    ]
  },
  {
    category: "Policy Management",
    questions: [
      {
        q: "When should I review my insurance coverage?",
        a: "We recommend reviewing your coverage annually and after any major life changes: buying or selling a home, getting married or divorced, having children, starting a business, purchasing valuable items, or retiring. Regular reviews ensure your coverage keeps pace with your evolving needs and helps identify potential savings."
      },
      {
        q: "Can I cancel my policy at any time?",
        a: "Yes, you can typically cancel your insurance policy at any time. Depending on your policy terms, you may receive a prorated refund of your premium. However, we recommend having new coverage in place before canceling to avoid any gaps in protection. Contact us to discuss your options—we may be able to find a better solution than cancellation."
      },
      {
        q: "What payment options do you offer?",
        a: "We offer flexible payment options to fit your budget, including annual pay (often with a discount), semi-annual, quarterly, and monthly payment plans. Many carriers also offer automatic payment options and paperless billing discounts. We'll help you find the payment schedule that works best for your financial situation."
      },
      {
        q: "What happens if I miss a premium payment?",
        a: "Most policies have a grace period (typically 10-30 days) during which you can make a late payment without losing coverage. After the grace period, your policy may be canceled for non-payment. This creates a coverage gap and may result in higher rates when you get new coverage. If you're having difficulty, contact us before missing a payment—we can often help."
      },
      {
        q: "How do I add or remove someone from my policy?",
        a: "Contact us to add or remove household members, drivers, or vehicles from your policy. Adding someone typically requires their personal information and (for auto) driving history. Removing someone usually takes effect immediately. Keep your policy updated—unlisted drivers or vehicles may not be covered."
      },
      {
        q: "What's the difference between an endorsement and a rider?",
        a: "These terms are often used interchangeably. Both refer to amendments that modify your base policy—either adding, removing, or changing coverage. Common endorsements include scheduled jewelry coverage, home business endorsements, and water backup coverage. We can explain which endorsements might benefit your situation."
      },
      {
        q: "How do I update my policy if I renovate my home?",
        a: "Notify us of any significant renovations—they may increase your home's replacement cost and require coverage adjustments. Major renovations like kitchen remodels, additions, or pool installations should be reported promptly. Some improvements (like a new roof or updated electrical) may also qualify you for discounts."
      },
      {
        q: "What is a declarations page and why is it important?",
        a: "The declarations page (or 'dec page') is the summary page of your policy showing your coverage limits, deductibles, premiums, and policy period. It's the most important page to review when you receive your policy. Keep your dec pages for all active policies in a safe, accessible location."
      },
      {
        q: "Can I change my coverage limits or deductibles mid-term?",
        a: "Yes, you can typically adjust coverage limits and deductibles at any time. Increasing coverage takes effect immediately but increases your premium. Decreasing coverage may have restrictions and could trigger a premium refund. Contact us to discuss changes—we'll help you understand the implications."
      },
      {
        q: "How far in advance should I shop for insurance before my renewal?",
        a: "Start shopping 30-45 days before your renewal date. This gives you time to compare quotes, ask questions, and make an informed decision without rushing. We automatically review your coverage before each renewal and will reach out if we find better options available."
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState("General Insurance");
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: false,
    threshold: 0.1,
    margin: "-100px 0px"
  });

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const activeCategoryData = faqData.find(cat => cat.category === activeCategory);
  const categoryIndex = faqData.findIndex(cat => cat.category === activeCategory);

  return (
    <motion.section
      ref={sectionRef}
      className="faq-section"
      id="faq"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background */}
      <div className="faq-background">
        <div className="bg-pattern" />
      </div>

      {/* Header */}
      <motion.div className="faq-header" variants={itemVariants}>
        <span className="section-label">FAQ</span>
        <h2 className="faq-title">
          Frequently Asked <span className="title-gradient">Questions</span>
        </h2>
        <p className="faq-subtitle">
          Find answers to common insurance questions. Can't find what you're looking for? Our team is here to help.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div className="faq-categories" variants={itemVariants}>
        {faqData.map((category) => (
          <button
            key={category.category}
            className={`category-tab ${activeCategory === category.category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.category)}
          >
            {category.category}
          </button>
        ))}
      </motion.div>

      {/* FAQ Accordion */}
      <motion.div className="faq-content" variants={containerVariants}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="faq-list"
          >
            {activeCategoryData?.questions.map((item, questionIndex) => {
              const key = `${categoryIndex}-${questionIndex}`;
              const isOpen = openItems[key];

              return (
                <motion.div
                  key={questionIndex}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  variants={itemVariants}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleItem(categoryIndex, questionIndex)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* CTA Section */}
      <motion.div className="faq-cta" variants={itemVariants}>
        <div className="faq-cta-content">
          <h3>Still Have Questions?</h3>
          <p>Our friendly team of insurance experts is ready to help you find the perfect coverage for your needs.</p>
        </div>
        <div className="faq-cta-buttons">
          <Button href="tel:+19045551234" variant="secondary" size="md">
            <Phone className="w-5 h-5" />
            Call Us Now
          </Button>
          <Button href="#quote" variant="primary" size="md" shimmer>
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </motion.section>
  );
}
