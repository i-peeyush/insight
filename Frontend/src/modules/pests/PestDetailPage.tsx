import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bug, 
  AlertTriangle, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight,
  Calculator
} from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { LoadingState, ErrorState } from '../../components/common/LoadingState';
import { CTASection } from '../../components/sections/CTASection';
import { usePestDetail } from '../../hooks/usePests';
import { updateSeo } from '../../utils/seo';

export const PestDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: pest, isLoading, error } = usePestDetail(slug);

  useEffect(() => {
    if (pest) {
      updateSeo({
        title: `${pest.name} Control, Signs & Prevention Guide`,
        description: pest.description,
        ogType: 'article'
      });
    }
  }, [pest]);

  if (isLoading) {
    return (
      <div className="py-20 container-custom">
        <LoadingState message="Loading pest profile..." />
      </div>
    );
  }

  if (error || !pest) {
    return (
      <div className="py-20 container-custom">
        <ErrorState
          title="Pest Not Found"
          message="The requested pest identification profile could not be found."
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-custom">
        <Breadcrumbs
          items={[
            { label: 'Pest Library', path: '/pests' },
            { label: pest.name }
          ]}
        />

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{pest.category}</Badge>
              <Badge variant={pest.riskLevel.includes('High') || pest.riskLevel.includes('Severe') ? 'danger' : 'warning'}>
                {pest.riskLevel} Threat
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {pest.name}
            </h1>

            <p className="text-sm font-semibold italic text-slate-500">
              Scientific Name: {pest.scientificName} • Common Names: {pest.commonName}
            </p>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed pt-2">
              {pest.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button
                to={`/request-quote?pest=${encodeURIComponent(pest.name)}`}
                variant="gold"
                size="md"
                leftIcon={<Calculator className="w-4 h-4" />}
              >
                Get Quote to Eliminate {pest.name}
              </Button>
              <Button
                to="/book-inspection"
                variant="outline"
                size="md"
              >
                Schedule Inspection
              </Button>
            </div>
          </div>
        </div>

        {/* Two-Column Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Signs of Infestation */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Key Signs of a {pest.name} Infestation</span>
              </h2>
              <div className="space-y-3">
                {pest.signsOfInfestation.map((sign, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs md:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health & Property Risks */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>Health & Property Risks</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-100">
                {pest.healthRisks}
              </p>
            </div>

            {/* Prevention Tips */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-600" />
                <span>Proactive Prevention Tips for Homeowners</span>
              </h2>
              <div className="space-y-2.5">
                {pest.preventionTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional IPM Treatment Approach */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Bug className="w-5 h-5 text-[#144A38]" />
                <span>Our Professional Treatment Approach</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {pest.treatmentApproach}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Common Locations */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Common Locations Found</span>
              </h3>
              <div className="space-y-2">
                {pest.commonLocations.map((loc, idx) => (
                  <div key={idx} className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {loc}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Services */}
            <div className="bg-[#144A38] text-white rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-base font-bold text-white">
                Recommended Services
              </h3>
              <p className="text-xs text-emerald-100">
                These specialized programs include comprehensive treatment for {pest.name}:
              </p>
              <div className="space-y-2">
                {pest.relatedServices.map((srvSlug) => (
                  <Link
                    key={srvSlug}
                    to={`/services/${srvSlug}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-bold"
                  >
                    <span className="capitalize">{srvSlug.replace(/-/g, ' ')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};
