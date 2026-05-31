-- ==========================================
-- BLOOD PULSE MASTER DATABASE SCHEMA (MSSQL)
-- Equivalent of supabase_master.sql for Microsoft SQL Server
-- ==========================================
-- Create the database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'BloodPulse')
BEGIN
    CREATE DATABASE BloodPulse;
END
GO

USE BloodPulse;
GO

-- ==========================================
-- 1. Users Table (Replaces Supabase auth.users)
-- Supabase handled auth automatically; in MSSQL you manage this yourself
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id            UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        email         NVARCHAR(255)     NOT NULL UNIQUE,
        password_hash NVARCHAR(512)     NOT NULL,  -- Store bcrypt hash, never plaintext
        created_at    DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        updated_at    DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 2. Profiles Table (The Identity Matrix)
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'profiles')
BEGIN
    CREATE TABLE profiles (
        id                       UNIQUEIDENTIFIER  NOT NULL REFERENCES users(id) ON DELETE CASCADE PRIMARY KEY,
        full_name                NVARCHAR(255)     NULL,
        email                    NVARCHAR(255)     NULL,
        blood_group              NVARCHAR(10)      NULL,
        department               NVARCHAR(255)     NULL,
        student_id               NVARCHAR(100)     NULL,
        residential_status       NVARCHAR(100)     NULL,
        batch                    NVARCHAR(50)      NULL,
        phone                    NVARCHAR(30)      NULL,
        recovery_email           NVARCHAR(255)     NULL,
        recovery_phone           NVARCHAR(30)      NULL,
        avatar_url               NVARCHAR(MAX)     NULL,
        rank                     INT               NOT NULL DEFAULT 4,
        times_donated            INT               NOT NULL DEFAULT 0,
        bags_donated             INT               NOT NULL DEFAULT 0,
        last_donation_date       DATETIMEOFFSET    NULL,
        occupational_designation NVARCHAR(50)      NULL,  -- 'student' or 'civilian'
        nid_birth_id             NVARCHAR(100)     NULL,
        division                 NVARCHAR(100)     NULL,
        district                 NVARCHAR(100)     NULL,
        upazila                  NVARCHAR(100)     NULL,
        village                  NVARCHAR(255)     NULL,
        occupation               NVARCHAR(255)     NULL,
        role                     NVARCHAR(50)      NOT NULL DEFAULT 'donor',
        dob                      DATE              NULL,
        updated_at               DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET(),
        created_at               DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 3. Blood Requests Table
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'requests')
BEGIN
    CREATE TABLE requests (
        id                 UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        requester_id       UNIQUEIDENTIFIER  NULL REFERENCES users(id) ON DELETE NO ACTION,
        donor_id           UNIQUEIDENTIFIER  NULL REFERENCES users(id) ON DELETE NO ACTION,
        requester_name     NVARCHAR(255)     NULL,
        donor_name         NVARCHAR(255)     NULL,
        patient_name       NVARCHAR(255)     NULL,
        blood_group        NVARCHAR(10)      NULL,
        bags_needed        INT               NOT NULL DEFAULT 1,
        hospital_location  NVARCHAR(500)     NULL,
        required_date      DATE              NULL,
        contact_phone      NVARCHAR(30)      NULL,
        status             NVARCHAR(50)      NOT NULL DEFAULT 'Pending',  -- 'Pending', 'Approved', 'Rejected'
        requires_wheelchair BIT              NOT NULL DEFAULT 0,
        created_at         DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 4. Community Stories Table
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'stories')
BEGIN
    CREATE TABLE stories (
        id          UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        user_id     UNIQUEIDENTIFIER  NULL REFERENCES users(id) ON DELETE SET NULL,
        author_name NVARCHAR(255)     NULL,
        content     NVARCHAR(MAX)     NULL,
        status      NVARCHAR(50)      NOT NULL DEFAULT 'Pending',  -- 'Pending', 'Approved'
        created_at  DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 5. Platform Settings & Global Branding
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'platform_settings')
BEGIN
    CREATE TABLE platform_settings (
        id                  NVARCHAR(50)   NOT NULL DEFAULT 'config' PRIMARY KEY,
        address             NVARCHAR(500)  NULL,
        postal_code         NVARCHAR(20)   NULL,
        phone               NVARCHAR(30)   NULL,
        email               NVARCHAR(255)  NULL,
        facebook_url        NVARCHAR(500)  NULL,
        footer_description  NVARCHAR(MAX)  NULL,
        hero_title          NVARCHAR(500)  NULL,
        hero_subtitle       NVARCHAR(MAX)  NULL,
        map_url             NVARCHAR(1000) NULL,
        founder_name        NVARCHAR(255)  NOT NULL DEFAULT 'Nasim Uddin Shawrab',
        founder_role        NVARCHAR(255)  NOT NULL DEFAULT 'Lead Developer & Platform Founder',
        emergency_mode      BIT            NOT NULL DEFAULT 0,
        auto_verification   BIT            NOT NULL DEFAULT 1,
        updated_at          DATETIMEOFFSET NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 6. Committee Members (Leadership)
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'committee')
BEGIN
    CREATE TABLE committee (
        id          UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        name        NVARCHAR(255)     NOT NULL,
        role        NVARCHAR(255)     NULL,
        department  NVARCHAR(255)     NULL,
        phone       NVARCHAR(30)      NULL,
        image_url   NVARCHAR(MAX)     NULL,
        order_index INT               NOT NULL DEFAULT 0,
        created_at  DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 7. News & Announcements
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'news')
BEGIN
    CREATE TABLE news (
        id         UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        title      NVARCHAR(500)     NOT NULL,
        body       NVARCHAR(MAX)     NULL,
        image_url  NVARCHAR(MAX)     NULL,
        created_at DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 8. Impact Gallery
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'gallery')
BEGIN
    CREATE TABLE gallery (
        id         UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        url        NVARCHAR(MAX)     NOT NULL,
        caption    NVARCHAR(500)     NULL,
        created_at DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 9. Notifications / Activity Log
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'notifications')
BEGIN
    CREATE TABLE notifications (
        id         UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        user_id    UNIQUEIDENTIFIER  NULL REFERENCES users(id) ON DELETE CASCADE,
        title      NVARCHAR(500)     NULL,
        message    NVARCHAR(MAX)     NULL,
        type       NVARCHAR(100)     NULL,  -- 'alert', 'info', 'success', 'security', 'contact_message'
        is_read    BIT               NOT NULL DEFAULT 0,
        created_at DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- 10. Blood Group Change Requests
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'blood_group_requests')
BEGIN
    CREATE TABLE blood_group_requests (
        id         UNIQUEIDENTIFIER  NOT NULL DEFAULT NEWID() PRIMARY KEY,
        user_id    UNIQUEIDENTIFIER  NULL REFERENCES users(id) ON DELETE SET NULL,
        user_name  NVARCHAR(255)     NULL,
        old_group  NVARCHAR(10)      NULL,
        new_group  NVARCHAR(10)      NULL,
        reason     NVARCHAR(MAX)     NULL,
        status     NVARCHAR(50)      NOT NULL DEFAULT 'Pending',  -- 'Pending', 'Approved', 'Rejected'
        created_at DATETIMEOFFSET    NOT NULL DEFAULT SYSDATETIMEOFFSET()
    );
END
GO

-- ==========================================
-- INDEXES (Performance Optimization)
-- ==========================================
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_profiles_blood_group' AND object_id = OBJECT_ID('profiles'))
    CREATE INDEX IX_profiles_blood_group   ON profiles(blood_group);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_profiles_role' AND object_id = OBJECT_ID('profiles'))
    CREATE INDEX IX_profiles_role          ON profiles(role);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_requests_status' AND object_id = OBJECT_ID('requests'))
    CREATE INDEX IX_requests_status        ON requests(status);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_requests_requester_id' AND object_id = OBJECT_ID('requests'))
    CREATE INDEX IX_requests_requester_id  ON requests(requester_id);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_requests_blood_group' AND object_id = OBJECT_ID('requests'))
    CREATE INDEX IX_requests_blood_group   ON requests(blood_group);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_stories_status' AND object_id = OBJECT_ID('stories'))
    CREATE INDEX IX_stories_status         ON stories(status);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_notifications_user_id' AND object_id = OBJECT_ID('notifications'))
    CREATE INDEX IX_notifications_user_id  ON notifications(user_id);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_notifications_type' AND object_id = OBJECT_ID('notifications'))
    CREATE INDEX IX_notifications_type     ON notifications(type);
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_blood_group_req_status' AND object_id = OBJECT_ID('blood_group_requests'))
    CREATE INDEX IX_blood_group_req_status ON blood_group_requests(status);
GO

-- ==========================================
-- INITIAL DATA SEED
-- ==========================================
IF NOT EXISTS (SELECT 1 FROM platform_settings WHERE id = 'config')
BEGIN
    INSERT INTO platform_settings (
        id, address, postal_code, phone, email,
        footer_description, hero_title, hero_subtitle
    )
    VALUES (
        'config',
        'Saidpur Cantonment, Nilphamari',
        '5310',
        '+880 17...',
        'info@baust.edu.bd',
        'BAUST Blood Pulse was established to serve the campus community through voluntary service.',
        'Give the gift of life. Become a hero today.',
        'Every drop counts. Join our network of heroes and ensure that medical precision meets human empathy when it matters most.'
    );
END
GO

-- ==========================================
-- STORED PROCEDURES (API Endpoints Equivalent)
-- These replace Supabase RPC / REST auto-endpoints
-- ==========================================

-- Get all approved requests for a blood group
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_GetApprovedRequestsByBloodGroup]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[usp_GetApprovedRequestsByBloodGroup]
GO
CREATE PROCEDURE usp_GetApprovedRequestsByBloodGroup
    @blood_group NVARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT r.*, p.phone AS requester_phone
    FROM requests r
    LEFT JOIN profiles p ON p.id = r.requester_id
    WHERE r.blood_group = @blood_group
      AND r.status = 'Approved'
    ORDER BY r.created_at DESC;
END
GO

-- Approve a blood group change request (updates both tables atomically)
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_AuthorizeBloodGroupChange]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[usp_AuthorizeBloodGroupChange]
GO
CREATE PROCEDURE usp_AuthorizeBloodGroupChange
    @req_id    UNIQUEIDENTIFIER,
    @status    NVARCHAR(50),
    @user_id   UNIQUEIDENTIFIER,
    @new_group NVARCHAR(10)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        UPDATE blood_group_requests SET status = @status WHERE id = @req_id;

        IF @status = 'Approved'
            UPDATE profiles SET blood_group = @new_group WHERE id = @user_id;

        INSERT INTO notifications (user_id, title, message, type)
        VALUES (
            @user_id,
            CONCAT('Identity Update ', @status),
            CONCAT('Your request to change blood group to ', @new_group, ' has been ', LOWER(@status), '.'),
            'security'
        );

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Login procedure (validates credentials, returns user + profile)
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_Login]') AND type in (N'P', N'PC'))
    DROP PROCEDURE [dbo].[usp_Login]
GO
CREATE PROCEDURE usp_Login
    @email NVARCHAR(255),
    @password_hash NVARCHAR(512)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT u.id, u.email, p.*
    FROM users u
    LEFT JOIN profiles p ON p.id = u.id
    WHERE u.email = @email
      AND u.password_hash = @password_hash;
END
GO
