-- BOSQUE AI BUSINESS OPERATING SYSTEM SCHEMA

-- 1. AGENTS TABLE
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'AI-00-CEO', 'AI-01-RESEARCH', etc.
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'ONLINE', -- ONLINE, WORKING, READY, OPTIMIZING, IDLE
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Default 5 AI Employees + 1 AI CEO
INSERT INTO public.agents (code, name, role, status) VALUES
('AI-00-CEO', 'AI CEO Orchestrator', 'Executive Business Orchestrator & Coordinator', 'ONLINE'),
('AI-01-RESEARCH', 'Market Research AI', 'Product Winning & Market Intelligence Specialist', 'ONLINE'),
('AI-02-COPYWRITER', 'Sales Copy AI', 'High-Converting Copywriting Specialist', 'WORKING'),
('AI-03-DESIGNER', 'Creative Studio AI', 'Visual Design & Brand Identity Specialist', 'READY'),
('AI-04-VIDEO', 'Video Production AI', '9:16 Vertical Short Video Specialist', 'READY'),
('AI-05-ADS', 'Media Buyer AI', 'Meta Ads Campaign & Budget Scaling Specialist', 'OPTIMIZING')
ON CONFLICT (code) DO NOTHING;

-- 2. APPROVALS TABLE (Crucial for AI Operating System)
CREATE TABLE IF NOT EXISTS public.approvals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_code VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g. 'ADS_CAMPAIGN', 'PRODUCT_LAUNCH', 'BUDGET_SCALE'
    predicted_metrics JSONB, -- e.g. {"roas": 3.5, "estimated_profit": "Rp 15.000.000"}
    action_payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED, REVISION_REQUESTED
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TASKS & ACTIVITIES LOG TABLE
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_code VARCHAR(50) NOT NULL,
    action_name VARCHAR(255) NOT NULL,
    input_data JSONB,
    output_data JSONB,
    status VARCHAR(50) DEFAULT 'SUCCESS', -- SUCCESS, FAILED, IN_PROGRESS, PENDING_APPROVAL
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. AI MEMORY SYSTEM (Context & Decision History)
CREATE TABLE IF NOT EXISTS public.ai_memories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_code VARCHAR(50) NOT NULL,
    memory_type VARCHAR(100) NOT NULL, -- 'SUCCESSFUL_CAMPAIGN', 'WINNING_PRODUCT', 'USER_PREFERENCE', 'FAILED_ANGLE'
    content TEXT NOT NULL,
    metadata JSONB,
    importance_score INT DEFAULT 50, -- 1 - 100
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TELEGRAM & WHATSAPP NOTIFICATIONS QUEUE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    channel VARCHAR(50) NOT NULL, -- 'TELEGRAM', 'WHATSAPP', 'DASHBOARD'
    recipient VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'DELIVERED', -- PENDING, DELIVERED, FAILED
    requires_approval BOOLEAN DEFAULT FALSE,
    approval_id UUID REFERENCES public.approvals(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. BUSINESS OVERVIEW SNAPSHOTS
CREATE TABLE IF NOT EXISTS public.business_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    revenue NUMERIC DEFAULT 0,
    profit NUMERIC DEFAULT 0,
    orders INT DEFAULT 0,
    roas NUMERIC DEFAULT 0,
    ad_spend NUMERIC DEFAULT 0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
