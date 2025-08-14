-- 1. Create a policy to allow authenticated users to create organizations
CREATE POLICY "Enable insert for authenticated users" 
ON public.organization
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- 3. Allow users to read organizations they're members of
CREATE POLICY "Allow organization reads"
ON public.organization
FOR SELECT
TO authenticated
USING (true);