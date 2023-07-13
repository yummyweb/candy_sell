import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mhecorawfcniksqvxtmb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZWNvcmF3ZmNuaWtzcXZ4dG1iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzY3NTUwNiwiZXhwIjoyMDAzMjUxNTA2fQ.eBb8A9qkmC7RtJks58PUhSGzUj0PYorJVoCg2n2QmMw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase