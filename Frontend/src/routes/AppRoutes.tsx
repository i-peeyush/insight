import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout/AdminLayout';

// Public Pages
import { HomePage } from '../modules/home/HomePage';
import { ServicesPage } from '../modules/services/ServicesPage';
import { ServiceDetailPage } from '../modules/services/ServiceDetailPage';
import { PestLibraryPage } from '../modules/pests/PestLibraryPage';
import { PestDetailPage } from '../modules/pests/PestDetailPage';
import { LocationsPage } from '../modules/locations/LocationsPage';
import { LocationDetailPage } from '../modules/locations/LocationDetailPage';
import { QuoteRequestPage } from '../modules/leads/QuoteRequestPage';
import { BookInspectionPage } from '../modules/bookings/BookInspectionPage';
import { ContactPage } from '../modules/contact/ContactPage';
import { TestimonialsPage } from '../modules/testimonials/TestimonialsPage';
import { FaqPage } from '../modules/faq/FaqPage';
import { BlogListPage } from '../modules/blog/BlogListPage';
import { BlogPostDetailPage } from '../modules/blog/BlogPostDetailPage';
import { AboutPage } from '../modules/about/AboutPage';
import { CareersPage } from '../modules/careers/CareersPage';
import { PrivacyPolicyPage } from '../modules/legal/PrivacyPolicyPage';
import { TermsPage } from '../modules/legal/TermsPage';
import { CookiePolicyPage, AccessibilityPage } from '../modules/legal/CookiePolicyPage';
import { NotFoundPage } from '../modules/notfound/NotFoundPage';

// Admin Pages
import { AdminDashboardPage } from '../modules/admin/AdminDashboardPage';
import { AdminLeadsPage } from '../modules/admin/AdminLeadsPage';
import { AdminBookingsPage } from '../modules/admin/AdminBookingsPage';
import { AdminServicesPage } from '../modules/admin/AdminServicesPage';
import { AdminTestimonialsPage } from '../modules/admin/AdminTestimonialsPage';
import { AdminFaqPage } from '../modules/admin/AdminFaqPage';
import { AdminBlogPage } from '../modules/admin/AdminBlogPage';
import { AdminSettingsPage } from '../modules/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Facing Website Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/pests" element={<PestLibraryPage />} />
        <Route path="/pests/:slug" element={<PestDetailPage />} />
        <Route path="/service-areas" element={<LocationsPage />} />
        <Route path="/service-areas/:slug" element={<LocationDetailPage />} />
        <Route path="/request-quote" element={<QuoteRequestPage />} />
        <Route path="/book-inspection" element={<BookInspectionPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Portal Protected Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="leads" element={<AdminLeadsPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="faq" element={<AdminFaqPage />} />
        <Route path="blog" element={<AdminBlogPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};
