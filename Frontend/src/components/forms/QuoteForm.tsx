import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { useToast } from '../../contexts/ToastContext';
import { leadApi } from '../../api/leadApi';
import { QuoteRequestData } from '../../types/lead';
import { analytics } from '../../utils/analytics';

const quoteSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number with area code'),
  propertyType: z.string().min(1, 'Property type is required'),
  address: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid 5-digit ZIP code is required'),
  pestProblem: z.string().min(1, 'Please select or describe the pest problem'),
  serviceRequired: z.string().min(1, 'Please select service required'),
  description: z.string().min(10, 'Please provide brief details on where pests were observed'),
  preferredContactMethod: z.enum(['Phone', 'Email', 'SMS']),
  preferredContactTime: z.enum(['Morning', 'Afternoon', 'Evening', 'Anytime']),
  additionalNotes: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, 'You must agree to be contacted for this quote')
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  initialPest?: string;
  initialService?: string;
  onSuccess?: () => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialPest = '',
  initialService = 'Residential Pest Control',
  onSuccess
}) => {
  const [submittedData, setSubmittedData] = useState<QuoteRequestData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      propertyType: 'Single Family Home',
      address: '',
      city: 'Austin',
      state: 'TX',
      zipCode: '',
      pestProblem: initialPest || 'General Household Pests',
      serviceRequired: initialService,
      description: '',
      preferredContactMethod: 'Phone',
      preferredContactTime: 'Anytime',
      additionalNotes: '',
      consent: true
    }
  });

  const onSubmit = async (values: QuoteFormValues) => {
    setIsSubmitting(true);
    analytics.track('quote_started', { service: values.serviceRequired });

    try {
      const response = await leadApi.submitQuote(values as QuoteRequestData);
      if (response.success) {
        setSubmittedData(values as QuoteRequestData);
        analytics.track('quote_submitted', { leadId: response.data.id });
        showToast('Quote request submitted successfully!', 'success');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      showToast('Failed to submit quote request. Please try again or call us directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 md:p-10 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-extrabold text-[#144A38] mb-2">
          Quote Request Received!
        </h3>
        <p className="text-sm text-slate-700 max-w-md mx-auto mb-6">
          Thank you, <span className="font-bold">{submittedData.firstName}</span>. An Insight pest specialist is reviewing your inquiry and will contact you via {submittedData.preferredContactMethod} shortly.
        </p>

        <div className="bg-white rounded-2xl p-5 border border-emerald-100 max-w-md mx-auto text-left text-xs space-y-2 mb-8 shadow-xs">
          <div className="flex justify-between border-b pb-1 text-slate-600">
            <span className="font-semibold">Service:</span>
            <span>{submittedData.serviceRequired}</span>
          </div>
          <div className="flex justify-between border-b pb-1 text-slate-600">
            <span className="font-semibold">Pest Issue:</span>
            <span>{submittedData.pestProblem}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="font-semibold">Address:</span>
            <span>{submittedData.address}, {submittedData.city}, {submittedData.state}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            to="/book-inspection"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Or Lock In Appointment Slot Now
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => setSubmittedData(null)}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="e.g. John"
          required
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          placeholder="e.g. Miller"
          required
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="email"
          label="Email Address"
          placeholder="john.miller@example.com"
          required
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          type="tel"
          label="Phone Number"
          placeholder="(555) 000-0000"
          required
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Property Type"
          required
          options={[
            'Single Family Home',
            'Townhome / Condominium',
            'Apartment Unit',
            'Commercial / Restaurant',
            'Office Facility',
            'Warehouse / Industrial'
          ]}
          {...register('propertyType')}
          error={errors.propertyType?.message}
        />
        <div className="sm:col-span-2">
          <Input
            label="Street Address"
            placeholder="1234 Blossom Creek Trail"
            required
            {...register('address')}
            error={errors.address?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="City"
          placeholder="Austin"
          required
          {...register('city')}
          error={errors.city?.message}
        />
        <Input
          label="State"
          placeholder="TX"
          required
          {...register('state')}
          error={errors.state?.message}
        />
        <Input
          label="ZIP / Postal Code"
          placeholder="78704"
          required
          {...register('zipCode')}
          error={errors.zipCode?.message}
        />
      </div>

      {/* Pest & Service Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Primary Pest Problem"
          required
          options={[
            'General Household Pests',
            'Ants (Sugar, Carpenter, Fire)',
            'Cockroaches',
            'Termites (Swarmers or Damage)',
            'Bed Bugs',
            'Rodents (Mice or Rats)',
            'Mosquitoes & Ticks',
            'Spiders & Scorpions',
            'Wasps & Stinging Insects',
            'Other / Unknown Pest'
          ]}
          {...register('pestProblem')}
          error={errors.pestProblem?.message}
        />
        <Select
          label="Service Required"
          required
          options={[
            'Residential Pest Control',
            'Commercial Pest Management',
            'Termite Protection & Elimination',
            'Bed Bug Eco-Thermal Treatment',
            'Rodent Control & Exclusion',
            'Mosquito & Tick Yard Defense',
            'Wasp & Stinging Insect Removal',
            'Seasonal Pest Protection Plan',
            'Free Comprehensive Property Inspection'
          ]}
          {...register('serviceRequired')}
          error={errors.serviceRequired?.message}
        />
      </div>

      <Textarea
        label="Description of Pest Activity"
        placeholder="Please describe where you noticed pests (e.g., kitchen baseboards, backyard deck, attic scratching, frequency of sightings)..."
        required
        {...register('description')}
        error={errors.description?.message}
      />

      {/* Preferences */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Preferred Contact Method"
          options={[
            { label: 'Phone Call', value: 'Phone' },
            { label: 'Email', value: 'Email' },
            { label: 'SMS Text', value: 'SMS' }
          ]}
          {...register('preferredContactMethod')}
          error={errors.preferredContactMethod?.message}
        />
        <Select
          label="Preferred Contact Time"
          options={[
            { label: 'Anytime', value: 'Anytime' },
            { label: 'Morning (8am - 12pm)', value: 'Morning' },
            { label: 'Afternoon (12pm - 5pm)', value: 'Afternoon' },
            { label: 'Evening (5pm - 8pm)', value: 'Evening' }
          ]}
          {...register('preferredContactTime')}
          error={errors.preferredContactTime?.message}
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="quote-consent"
          className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
          {...register('consent')}
        />
        <label htmlFor="quote-consent" className="text-xs text-slate-600 leading-tight select-none">
          I agree to receive communications regarding this quote from Insight Pest Solutions at the phone number and email provided above. I understand consent is not required for purchase.
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs font-medium text-red-600">{errors.consent.message}</p>
      )}

      {/* Trust & Guarantee Callout */}
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Your information is 100% private and protected. We never sell your personal data.</span>
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full justify-center text-base font-bold shadow-lg"
        isLoading={isSubmitting}
        rightIcon={<Send className="w-4 h-4" />}
      >
        Request Free Pest Quote
      </Button>
    </form>
  );
};
