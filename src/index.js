/**
 * Cloudflare Worker entry point for gh-spa
 * Serves static assets with Supabase environment variables
 */

export default {
  async fetch(request, env, ctx) {
    // Return static assets handled by Cloudflare's asset handler
    return env.ASSETS.fetch(request);
  },
};
