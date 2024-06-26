import { createServerClient as createServerClientSB, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '~/env'

export function createServerClient() {
  const cookieStore = cookies()

  return createServerClientSB(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

export function createServerAdminClient() {
  return createServerClientSB(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
    cookies: {},
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
