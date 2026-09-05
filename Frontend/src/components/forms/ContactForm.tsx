import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { useToast } from '../../contexts/ToastContext';
import { contactApi } from '../../api/contactApi';
import { ContactFormData } from '../../types/contact';
import { analytics } from '../../utils/analytics';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContactMethod: z.enum(['Phone', 'Email'])
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      preferredContactMethod: 'Email'
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await contactApi.sendMessage(values as ContactFormData);
      if (response.success) {
        setIsSuccess(true);
        analytics.track('contact_submitted', { subject: values.subject });
        showToast('Message sent! Our support desk will reply promptly.', 'success');
        reset();
      }
    } catch (err) {
      showToast('Failed to send message. Please try again or call our hotline.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center animate-fade-in">
        <CheckCircle2 className="w-12 h-12 text-red-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-[#DC2626] mb-1">Message Sent Successfully</h3>
        <p className="text-xs text-slate-600 mb-6">
          Thank you for getting in touch. An Insight support coordinator will respond within 1 business hour.
        </p>
        <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Jane Smith"
        required
        {...register('name')}
        error={errors.name?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="email"
          label="Email Address"
          placeholder="jane@example.com"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Subject / Topic"
          placeholder="e.g. Question about Termite Warranty"
          required
          {...register('subject')}
          error={errors.subject?.message}
        />
        <Select
          label="Preferred Response Method"
          options={[
            { label: 'Email', value: 'Email' },
            { label: 'Phone Call', value: 'Phone' }
          ]}
          {...register('preferredContactMethod')}
          error={errors.preferredContactMethod?.message}
        />
      </div>

      <Textarea
        label="Your Message or Inquiry"
        placeholder="How can we assist you today?..."
        required
        {...register('message')}
        error={errors.message?.message}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full justify-center"
        isLoading={isSubmitting}
        rightIcon={<Send className="w-4 h-4" />}
      >
        Send Message to Insight Support
      </Button>
    </form>
  );
};
