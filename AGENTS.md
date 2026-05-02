## Learned User Preferences

- Prefers a two-pane email builder layout: left pane with section templates (CTA, Header, Content, Footer), right pane with the live email preview.
- Wants inline rich-text editing directly on the email preview, not in a separate form panel.
- Hover-to-edit pattern for images: hovering shows a change-image icon, clicking opens an upload dialog.
- Wants link/URL editing (what a button, image, or link points to) accessible on hover of those elements.
- Wants copy-to-clipboard to produce a single item (not duplicated) and to preserve visual formatting (logo, icons) when pasting into Gmail or Outlook.
- Wants copy formats beyond HTML when possible (e.g. rich text pasteable directly into email clients).

## Learned Workspace Facts

- The main signature implementation lives in `src/app/components/email-signature.tsx` and contains brand-specific logic for G2S and Bishop & Finch.
- The Nurture Me email builder lives in `src/app/components/nurture-email.tsx` (created as a new tab in the webapp).
- Nurture Me uses Cabin font for titles and Inter for paragraph/body text.
- The webapp has (at least) three tabs: G2S, Bishop & Finch, and Nurture Me.
- Bishop & Finch default address: "30 N Gould St #10830, Sheridan, WY 82801".
- Recurring double-paste clipboard bug affects both the G2S signature tab and the Nurture Me builder; the root cause has proven hard to fix and reappears after attempted fixes.
- G2S copy-to-clipboard loses the logo (renders as "GS" text) and drops icons when pasted into Gmail.
- Drag-and-drop of sections (both reordering and from the section library) in the Nurture Me builder has been a recurring breakage point.
- Pasting the Nurture Me email into Gmail causes layout overflow issues, especially for the Header section width.
