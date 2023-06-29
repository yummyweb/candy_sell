import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "<SUPABASE-URL-HERE>"
const supabaseKey = "<SUPABASE-KEY-HERE>"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase