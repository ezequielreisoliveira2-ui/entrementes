
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://goackylocbprnwkpidfg.supabase.co'
const supabaseKey = 'sb_publishable_nD5UwR1_OeFoPIJJjZYXuA_SkUCjw6M'

export const supabase = createClient(supabaseUrl, supabaseKey)