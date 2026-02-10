// src/data/coverageItems.jsx
import { Home, Car, Waves, Umbrella, Building, Ship, Settings } from 'lucide-react';

const coverageItems = [
  {
    title: "Home Insurance",
    description: "Protect your home from storms, theft, and liability with our comprehensive home coverage.",
    icon: <Home className="w-5 h-5" />,
    learnMoreLink: "#home-insurance"
  },
  {
    title: "Auto Insurance",
    description: "Drive with confidence—our auto policies cover you on the road, at an affordable rate.",
    icon: <Car className="w-5 h-5" />,
    learnMoreLink: "#auto-insurance"
  },
  {
    title: "Flood Insurance",
    description: "Stay covered when water damage strikes. Essential protection for Florida homeowners.",
    icon: <Waves className="w-5 h-5" />,
    learnMoreLink: "#flood-insurance"
  },
  {
    title: "Umbrella Policy",
    description: "Extra liability protection to keep you safe in unexpected events.",
    icon: <Umbrella className="w-5 h-5" />,
    learnMoreLink: "#umbrella-policy"
  },
  {
    title: "Business Insurance",
    description: "Safeguard your company with tailored business coverage solutions.",
    icon: <Building className="w-5 h-5" />,
    learnMoreLink: "#business-insurance"
  },
  {
    title: "Boat & Marine",
    description: "Comprehensive coverage for your watercraft and marine equipment.",
    icon: <Ship className="w-5 h-5" />,
    learnMoreLink: "#boat-insurance"
  },
  {
    title: "Private Client Services",
    description: "Tailored insurance solutions designed to meet your unique needs and circumstances.",
    icon: <Settings className="w-5 h-5" />,
    learnMoreLink: "#custom-coverage"
  }
];

export default coverageItems;
