-- ==============================================================================
-- Insight Pest Solutions - PostgreSQL Production & Development Database Schema
-- Database: insightpest_db
-- Compatibility: PostgreSQL 14+ / 15+ / 16+
-- ==============================================================================

-- 1. Create Schema and Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABLE: services
-- ==============================================================================
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    icon VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    pricing_estimate VARCHAR(255),
    warranty VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services (slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON services (category);

-- Element Collection Tables for Services
CREATE TABLE IF NOT EXISTS service_target_pests (
    service_id VARCHAR(255) NOT NULL REFERENCES services (id) ON DELETE CASCADE,
    pest_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS service_features (
    service_id VARCHAR(255) NOT NULL REFERENCES services (id) ON DELETE CASCADE,
    feature VARCHAR(500) NOT NULL
);

-- ==============================================================================
-- TABLE: pests (Pest Library)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS pests (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    common_name VARCHAR(255),
    scientific_name VARCHAR(255),
    category VARCHAR(255),
    risk_level VARCHAR(255),
    description TEXT NOT NULL,
    health_risks TEXT,
    treatment_approach TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pests_slug ON pests (slug);
CREATE INDEX IF NOT EXISTS idx_pests_category ON pests (category);

-- Element Collection Tables for Pests
CREATE TABLE IF NOT EXISTS pest_signs (
    pest_id VARCHAR(255) NOT NULL REFERENCES pests (id) ON DELETE CASCADE,
    sign VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS pest_locations (
    pest_id VARCHAR(255) NOT NULL REFERENCES pests (id) ON DELETE CASCADE,
    location_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pest_prevention_tips (
    pest_id VARCHAR(255) NOT NULL REFERENCES pests (id) ON DELETE CASCADE,
    tip VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS pest_related_services (
    pest_id VARCHAR(255) NOT NULL REFERENCES pests (id) ON DELETE CASCADE,
    service_slug VARCHAR(255) NOT NULL
);

-- ==============================================================================
-- TABLE: locations (Service Areas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS locations (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    city_name VARCHAR(150) NOT NULL,
    state VARCHAR(10) NOT NULL,
    region VARCHAR(100) NOT NULL,
    phone VARCHAR(255),
    address VARCHAR(255),
    description TEXT NOT NULL,
    response_rate VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations (slug);

-- Element Collection Tables for Locations
CREATE TABLE IF NOT EXISTS location_zip_codes (
    location_id VARCHAR(255) NOT NULL REFERENCES locations (id) ON DELETE CASCADE,
    zip_code VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS location_common_pests (
    location_id VARCHAR(255) NOT NULL REFERENCES locations (id) ON DELETE CASCADE,
    pest_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS location_services (
    location_id VARCHAR(255) NOT NULL REFERENCES locations (id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS location_highlights (
    location_id VARCHAR(255) NOT NULL REFERENCES locations (id) ON DELETE CASCADE,
    highlight VARCHAR(500) NOT NULL
);

-- ==============================================================================
-- TABLE: testimonials
-- ==============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(255) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    service VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    date DATE NOT NULL,
    verified BOOLEAN DEFAULT TRUE,
    highlight VARCHAR(255)
);

-- ==============================================================================
-- TABLE: faqs
-- ==============================================================================
CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(255) PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    question VARCHAR(300) NOT NULL,
    answer TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs (category);

-- ==============================================================================
-- TABLE: blog_posts
-- ==============================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(255) PRIMARY KEY,
    slug VARCHAR(150) NOT NULL UNIQUE,
    title VARCHAR(250) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published_date DATE NOT NULL,
    reading_time VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts (category);

CREATE TABLE IF NOT EXISTS blog_tags (
    blog_id VARCHAR(255) NOT NULL REFERENCES blog_posts (id) ON DELETE CASCADE,
    tag_name VARCHAR(255) NOT NULL
);

-- ==============================================================================
-- TABLE: leads (Quote Inquiries)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    property_type VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    pest_problem VARCHAR(150) NOT NULL,
    service_required VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    preferred_contact_method VARCHAR(50),
    preferred_contact_time VARCHAR(50),
    additional_notes TEXT,
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);

-- ==============================================================================
-- TABLE: bookings (Technician Inspection Appointments)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(255) PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL UNIQUE,
    service_slug VARCHAR(100) NOT NULL,
    service_title VARCHAR(255),
    property_type VARCHAR(100) NOT NULL,
    scheduled_date VARCHAR(50) NOT NULL,
    scheduled_time VARCHAR(50) NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(255),
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'REQUESTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings (booking_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (scheduled_date);

-- ==============================================================================
-- TABLE: contact_messages
-- ==============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    preferred_contact_method VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- TABLE: newsletter_subscribers
-- ==============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email);


-- ==============================================================================
-- SEED DATA
-- ==============================================================================

-- 1. Services Seed Data
INSERT INTO services (id, slug, title, short_description, full_description, category, icon, featured, pricing_estimate, warranty, created_at, updated_at)
VALUES 
(
    'srv-1', 'residential-pest-control', 'Residential Pest Control',
    'Comprehensive year-round protection designed specifically to keep your family and home safe from common household pests.',
    'Our Residential Pest Control program utilizes Integrated Pest Management (IPM) protocols tailored to your unique home layout and local climate.',
    'Residential', 'Home', true, 'Starting at $49/mo (Quarterly Plan)',
    '100% Insight Protection Guarantee — Free re-service within 48 hours if pests return.',
    NOW(), NOW()
),
(
    'srv-2', 'commercial-pest-control', 'Commercial Pest Management',
    'Discreet, audit-ready commercial pest solutions for restaurants, hospitality, warehousing, healthcare, and office facilities.',
    'Pest activity in a commercial establishment threatens your brand reputation, customer safety, and regulatory compliance. We provide FDA & AIB compliant IPM.',
    'Commercial', 'Building2', true, 'Custom Quote Based on Square Footage',
    'Zero-Tolerance Commercial Compliance Guarantee.',
    NOW(), NOW()
),
(
    'srv-3', 'termite-control', 'Termite Protection & Elimination',
    'Advanced colony elimination and continuous bait station monitoring to guard your property against structural wood destruction.',
    'Our certified termite specialists utilize eco-conscious Sentricon® baiting technology and precision liquid termiticide barriers to eliminate termite colonies at their queen source.',
    'Specialized', 'ShieldAlert', true, 'Free Inspection / Plan starting at $650',
    '$1,000,000 Structural Damage Repair Guarantee (qualified properties).',
    NOW(), NOW()
),
(
    'srv-4', 'bed-bug-control', 'Bed Bug Eco-Thermal Treatment',
    'Fast, single-day thermal heat remediation and targeted insect growth regulators to eliminate all bed bug stages in one visit.',
    'Our industrial-grade thermal heat remediation brings target room temperatures to a lethal 130°F, penetrating deep into mattresses, furniture, baseboards, and wall cavities.',
    'Specialized', 'Flame', true, 'Starting at $350 per room',
    '90-Day Unconditional Bed Bug Free Warranty.',
    NOW(), NOW()
),
(
    'srv-5', 'rodent-control', 'Rodent Control & Exclusion',
    'Complete rodent trapping, sanitary clean-up, and structural exclusion to permanently keep mice and rats out of your property.',
    'Our comprehensive rodent management goes beyond mere trapping — we perform full exterior exclusion sealing all gaps larger than 1/4 inch with galvanized steel mesh.',
    'Residential', 'PawPrint', true, 'Starting at $199 (Inspection + Exclusion plan)',
    '1-Year Rodent-Free Exclusion Warranty.',
    NOW(), NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Service Target Pests
INSERT INTO service_target_pests (service_id, pest_name) VALUES
('srv-1', 'Ants'), ('srv-1', 'Spiders'), ('srv-1', 'Cockroaches'), ('srv-1', 'Silverfish'), ('srv-1', 'Earwigs'), ('srv-1', 'Centipedes'), ('srv-1', 'Crickets'),
('srv-2', 'Rodents'), ('srv-2', 'Cockroaches'), ('srv-2', 'Flies'), ('srv-2', 'Stored Product Pests'), ('srv-2', 'Drain Pests'),
('srv-3', 'Subterranean Termites'), ('srv-3', 'Drywood Termites'), ('srv-3', 'Formosan Termites'),
('srv-4', 'Cimex lectularius (Common Bed Bug)'), ('srv-4', 'Bat Bugs'),
('srv-5', 'House Mice'), ('srv-5', 'Norway Rats'), ('srv-5', 'Roof Rats'), ('srv-5', 'Field Mice');

-- Service Features
INSERT INTO service_features (service_id, feature) VALUES
('srv-1', 'Exterior 30-foot perimeter barrier application'),
('srv-1', 'Eave & soffit de-webbing up to 20 feet'),
('srv-1', 'Interior crack & crevice targeted micro-treatment'),
('srv-1', 'Garage & crawlspace protective dust application'),
('srv-1', 'Free retreatments between scheduled visits'),
('srv-2', 'Digital logbooks & barcode-scanned trap monitoring'),
('srv-2', 'HACCP & AIB International compliant reporting'),
('srv-2', 'Drain foaming & microbial grease-digesting treatments'),
('srv-2', 'Dedicated commercial account manager'),
('srv-3', 'Thermal imaging and moisture detection inspection'),
('srv-3', 'Non-disruptive exterior bait station installation'),
('srv-3', 'Annual structural re-certification inspection'),
('srv-3', 'Real estate transaction (NPMA-33) termite letters'),
('srv-4', 'Single-day total elimination treatment'),
('srv-4', 'Penetrates mattresses, dressers, and electrical conduits'),
('srv-4', 'Safe for electronics and delicate furnishings'),
('srv-4', 'Follow-up residual growth regulator application'),
('srv-5', 'Full exterior exclusion sealing (flashing, copper mesh, metal seals)'),
('srv-5', 'Attic and crawlspace entry point fortification'),
('srv-5', 'Tamper-proof exterior and interior capture systems'),
('srv-5', 'Attic insulation sanitization & droppings removal');

-- 2. Pests Seed Data
INSERT INTO pests (id, slug, name, common_name, scientific_name, category, risk_level, description, health_risks, treatment_approach, created_at)
VALUES
(
    'pst-1', 'ants', 'Ants', 'Carpenter Ants, Odorous House Ants, Sugar Ants',
    'Formicidae (Camponotus spp., Tapinoma sessile)', 'Crawling Insects', 'Medium to High',
    'Ants are social insects that live in large underground or wood-nesting colonies. They invade structures in search of moisture, proteins, and sugars.',
    'Contamination of open foods with bacteria; structural timber degradation from carpenter ants.',
    'Non-repellent transfer-effect liquid barriers combined with slow-acting protein and sugar bait matrices that worker ants carry directly into nesting cavities.',
    NOW()
),
(
    'pst-2', 'termites', 'Termites', 'Subterranean Termites, Drywood Termites',
    'Isoptera (Reticulitermes flavipes)', 'Wood-Destroying Insects', 'Severe',
    'Termites are silent destroyers eating cellulose from the inside out, causing billions in property damage annually without immediate external evidence.',
    'Severe structural instability and catastrophic financial property damage.',
    'Exterior Sentricon® colony elimination baiting system or deep perimeter termiticide trenching.',
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO pest_signs (pest_id, sign) VALUES
('pst-1', 'Visible trails of ants marching toward countertops, pantries, or sinks'),
('pst-1', 'Fine sawdust-like wood shavings (frass) beneath wooden beams'),
('pst-1', 'Swarming winged reproductive ants (alates) emerging in spring'),
('pst-2', 'Mud tubes extending up foundation walls'),
('pst-2', 'Hollow or papery-sounding wood when tapped'),
('pst-2', 'Discarded silvery wings near windowsills');

INSERT INTO pest_locations (pest_id, location_name) VALUES
('pst-1', 'Kitchens & Pantries'), ('pst-1', 'Behind Baseboards'), ('pst-1', 'Under Sinks & Dishwashers'),
('pst-2', 'Foundation Sills'), ('pst-2', 'Crawlspaces'), ('pst-2', 'Sub-Flooring');

INSERT INTO pest_prevention_tips (pest_id, tip) VALUES
('pst-1', 'Store dry goods in airtight plastic canisters'),
('pst-1', 'Wipe down kitchen surfaces immediately after meals'),
('pst-1', 'Trim tree branches at least 2 feet away from siding'),
('pst-2', 'Maintain 6-inch gap between mulch and exterior siding'),
('pst-2', 'Direct downspouts well away from foundation walls'),
('pst-2', 'Store firewood at least 20 feet away from home');

INSERT INTO pest_related_services (pest_id, service_slug) VALUES
('pst-1', 'residential-pest-control'),
('pst-2', 'termite-control');

-- 3. Locations Seed Data
INSERT INTO locations (id, slug, city_name, state, region, phone, address, description, response_rate, created_at)
VALUES
(
    'loc-1', 'austin-metro', 'Austin & Surrounding Metro', 'TX', 'Central Metro Region',
    '(512) 555-0199', '1200 S Congress Ave, Austin, TX 78704',
    'Providing premier, environmentally conscious residential and commercial pest control services across the Austin metropolitan area.',
    'Average on-site inspection within 24 hours',
    NOW()
),
(
    'loc-2', 'round-rock', 'Round Rock & Williamson County', 'TX', 'North Metro Region',
    '(512) 555-0199', '200 E Main St, Round Rock, TX 78664',
    'Comprehensive pest management for suburban homeowners, commercial hubs, and historic properties throughout Round Rock.',
    'Same-day or next-morning availability',
    NOW()
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO location_zip_codes (location_id, zip_code) VALUES
('loc-1', '78701'), ('loc-1', '78702'), ('loc-1', '78703'), ('loc-1', '78704'), ('loc-1', '78745'), ('loc-1', '78748'), ('loc-1', '78750'), ('loc-1', '78759'),
('loc-2', '78664'), ('loc-2', '78665'), ('loc-2', '78681'), ('loc-2', '78626'), ('loc-2', '78628');

INSERT INTO location_common_pests (location_id, pest_name) VALUES
('loc-1', 'Carpenter Ants'), ('loc-1', 'Scorpions'), ('loc-1', 'Cockroaches'), ('loc-1', 'Subterranean Termites'), ('loc-1', 'Roof Rats'),
('loc-2', 'Fire Ants'), ('loc-2', 'Black Widows'), ('loc-2', 'Subterranean Termites'), ('loc-2', 'Field Mice');

INSERT INTO location_services (location_id, service_name) VALUES
('loc-1', 'Residential Pest Control'), ('loc-1', 'Commercial IPM'), ('loc-1', 'Termite Sentricon'), ('loc-1', 'Rodent Exclusion'),
('loc-2', 'Residential Perimeter Defense'), ('loc-2', 'Termite Prevention'), ('loc-2', 'Stinging Insect Removal');

INSERT INTO location_highlights (location_id, highlight) VALUES
('loc-1', 'Same-day dispatch for active infestations'), ('loc-1', '100% Insight Protection Guarantee'), ('loc-1', 'Family & pet safe products'),
('loc-2', 'Family-friendly organic treatment options'), ('loc-2', 'Quarterly barrier programs'), ('loc-2', 'Dedicated local technicians');

-- 4. Testimonials Seed Data
INSERT INTO testimonials (id, customer_name, location, service, rating, review, date, verified, highlight)
VALUES
(
    'tst-1', 'Sarah Jenkins', 'Austin Metro', 'Residential Pest Control', 5,
    'Insight Pest Solutions is hands down the best pest management team we have ever used. After dealing with stubborn sugar ants every spring, their technician identified where they were entering and sealed it up. We haven''t seen an ant in 8 months!',
    '2026-06-14', true, 'Thorough inspection & lasting results'
),
(
    'tst-2', 'Marcus Sterling', 'Round Rock', 'Termite Protection', 5,
    'When we noticed suspicious wood frass during a renovation, we panicked. The Insight team arrived the next morning, performed a full acoustic scan, and installed the Sentricon baiting system around the foundation. Clear explanations and total peace of mind.',
    '2026-07-22', true, 'Fast response & honest recommendations'
)
ON CONFLICT (id) DO NOTHING;

-- 5. FAQs Seed Data
INSERT INTO faqs (id, category, question, answer)
VALUES
(
    'faq-1', 'General', 'What is Integrated Pest Management (IPM)?',
    'Integrated Pest Management (IPM) is an eco-conscious approach combining inspection, habitat modification, physical exclusion (sealing entry points), and targeted low-toxicity biological treatments to eliminate pests at their root cause.'
),
(
    'faq-2', 'Safety', 'Are your pest control treatments safe for my children and pets?',
    'Yes, family and pet safety is our top priority. We utilize EPA-registered, low-volatility micro-encapsulated formulations. Once treated surfaces dry (30–60 minutes), they are completely safe for children and household pets.'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Blog Posts Seed Data
INSERT INTO blog_posts (id, slug, title, excerpt, content, category, author, published_date, reading_time, featured)
VALUES
(
    'blg-1', 'how-to-prevent-ants-from-entering-your-home',
    'How to Prevent Ants From Entering Your Home: A Homeowner''s Guide',
    'Learn the most effective proactive steps to eliminate ant attractants, seal entry points, and stop scout trails before full colonies invade.',
    'Spring and early summer bring surges in ant colony foraging. When scout ants discover even the smallest droplet of syrup or crumb, they lay down chemical pheromone trails that direct hundreds of worker ants straight into your pantry.\n\n### 1. Eliminate Food Sources\nStore all dry goods in airtight canisters.\n\n### 2. Maintain Exterior Clearance\nTrim shrubs and branches at least 2 feet away from exterior siding.',
    'Prevention & DIY Tips', 'Marcus Vance, BCE', '2026-07-10', '5 min read', true
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_tags (blog_id, tag_name) VALUES
('blg-1', 'Ant Control'), ('blg-1', 'Home Tips'), ('blg-1', 'Kitchen Sanitation');

-- Sample Leads
INSERT INTO leads (id, first_name, last_name, email, phone, property_type, address, city, state, zip_code, pest_problem, service_required, description, preferred_contact_method, preferred_contact_time, additional_notes, consent, status, created_at)
VALUES
(
    'lead-101', 'David', 'Kramer', 'david.kramer@example.com', '(512) 555-0144',
    'Residential Single Family', '1402 Oak Ridge Dr', 'Austin', 'TX', '78704',
    'Ants', 'Residential Pest Control', 'Noticed sugar ants marching along the kitchen baseboards and behind the stove.',
    'Phone', 'Morning', 'Gate code is #4321', true, 'NEW', NOW()
),
(
    'lead-102', 'Amanda', 'Chen', 'amanda.chen@example.com', '(512) 555-0182',
    'Commercial Office', '500 Congress Ave Ste 300', 'Austin', 'TX', '78701',
    'Cockroaches', 'Commercial Pest Management', 'Breakroom sink area had two sightings late in the evening.',
    'Email', 'Anytime', 'Contact building security for badge access upon arrival.', true, 'CONTACTED', NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Sample Bookings
INSERT INTO bookings (id, booking_id, service_slug, service_title, property_type, scheduled_date, scheduled_time, customer_name, email, phone, address, city, state, zip_code, notes, status, created_at)
VALUES
(
    'bkg-201', 'INS-78291', 'residential-pest-control', 'Residential Pest Control',
    'Single Family Home', '2026-09-18', '09:00 AM - 11:00 AM',
    'Michael Robinson', 'm.robinson@example.com', '(512) 555-0177',
    '4811 Rolling Green Way', 'Austin', 'TX', '78745',
    'Friendly golden retriever in backyard, will keep inside during inspection.',
    'CONFIRMED', NOW()
),
(
    'bkg-202', 'INS-89412', 'termite-control', 'Termite Protection & Elimination',
    'Residential Single Family', '2026-09-20', '01:00 PM - 03:00 PM',
    'Elena Rodriguez', 'elena.rodriguez@example.com', '(512) 555-0138',
    '720 Brushy Creek Rd', 'Round Rock', 'TX', '78681',
    'Suspected termite tubes on north exterior foundation wall.',
    'REQUESTED', NOW()
)
ON CONFLICT (booking_id) DO NOTHING;
