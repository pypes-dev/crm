-- Create organization table
CREATE TABLE public.organization (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS on organization table
ALTER TABLE public.organization ENABLE ROW LEVEL SECURITY;

-- Create members pivot table
CREATE TABLE public.organization_member (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organization(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(organization_id, user_id)
);

-- Enable RLS on members table
ALTER TABLE public.organization_member ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX idx_organization_member_organization_id ON public.organization_member(organization_id);
CREATE INDEX idx_organization_member_user_id ON public.organization_member(user_id);

-- Add trigger to update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_organization_updated_at
BEFORE UPDATE ON public.organization
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_member_updated_at
BEFORE UPDATE ON public.organization_member
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

