// src/data/coverageItems.jsx
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WaterIcon from '@mui/icons-material/Water';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import BusinessIcon from '@mui/icons-material/Business';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const coverageItems = [
  {
    title: "Home Insurance",
    description: "Protect your home from storms, theft, and liability with our comprehensive home coverage.",
    icon: <HomeIcon />,
    learnMoreLink: "#home-insurance"
  },
  {
    title: "Auto Insurance",
    description: "Drive with confidence—our auto policies cover you on the road, at an affordable rate.",
    icon: <DirectionsCarIcon />,
    learnMoreLink: "#auto-insurance"
  },
  {
    title: "Flood Insurance",
    description: "Stay covered when water damage strikes. Essential protection for Florida homeowners.",
    icon: <WaterIcon />,
    learnMoreLink: "#flood-insurance"
  },
  {
    title: "Umbrella Policy",
    description: "Extra liability protection to keep you safe in unexpected events.",
    icon: <UmbrellaIcon />,
    learnMoreLink: "#umbrella-policy"
  },
  {
    title: "Business Insurance",
    description: "Safeguard your company with tailored business coverage solutions.",
    icon: <BusinessIcon />,
    learnMoreLink: "#business-insurance"
  },
  {
    title: "Boat & Marine",
    description: "Comprehensive coverage for your watercraft and marine equipment.",
    icon: <DirectionsBoatIcon />,
    learnMoreLink: "#boat-insurance"
  },
  {
    title: "Life & Health",
    description: "Secure your family's future with our life and health insurance options.",
    icon: <LocalHospitalIcon />,
    learnMoreLink: "#life-health-insurance"
  }
];

export default coverageItems;
