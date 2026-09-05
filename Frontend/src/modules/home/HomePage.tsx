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
import { t } from '../../language';

export const HomePage: React.FC = () => {
  const { data: services } = useServices();
  const { data: testimonials } = useTestimonials();
  const { data: faqs } = useFaqs('General');
  const { data: blogPosts } = useBlog();

  useEffect(() => {
    updateSeo({
      title: t.home.seo.title,
      description: t.home.seo.description,
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
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                {t.home.servicesSection.eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
                {t.home.servicesSection.title}
              </h2>
              <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
                {t.home.servicesSection.subtitle}
              </p>
            </div>
            <Button
              to="/services"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t.home.servicesSection.viewAllButton}
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
            badge={t.home.testimonialsSection.eyebrow}
            title={t.home.testimonialsSection.title}
            subtitle={t.home.testimonialsSection.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {testimonials?.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <div className="text-center">
            <Button to="/testimonials" variant="outline" size="md">
              {t.home.testimonialsSection.viewAllButton}
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            badge={t.home.faqSection.eyebrow}
            title={t.home.faqSection.title}
            subtitle={t.home.faqSection.subtitle}
          />

          {faqs && <FaqAccordion faqs={faqs.slice(0, 5)} />}

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:text-red-600"
            >
              <span>{t.home.faqSection.exploreAllLink}</span>
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
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                {t.home.blogSection.eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
                {t.home.blogSection.title}
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                {t.home.blogSection.subtitle}
              </p>
            </div>
            <Button to="/blog" variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {t.home.blogSection.viewAllButton}
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
