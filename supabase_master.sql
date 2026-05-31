-- ==========================================
-- BLOOD PULSE MASTER DATABASE SCHEMA (v2.1)
-- Fully Modernized for Dynamic Content & Identity Matrix
-- ==========================================

-- 1. Profiles Table (The Identity Matrix)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    blood_group TEXT,
    department TEXT,
    student_id TEXT,
    residential_status TEXT,
    batch TEXT,
    phone TEXT,
    recovery_email TEXT,
    recovery_phone TEXT,
    avatar_url TEXT,
    rank INTEGER DEFAULT 4,
    times_donated INTEGER DEFAULT 0,
    bags_donated INTEGER DEFAULT 0,
    last_donation_date TIMESTAMP WITH TIME ZONE,
    occupational_designation TEXT, -- 'student' or 'civilian'
    nid_birth_id TEXT,
    division TEXT,
    district TEXT,
    upazila TEXT,
    village TEXT,
    occupation TEXT,
    role TEXT DEFAULT 'donor',
    dob DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Blood Requests Table
CREATE TABLE IF NOT EXISTS requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_id UUID REFERENCES auth.users ON DELETE SET NULL,
    requester_name TEXT,
    patient_name TEXT,
    blood_group TEXT,
    bags_needed INTEGER DEFAULT 1,
    hospital_location TEXT,
    required_date DATE,
    contact_phone TEXT,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Community Stories Table
CREATE TABLE IF NOT EXISTS stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE SET NULL,
    author_name TEXT,
    content TEXT,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Approved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Platform Settings & Global Branding
CREATE TABLE IF NOT EXISTS platform_settings (
    id TEXT PRIMARY KEY DEFAULT 'config',
    address TEXT,
    postal_code TEXT,
    phone TEXT,
    email TEXT,
    facebook_url TEXT,
    footer_description TEXT,
    hero_title TEXT,
    hero_subtitle TEXT,
    map_url TEXT,
    founder_name TEXT DEFAULT 'Nasim Uddin Shawrab',
    founder_role TEXT DEFAULT 'Lead Developer & Platform Founder',
    emergency_mode BOOLEAN DEFAULT FALSE,
    auto_verification BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Committee Members (Leadership)
CREATE TABLE IF NOT EXISTS committee (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    department TEXT,
    phone TEXT,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. News & Announcements
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Impact Gallery
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Notifications / Activity Log
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    title TEXT,
    message TEXT,
    type TEXT, -- 'alert', 'info', 'success'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- SCHEMA MIGRATION (CRITICAL: MUST RUN BEFORE INSERT)
-- ==========================================

-- Ensure Hero columns exist for existing tables
ALTER TABLE platform_settings ADD COLUMN IF NOT EXISTS hero_title TEXT;
ALTER TABLE platform_settings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT;

-- Ensure Recovery columns exist for existing tables
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS recovery_email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS recovery_phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Ensure occupation logic columns exist for existing tables
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS division TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS village TEXT;

-- Ensure requests table has donor_id and requester_id for tracking
ALTER TABLE requests ADD COLUMN IF NOT EXISTS requester_id UUID REFERENCES auth.users ON DELETE SET NULL;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS donor_id UUID REFERENCES auth.users ON DELETE SET NULL;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS donor_name TEXT;

-- ==========================================
-- SECURITY & ACCESS CONTROL (RLS)
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE committee ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Requests Policies
DROP POLICY IF EXISTS "Requests are viewable by everyone" ON requests;
CREATE POLICY "Requests are viewable by everyone" ON requests FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can insert requests" ON requests;
CREATE POLICY "Anyone can insert requests" ON requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update requests" ON requests;
CREATE POLICY "Anyone can update requests" ON requests FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Anyone can delete requests" ON requests;
CREATE POLICY "Anyone can delete requests" ON requests FOR DELETE USING (true);

-- Stories Policies
DROP POLICY IF EXISTS "Allow public read" ON stories;
CREATE POLICY "Allow public read" ON stories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Anyone can update stories" ON stories;
CREATE POLICY "Anyone can update stories" ON stories FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Anyone can delete stories" ON stories;
CREATE POLICY "Anyone can delete stories" ON stories FOR DELETE USING (true);

-- Notifications Policies
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (true);
DROP POLICY IF EXISTS "System can insert notifications" ON notifications;
CREATE POLICY "System can insert notifications" ON notifications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can delete notifications" ON notifications;
CREATE POLICY "Anyone can delete notifications" ON notifications FOR DELETE USING (true);

-- Settings Policies (Read for all, Write for Admins)
DROP POLICY IF EXISTS "Settings are viewable by everyone" ON platform_settings;
CREATE POLICY "Settings are viewable by everyone" ON platform_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage settings" ON platform_settings;
CREATE POLICY "Admins can manage settings" ON platform_settings FOR ALL USING (true);

-- Global Public View Policies
DROP POLICY IF EXISTS "Allow public read" ON committee;
CREATE POLICY "Allow public read" ON committee FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin insert" ON committee;
CREATE POLICY "Allow admin insert" ON committee FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow admin delete" ON committee;
CREATE POLICY "Allow admin delete" ON committee FOR DELETE USING (true);
DROP POLICY IF EXISTS "Allow public read" ON news;
CREATE POLICY "Allow public read" ON news FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read" ON gallery;
CREATE POLICY "Allow public read" ON gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public delete" ON gallery;
CREATE POLICY "Allow public delete" ON gallery FOR DELETE USING (true);

-- ==========================================
-- DYNAMIC CONTENT INITIALIZATION
-- ==========================================

INSERT INTO platform_settings (id, address, postal_code, phone, email, footer_description, hero_title, hero_subtitle)
VALUES (
    'config', 
    'Saidpur Cantonment, Nilphamari', 
    '5310', 
    '+880 17...', 
    'info@baust.edu.bd', 
    'BAUST Blood Pulse was established to serve the campus community through voluntary service.', 
    'Give the gift of life. Become a hero today.', 
    'Every drop counts. Join our network of heroes and ensure that medical precision meets human empathy when it matters most.'
)
ON CONFLICT (id) DO UPDATE SET
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle,
    footer_description = EXCLUDED.footer_description;
