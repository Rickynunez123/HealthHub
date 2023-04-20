import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://vwwbxanexhmfobvhltut.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3d2J4YW5leGhtZm9idmhsdHV0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDAxNTIzNiwiZXhwIjoxOTk1NTkxMjM2fQ.rogc-eohj-D0BE8v0AxOGUVdDwGhIT-20MKkxdo2r1U";

export const supabase = createClient(supabaseURL, supabaseKey);
