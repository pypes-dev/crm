-- 1. Create a policy to allow authenticated users to create organization members
CREATE POLICY "Enable insert for authenticated users" 
ON public.organization_member
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- 3. Allow users to read organization members they're members of
CREATE POLICY "Allow organization member reads"
ON public.organization_member
FOR SELECT
TO authenticated
USING (true);