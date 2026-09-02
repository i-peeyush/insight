import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { HeroSection } from '../../components/sections/HeroSection';
import { TrustIndicators } from '../../components/sections/TrustIndicators';
import { PestProblemSelector } from '../../components/forms/PestProblemSelector';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { TestimonialCard } from '../../components/cards/TestimonialCard';
import { BlogCard } from '../../components/cards/BlogCard';
import { WhyChooseUs } from '../../components/sections/WhyChooseUs';
import { ProcessSection } from '../../components/sections/ProcessSection';
import { FaqAccordion } from '../../components/sections/FaqAccordion';
import { CTASection } from '../../components/sections/CTASection';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { useServices } from '../../hooks/useServices';
import { useTestimonials } from '../../hooks/useTestimonials';
import { useFaqs } from '../../hooks/useFaqs';
import { useBlog } from '../../hooks/useBlog';
import { updateSeo } from '../../utils/seo';

export const HomePage: React.FC = () => {
  const { data: services } = useServices();
  const { data: testimonials } = useTestimonials();
  const { data: faqs } = useFaqs('General');
  const { data: blogPosts } = useBlog();

  useEffect(() => {
    updateSeo({
      title: 'Insight Pest Solutions | Professional Pest Control & Extermination',
      description: 'Insight Pest Solutions offers premier residential & commercial pest control, termite protection, bed bug thermal remediation, and rodent exclusion.',
      ogType: 'website'
    });
  }, []);

  return (
    <div className="space-y-0 animate-fade-in">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Badges Strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-custom">
          <TrustIndicators />
        </div>
      </div>

      {/* 3. Interactive Diagnostic Selector */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom">
          <PestProblemSelector />
        </div>
      </section>

      {/* 4. Featured Services Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Comprehensive Protection
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
                Targeted Pest Solutions for Every Need
              </h2>
              <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
                Whether you need routine seasonal home maintenance, emergency nest removal, or audit-ready commercial pest defense.
              </p>
            </div>
            <Button
              to="/services"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Services
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. 4-Step Process Section */}
      <ProcessSection />

      {/* 7. Customer Testimonials */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="container-custom">
          <SectionHeading
            badge="Verified Customer Reviews"
            title="What Our Clients Say About Insight Pest"
            subtitle="Real feedback from families and business owners across our service regions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {testimonials?.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="text-center">
            <Button to="/testimonials" variant="outline" size="md">
              Read All Customer Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            badge="Common Inquiries"
            title="Frequently Asked Questions"
            subtitle="Have questions about our treatments, safety for pets, or scheduling? Here are quick answers."
          />

          {faqs && <FaqAccordion faqs={faqs.slice(0, 5)} />}

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#144A38] hover:text-emerald-700"
            >
              <span>Explore our full FAQ knowledge base</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Educational Insights / Blog */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Knowledge & Prevention
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
                Latest Pest Control Guides & Insights
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Expert tips written by our entomologists and pest technicians to help you protect your home.
              </p>
            </div>
            <Button to="/blog" variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Read Knowledge Base
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts?.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final High-Converting CTA */}
      <CTASection />
    </div>
  );
};
