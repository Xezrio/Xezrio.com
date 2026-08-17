import type { MDXComponents } from "mdx/types";

// Next.js requires this hook; add overrides here to style MDX elements globally.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
