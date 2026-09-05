import React, { useState } from 'react';
import { 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { Badge } from '../common/Badge';
import { useServices } from '../../hooks/useServices';
import { useBookingAvailability, useCreateBooking } from '../../hooks/useBookings';
import { BookingRequestData, BookingItem } from '../../types/booking';
import { useToast } from '../../contexts/ToastContext';
import { analytics } from '../../utils/analytics';
import { formatDate } from '../../utils/formatters';

const STEPS = [
  { id: 1, title: 'Select Service' },
  { id: 2, title: 'Property & Location' },
  { id: 3, title: 'Date & Time Slot' },
  { id: 4, title: 'Contact Details' },
  { id: 5, title: 'Review & Confirm' }
];

export const BookingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<BookingRequestData>({
    serviceSlug: 'residential-pest-control',
    serviceTitle: 'Residential Pest Control',
    propertyType: 'Single Family Home',
    scheduledDate: '2026-09-05',
    scheduledTime: '08:00 AM - 10:00 AM',
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Austin',
    state: 'TX',
    zipCode: '',
    notes: ''
  });

  const { data: services } = useServices();
  const { data: slots, isLoading: slotsLoading } = useBookingAvailability(formData.scheduledDate);
  const createBookingMutation = useCreateBooking();
  const { showToast } = useToast();

  const handleServiceSelect = (slug: string, title: string) => {
    setFormData((prev) => ({ ...prev, serviceSlug: slug, serviceTitle: title }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.serviceSlug) {
        showToast('Please select a service to proceed.', 'error');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.address || !formData.city || !formData.zipCode) {
        showToast('Please fill in your complete address.', 'error');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.scheduledDate || !formData.scheduledTime) {
        showToast('Please select a date and an available time slot.', 'error');
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.customerName || !formData.email || !formData.phone) {
        showToast('Please provide your name, email, and phone number.', 'error');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = async () => {
    analytics.track('booking_started', { service: formData.serviceTitle });
    try {
      const response = await createBookingMutation.mutateAsync(formData);
      if (response.success) {
        setConfirmedBooking(response.data);
        analytics.track('booking_completed', { bookingId: response.data.bookingId });
        showToast('Appointment successfully booked!', 'success');
      }
    } catch (err) {
      showToast('Booking failed. Please check your details and retry.', 'error');
    }
  };

  if (confirmedBooking) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 md:p-12 text-center animate-fade-in max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-red-50 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <Badge variant="accent" className="mb-2">
          Confirmation Code: {confirmedBooking.bookingId}
        </Badge>
        <h3 className="text-2xl md:text-3xl font-extrabold text-[#DC2626] mb-2">
          Inspection Appointment Scheduled!
        </h3>
        <p className="text-sm text-slate-700 max-w-lg mx-auto mb-8">
          We have reserved your appointment on <strong className="text-slate-900">{formatDate(confirmedBooking.scheduledDate)}</strong> at <strong className="text-slate-900">{confirmedBooking.scheduledTime}</strong>. A confirmation email and SMS reminder have been dispatched.
        </p>

        <div className="bg-white rounded-2xl p-6 border border-red-200 text-left text-xs space-y-3 mb-8 shadow-xs">
          <div className="flex justify-between border-b pb-2 text-slate-700">
            <span className="font-bold">Service:</span>
            <span className="font-semibold text-red-600">{confirmedBooking.serviceTitle}</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-slate-700">
            <span className="font-bold">Customer:</span>
            <span>{confirmedBooking.customerName}</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-slate-700">
            <span className="font-bold">Service Location:</span>
            <span>{confirmedBooking.address}, {confirmedBooking.city}, {confirmedBooking.state}</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="font-bold">Contact Phone:</span>
            <span>{confirmedBooking.phone}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            to="/"
            variant="primary"
            size="md"
          >
            Back to Home
          </Button>
          <Button
            to="/services"
            variant="outline"
            size="md"
          >
            Explore Prep Guides
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-3xl mx-auto">
      {/* Stepper Progress Bar */}
      <div className="bg-slate-900 text-white p-6">
        <div className="flex items-center justify-between relative max-w-xl mx-auto">
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-red-50 text-white'
                      : isCurrent
                      ? 'bg-red-50 text-slate-950 ring-4 ring-red-500/30 font-black'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <span className={`text-[10px] mt-1.5 hidden sm:block font-medium ${isCurrent ? 'text-red-600 font-bold' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 md:p-8">
        {/* Step 1: Select Service */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900">
              1. Choose the Service You Need
            </h3>
            <p className="text-xs text-slate-500">
              Select the pest management program that best fits your immediate requirement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {services?.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => handleServiceSelect(srv.slug, srv.title)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.serviceSlug === srv.slug
                      ? 'border-[#EF4444] bg-[#FEF2F2]/60 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{srv.title}</h4>
                    {formData.serviceSlug === srv.slug && (
                      <div className="w-4 h-4 rounded-full bg-[#EF4444] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{srv.shortDescription}</p>
                  <span className="text-[11px] font-semibold text-red-600 mt-2 block">
                    {srv.pricingEstimate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property & Location */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900">
              2. Property & Location Details
            </h3>
            <p className="text-xs text-slate-500">
              Where should our certified pest technician perform the on-site inspection?
            </p>

            <div className="space-y-4 pt-2">
              <Select
                label="Property Type"
                required
                options={[
                  'Single Family Home',
                  'Townhome / Condominium',
                  'Apartment Unit',
                  'Commercial Restaurant',
                  'Office / Retail Facility',
                  'Warehouse / Industrial'
                ]}
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              />

              <Input
                label="Street Address"
                placeholder="e.g. 1044 South Congress Ave"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <Input
                  label="State"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
                <Input
                  label="ZIP Code"
                  placeholder="78704"
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Date & Time Slot */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900">
              3. Choose Date & Arrival Window
            </h3>
            <p className="text-xs text-slate-500">
              Real-time slot availability confirmed by our dispatch routing engine.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                type="date"
                label="Select Preferred Date"
                required
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              />

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Available Arrival Windows
                </label>
                {slotsLoading ? (
                  <p className="text-xs text-slate-500 animate-pulse">Loading open slots...</p>
                ) : (
                  <div className="space-y-2">
                    {slots?.map((slot) => (
                      <button
                        type="button"
                        key={slot.id}
                        disabled={!slot.available}
                        onClick={() => setFormData({ ...formData, scheduledTime: slot.time })}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                          !slot.available
                            ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                            : formData.scheduledTime === slot.time
                            ? 'border-[#EF4444] bg-[#FEF2F2] text-[#DC2626]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          {slot.time} ({slot.type})
                        </span>
                        <span>{slot.available ? 'Available' : 'Booked'}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Details */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900">
              4. Customer Contact Details
            </h3>
            <p className="text-xs text-slate-500">
              We'll use this information to send appointment updates and technician arrival tracking.
            </p>

            <div className="space-y-4 pt-2">
              <Input
                label="Full Name"
                placeholder="Robert Davis"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="robert.davis@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  type="tel"
                  label="Mobile Phone (for arrival SMS)"
                  placeholder="(555) 349-2918"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <Textarea
                label="Special Instructions or Gate Codes (Optional)"
                placeholder="e.g. Gate code is #4491. Please check perimeter fence behind garage..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 5: Review & Confirm */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900">
              5. Review & Confirm Appointment
            </h3>
            <p className="text-xs text-slate-500">
              Please double check your appointment schedule before confirming.
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Service:</span>
                <span className="font-bold text-[#DC2626]">{formData.serviceTitle}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Date & Window:</span>
                <span className="font-semibold text-slate-900">
                  {formatDate(formData.scheduledDate)} at {formData.scheduledTime}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Location:</span>
                <span className="font-semibold text-slate-900">
                  {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Contact:</span>
                <span className="font-semibold text-slate-900">
                  {formData.customerName} ({formData.phone})
                </span>
              </div>
              {formData.notes && (
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Notes:</span>
                  <span className="text-slate-700">{formData.notes}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs border border-red-200">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>Zero-obligation booking. Reschedule or cancel anytime up to 2 hours prior without penalty.</span>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrev}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous Step
            </Button>
          ) : <div />}

          {currentStep < STEPS.length ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next Step
            </Button>
          ) : (
            <Button
              type="button"
              variant="gold"
              size="lg"
              isLoading={createBookingMutation.isPending}
              onClick={handleFinalSubmit}
              rightIcon={<Check className="w-4 h-4" />}
            >
              Confirm & Book Inspection
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
