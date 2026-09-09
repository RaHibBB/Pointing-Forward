import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

/**
 * All crawlers welcome, including AI search and training crawlers — being citable
 * by an assistant is the point.
 */
const AI_CRAWLERS = [
  // retrieval bots, which answer live user questions
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  // training crawlers
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
  'Amazonbot',
  'Bytespider',
  'cohere-ai',
  'Diffbot',
  'Timpibot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
