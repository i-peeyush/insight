package com.insightpest.config;

import com.insightpest.modules.blog.entities.BlogPostEntity;
import com.insightpest.modules.blog.repositories.BlogRepository;
import com.insightpest.modules.faq.entities.FaqEntity;
import com.insightpest.modules.faq.repositories.FaqRepository;
import com.insightpest.modules.locations.entities.LocationEntity;
import com.insightpest.modules.locations.repositories.LocationRepository;
import com.insightpest.modules.pests.entities.PestEntity;
import com.insightpest.modules.pests.repositories.PestRepository;
import com.insightpest.modules.services.entities.ServiceEntity;
import com.insightpest.modules.services.repositories.ServiceRepository;
import com.insightpest.modules.testimonials.entities.TestimonialEntity;
import com.insightpest.modules.testimonials.repositories.TestimonialRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final ServiceRepository serviceRepository;
    private final PestRepository pestRepository;
    private final LocationRepository locationRepository;
    private final TestimonialRepository testimonialRepository;
    private final FaqRepository faqRepository;
    private final BlogRepository blogRepository;

    public DataInitializer(ServiceRepository serviceRepository,
                           PestRepository pestRepository,
                           LocationRepository locationRepository,
                           TestimonialRepository testimonialRepository,
                           FaqRepository faqRepository,
                           BlogRepository blogRepository) {
        this.serviceRepository = serviceRepository;
        this.pestRepository = pestRepository;
        this.locationRepository = locationRepository;
        this.testimonialRepository = testimonialRepository;
        this.faqRepository = faqRepository;
        this.blogRepository = blogRepository;
    }

    @Override
    public void run(String... args) {
        if (serviceRepository.count() == 0) {
            logger.info("Database tables empty. Seeding initial Insight Pest Solutions data catalog...");
            seedServices();
            seedPests();
            seedLocations();
            seedTestimonials();
            seedFaqs();
            seedBlog();
            logger.info("Data seeding completed successfully.");
        }
    }

    private void seedServices() {
        ServiceEntity s1 = new ServiceEntity();
        s1.setSlug("residential-pest-control");
        s1.setTitle("Residential Pest Control");
        s1.setShortDescription("Comprehensive year-round protection designed specifically to keep your family and home safe from common household pests.");
        s1.setFullDescription("Our Residential Pest Control program utilizes Integrated Pest Management (IPM) protocols tailored to your unique home layout and local climate.");
        s1.setCategory("Residential");
        s1.setIcon("Home");
        s1.setFeatured(true);
        s1.setPricingEstimate("Starting at $49/mo (Quarterly Plan)");
        s1.setTargetPests(Arrays.asList("Ants", "Spiders", "Cockroaches", "Silverfish", "Earwigs", "Centipedes", "Crickets"));
        s1.setFeatures(Arrays.asList(
            "Exterior 30-foot perimeter barrier application",
            "Eave & soffit de-webbing up to 20 feet",
            "Interior crack & crevice targeted micro-treatment",
            "Garage & crawlspace protective dust application",
            "Free retreatments between scheduled visits"
        ));
        s1.setWarranty("100% Insight Protection Guarantee — Free re-service within 48 hours if pests return.");

        ServiceEntity s2 = new ServiceEntity();
        s2.setSlug("commercial-pest-control");
        s2.setTitle("Commercial Pest Management");
        s2.setShortDescription("Discreet, audit-ready commercial pest solutions for restaurants, hospitality, warehousing, healthcare, and office facilities.");
        s2.setFullDescription("Pest activity in a commercial establishment threatens your brand reputation, customer safety, and regulatory compliance. We provide FDA & AIB compliant IPM.");
        s2.setCategory("Commercial");
        s2.setIcon("Building2");
        s2.setFeatured(true);
        s2.setPricingEstimate("Custom Quote Based on Square Footage");
        s2.setTargetPests(Arrays.asList("Rodents", "Cockroaches", "Flies", "Stored Product Pests", "Drain Pests"));
        s2.setFeatures(Arrays.asList(
            "Digital logbooks & barcode-scanned trap monitoring",
            "HACCP & AIB International compliant reporting",
            "Drain foaming & microbial grease-digesting treatments",
            "Dedicated commercial account manager"
        ));
        s2.setWarranty("Zero-Tolerance Commercial Compliance Guarantee.");

        ServiceEntity s3 = new ServiceEntity();
        s3.setSlug("termite-control");
        s3.setTitle("Termite Protection & Elimination");
        s3.setShortDescription("Advanced colony elimination and continuous bait station monitoring to guard your property against structural wood destruction.");
        s3.setFullDescription("Our certified termite specialists utilize eco-conscious Sentricon® baiting technology and precision liquid termiticide barriers to eliminate termite colonies at their queen source.");
        s3.setCategory("Specialized");
        s3.setIcon("ShieldAlert");
        s3.setFeatured(true);
        s3.setPricingEstimate("Free Inspection / Plan starting at $650");
        s3.setTargetPests(Arrays.asList("Subterranean Termites", "Drywood Termites", "Formosan Termites"));
        s3.setFeatures(Arrays.asList(
            "Thermal imaging and moisture detection inspection",
            "Non-disruptive exterior bait station installation",
            "Annual structural re-certification inspection",
            "Real estate transaction (NPMA-33) termite letters"
        ));
        s3.setWarranty("$1,000,000 Structural Damage Repair Guarantee (qualified properties).");

        ServiceEntity s4 = new ServiceEntity();
        s4.setSlug("bed-bug-control");
        s4.setTitle("Bed Bug Eco-Thermal Treatment");
        s4.setShortDescription("Fast, single-day thermal heat remediation and targeted insect growth regulators to eliminate all bed bug stages in one visit.");
        s4.setFullDescription("Our industrial-grade thermal heat remediation brings target room temperatures to a lethal 130°F, penetrating deep into mattresses, furniture, baseboards, and wall cavities.");
        s4.setCategory("Specialized");
        s4.setIcon("Flame");
        s4.setFeatured(true);
        s4.setPricingEstimate("Starting at $350 per room");
        s4.setTargetPests(Arrays.asList("Cimex lectularius (Common Bed Bug)", "Bat Bugs"));
        s4.setFeatures(Arrays.asList(
            "Single-day total elimination treatment",
            "Penetrates mattresses, dressers, and electrical conduits",
            "Safe for electronics and delicate furnishings",
            "Follow-up residual growth regulator application"
        ));
        s4.setWarranty("90-Day Unconditional Bed Bug Free Warranty.");

        ServiceEntity s5 = new ServiceEntity();
        s5.setSlug("rodent-control");
        s5.setTitle("Rodent Control & Exclusion");
        s5.setShortDescription("Complete rodent trapping, sanitary clean-up, and structural exclusion to permanently keep mice and rats out of your property.");
        s5.setFullDescription("Our comprehensive rodent management goes beyond mere trapping — we perform full exterior exclusion sealing all gaps larger than 1/4 inch with galvanized steel mesh.");
        s5.setCategory("Residential");
        s5.setIcon("PawPrint");
        s5.setFeatured(true);
        s5.setPricingEstimate("Starting at $199 (Inspection + Exclusion plan)");
        s5.setTargetPests(Arrays.asList("House Mice", "Norway Rats", "Roof Rats", "Field Mice"));
        s5.setFeatures(Arrays.asList(
            "Full exterior exclusion sealing (flashing, copper mesh, metal seals)",
            "Attic and crawlspace entry point fortification",
            "Tamper-proof exterior and interior capture systems",
            "Attic insulation sanitization & droppings removal"
        ));
        s5.setWarranty("1-Year Rodent-Free Exclusion Warranty.");

        serviceRepository.saveAll(List.of(s1, s2, s3, s4, s5));
    }

    private void seedPests() {
        PestEntity p1 = new PestEntity();
        p1.setSlug("ants");
        p1.setName("Ants");
        p1.setCommonName("Carpenter Ants, Odorous House Ants, Sugar Ants");
        p1.setScientificName("Formicidae (Camponotus spp., Tapinoma sessile)");
        p1.setCategory("Crawling Insects");
        p1.setRiskLevel("Medium to High");
        p1.setDescription("Ants are social insects that live in large underground or wood-nesting colonies.");
        p1.setSignsOfInfestation(Arrays.asList(
            "Visible trails of ants marching toward countertops, pantries, or sinks",
            "Fine sawdust-like wood shavings (frass) beneath wooden beams",
            "Swarming winged reproductive ants (alates) emerging in spring"
        ));
        p1.setCommonLocations(Arrays.asList("Kitchens & Pantries", "Behind Baseboards", "Under Sinks & Dishwashers"));
        p1.setHealthRisks("Contamination of open foods with bacteria; structural timber degradation from carpenter ants.");
        p1.setPreventionTips(Arrays.asList(
            "Store dry goods in airtight plastic canisters",
            "Wipe down kitchen surfaces immediately after meals",
            "Trim tree branches at least 2 feet away from siding"
        ));
        p1.setTreatmentApproach("Non-repellent transfer-effect liquid barriers combined with slow-acting protein and sugar bait matrices.");
        p1.setRelatedServices(Arrays.asList("residential-pest-control"));

        PestEntity p2 = new PestEntity();
        p2.setSlug("termites");
        p2.setName("Termites");
        p2.setCommonName("Subterranean Termites, Drywood Termites");
        p2.setScientificName("Isoptera (Reticulitermes flavipes)");
        p2.setCategory("Wood-Destroying Insects");
        p2.setRiskLevel("Severe");
        p2.setDescription("Termites are silent destroyers eating cellulose from the inside out, causing billions in property damage annually.");
        p2.setSignsOfInfestation(Arrays.asList(
            "Mud tubes extending up foundation walls",
            "Hollow or papery-sounding wood when tapped",
            "Discarded silvery wings near windowsills"
        ));
        p2.setCommonLocations(Arrays.asList("Foundation Sills", "Crawlspaces", "Sub-Flooring"));
        p2.setHealthRisks("Severe structural instability and catastrophic financial property damage.");
        p2.setPreventionTips(Arrays.asList(
            "Maintain 6-inch gap between mulch and exterior siding",
            "Direct downspouts well away from foundation walls",
            "Store firewood at least 20 feet away from home"
        ));
        p2.setTreatmentApproach("Exterior Sentricon® colony elimination baiting system or deep perimeter termiticide trenching.");
        p2.setRelatedServices(Arrays.asList("termite-control"));

        pestRepository.saveAll(List.of(p1, p2));
    }

    private void seedLocations() {
        LocationEntity l1 = new LocationEntity();
        l1.setSlug("austin-metro");
        l1.setCityName("Austin & Surrounding Metro");
        l1.setState("TX");
        l1.setRegion("Central Metro Region");
        l1.setPhone("[PHONE_NUMBER]");
        l1.setAddress("[BUSINESS_ADDRESS]");
        l1.setZipCodes(Arrays.asList("78701", "78702", "78703", "78704", "78745", "78748", "78750", "78759"));
        l1.setDescription("Providing premier, environmentally conscious residential and commercial pest control services across the Austin metropolitan area.");
        l1.setCommonPests(Arrays.asList("Carpenter Ants", "Scorpions", "Cockroaches", "Subterranean Termites", "Roof Rats"));
        l1.setServicesAvailable(Arrays.asList("Residential Pest Control", "Commercial IPM", "Termite Sentricon", "Rodent Exclusion"));
        l1.setHighlights(Arrays.asList("Same-day dispatch for active infestations", "100% Insight Protection Guarantee", "Family & pet safe products"));
        l1.setResponseRate("Average on-site inspection within 24 hours");

        LocationEntity l2 = new LocationEntity();
        l2.setSlug("round-rock");
        l2.setCityName("Round Rock & Williamson County");
        l2.setState("TX");
        l2.setRegion("North Metro Region");
        l2.setPhone("[PHONE_NUMBER]");
        l2.setAddress("[BUSINESS_ADDRESS]");
        l2.setZipCodes(Arrays.asList("78664", "78665", "78681", "78626", "78628"));
        l2.setDescription("Comprehensive pest management for suburban homeowners, commercial hubs, and historic properties throughout Round Rock.");
        l2.setCommonPests(Arrays.asList("Fire Ants", "Black Widows", "Subterranean Termites", "Field Mice"));
        l2.setServicesAvailable(Arrays.asList("Residential Perimeter Defense", "Termite Prevention", "Stinging Insect Removal"));
        l2.setHighlights(Arrays.asList("Family-friendly organic treatment options", "Quarterly barrier programs", "Dedicated local technicians"));
        l2.setResponseRate("Same-day or next-morning availability");

        locationRepository.saveAll(List.of(l1, l2));
    }

    private void seedTestimonials() {
        TestimonialEntity t1 = new TestimonialEntity(
            "Sarah Jenkins",
            "Austin Metro",
            "Residential Pest Control",
            5,
            "Insight Pest Solutions is hands down the best pest management team we have ever used. After dealing with stubborn sugar ants every spring, their technician identified where they were entering and sealed it up. We haven't seen an ant in 8 months!",
            LocalDate.of(2026, 6, 14),
            true,
            "Thorough inspection & lasting results"
        );

        TestimonialEntity t2 = new TestimonialEntity(
            "Marcus Sterling",
            "Round Rock",
            "Termite Protection",
            5,
            "When we noticed suspicious wood frass during a renovation, we panicked. The Insight team arrived the next morning, performed a full acoustic scan, and installed the Sentricon baiting system around the foundation. Clear explanations and total peace of mind.",
            LocalDate.of(2026, 7, 22),
            true,
            "Fast response & honest recommendations"
        );

        testimonialRepository.saveAll(List.of(t1, t2));
    }

    private void seedFaqs() {
        FaqEntity f1 = new FaqEntity(
            "General",
            "What is Integrated Pest Management (IPM)?",
            "Integrated Pest Management (IPM) is an eco-conscious approach combining inspection, habitat modification, physical exclusion (sealing entry points), and targeted low-toxicity biological treatments to eliminate pests at their root cause."
        );

        FaqEntity f2 = new FaqEntity(
            "Safety",
            "Are your pest control treatments safe for my children and pets?",
            "Yes, family and pet safety is our top priority. We utilize EPA-registered, low-volatility micro-encapsulated formulations. Once treated surfaces dry (30–60 minutes), they are completely safe for children and household pets."
        );

        faqRepository.saveAll(List.of(f1, f2));
    }

    private void seedBlog() {
        BlogPostEntity b1 = new BlogPostEntity();
        b1.setSlug("how-to-prevent-ants-from-entering-your-home");
        b1.setTitle("How to Prevent Ants From Entering Your Home: A Homeowner's Guide");
        b1.setExcerpt("Learn the most effective proactive steps to eliminate ant attractants, seal entry points, and stop scout trails before full colonies invade.");
        b1.setContent("Spring and early summer bring surges in ant colony foraging. When scout ants discover even the smallest droplet of syrup or crumb, they lay down chemical pheromone trails that direct hundreds of worker ants straight into your pantry.\n\n### 1. Eliminate Food Sources\nStore all dry goods in airtight canisters.\n\n### 2. Maintain Exterior Clearance\nTrim shrubs and branches at least 2 feet away from exterior siding.");
        b1.setCategory("Prevention & DIY Tips");
        b1.setAuthor("Marcus Vance, BCE");
        b1.setPublishedDate(LocalDate.of(2026, 7, 10));
        b1.setReadingTime("5 min read");
        b1.setFeatured(true);
        b1.setTags(Arrays.asList("Ant Control", "Home Tips", "Kitchen Sanitation"));

        blogRepository.saveAll(List.of(b1));
    }
}
