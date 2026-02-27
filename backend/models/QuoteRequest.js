import mongoose from 'mongoose';

const INSURANCE_TYPES = [
  'home', 'auto', 'bundle', 'flood', 'business', 'umbrella', 'boat', 'other'
];

const INSURANCE_TYPE_LABELS = {
  home: 'Home Insurance',
  auto: 'Auto Insurance',
  bundle: 'Home + Auto Bundle',
  flood: 'Flood Insurance',
  business: 'Business Insurance',
  umbrella: 'Umbrella Policy',
  boat: 'Boat & Marine',
  other: 'Other / Multiple Policies'
};

const QUOTE_STATUS = ['new', 'contacted', 'quoted', 'won', 'lost', 'archived'];

const quoteRequestSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, 'Full name is required'],
    maxlength: [100, 'Name must not exceed 100 characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: [255, 'Email must not exceed 255 characters'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    maxlength: [50, 'Phone number must not exceed 50 characters'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: [500, 'Address must not exceed 500 characters'],
    trim: true
  },
  insurance_type: {
    type: String,
    required: [true, 'Insurance type is required'],
    enum: {
      values: INSURANCE_TYPES,
      message: '{VALUE} is not a valid insurance type'
    }
  },
  coverage_details: {
    type: String,
    maxlength: [2000, 'Coverage details must not exceed 2000 characters'],
    trim: true,
    default: null
  },
  contact_preference: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: {
      values: QUOTE_STATUS,
      message: '{VALUE} is not a valid status'
    },
    default: 'new'
  },
  notes: {
    type: String,
    maxlength: [5000, 'Notes must not exceed 5000 characters'],
    default: null
  },
  ip_address: {
    type: String,
    maxlength: [45, 'IP address must not exceed 45 characters'],
    default: null
  },
  user_agent: {
    type: String,
    default: null
  },
  source: {
    type: String,
    maxlength: [50, 'Source must not exceed 50 characters'],
    default: 'website'
  },
  email_sent: {
    type: Boolean,
    default: false
  },
  email_sent_at: {
    type: Date,
    default: null
  },
  email_error: {
    type: String,
    default: null
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes
quoteRequestSchema.index({ email: 1 });
quoteRequestSchema.index({ phone: 1 });
quoteRequestSchema.index({ status: 1 });
quoteRequestSchema.index({ created_at: -1 });

// Virtual for formatted phone
quoteRequestSchema.virtual('formattedPhone').get(function() {
  if (!this.phone) return '';
  const cleaned = this.phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return this.phone;
});

// JSON transform: snake_case storage → camelCase output
quoteRequestSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return {
      id: ret.id,
      fullName: ret.full_name,
      email: ret.email,
      phone: ret.phone,
      address: ret.address,
      insuranceType: ret.insurance_type,
      insuranceTypeLabel: INSURANCE_TYPE_LABELS[ret.insurance_type] || ret.insurance_type,
      coverageDetails: ret.coverage_details,
      contactPreference: ret.contact_preference,
      status: ret.status,
      notes: ret.notes,
      ipAddress: ret.ip_address,
      userAgent: ret.user_agent,
      source: ret.source,
      emailSent: ret.email_sent,
      emailSentAt: ret.email_sent_at,
      emailError: ret.email_error,
      createdAt: ret.created_at,
      updatedAt: ret.updated_at,
      formattedPhone: ret.formattedPhone,
      _id: ret.id
    };
  }
});

// Statics
quoteRequestSchema.statics.INSURANCE_TYPES = INSURANCE_TYPES;
quoteRequestSchema.statics.INSURANCE_TYPE_LABELS = INSURANCE_TYPE_LABELS;
quoteRequestSchema.statics.QUOTE_STATUS = QUOTE_STATUS;

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);
export default QuoteRequest;
