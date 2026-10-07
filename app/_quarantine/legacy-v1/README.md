# Quarantine: legacy-v1 (Phase 3A)

Inert copies of the pre-V2 website. Nothing here is routed, compiled, or linted, because every file ends in `.txt`.

Kept for reference until Phase 3B replaces the related pages. Delete once nothing needs comparing.

Contents:
- `about/`, `contact/`, `privacy/`, `terms/`, `not-found` (old pages and layout)
- `services/` (old service pages: custom-software, desktop-application, mobile-apps, mvp-development, ui-ux-design, generative-ai)
- `components/` (old service components, `ContactCTA`, `LayoutContact`)

Replaced by:
- `/about`: minimal verified Company placeholder
- `/contact`, `/privacy`, `/terms`, `/services/ui-ux-design`, `/services/mvp-development`: noindex placeholders
- `/services/custom-software`, `/services/mobile-apps`, `/services/desktop-application`: permanent redirects (`next.config.ts`)

Quarantined copies still contain old claims and copy. Do not restore them to the routed tree.
