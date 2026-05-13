import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { Check, Code, AlignLeft, ClipboardPaste, ChevronDown, ChevronUp, Plus, Trash2, ImageIcon, Bold, Italic, Underline, Link2, GripVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';

// ── Brand ──────────────────────────────────────────────────────────────────────
const NM_TEAL = '#29b9c5';
const NM_TEAL_DARK = '#1da8b2';
const NM_HEADER_BG = '#dff0f5';
const NM_LIGHT = '#f0f9ff';
const NM_DARK = '#1a1a2e';
const nmWaveSrc = new URL('../../../nurture-wave.png', import.meta.url).href;

const LOGO_SVG_RAW = `<svg width="1440" height="360" viewBox="0 0 1440 360" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="nm_m0" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="4" width="1437" height="352"><path d="M1436.51 4.73682H0V355.263H1436.51V4.73682Z" fill="white"/></mask><g mask="url(#nm_m0)"><mask id="nm_m1" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="52" width="1437" height="256"><path d="M1436.51 52.1052H0V307.895H1436.51V52.1052Z" fill="white"/></mask><g mask="url(#nm_m1)"><path d="M93.4917 190.915V223.81C93.4917 223.81 47.4346 223.443 21.6662 189.453C-4.10225 155.461 0.282719 134.626 0.282719 116.803V70.7458C0.282719 55.1188 5.76843 52.1052 26.8752 52.1052C47.9819 52.1052 89.9609 55.8827 119.814 89.1158C147.231 119.636 153.077 141.447 153.077 179.342V271.696C153.077 278.277 155.453 277.044 179.579 269.368C203.705 261.693 250.857 233.867 267.032 191.1C283.206 148.334 278.273 110.499 278.273 110.499C278.273 110.499 241.263 112.141 216.319 137.368C191.374 162.596 192.74 179.04 194.388 225.098L160.945 244.286C160.945 244.286 157.107 187.54 166.701 156.009C176.295 124.484 205.083 98.4391 232.77 87.7443C260.457 77.0496 276.908 78.9744 293.63 78.9744C310.352 78.9744 310.629 83.636 310.629 98.7158C310.629 113.795 311.453 154.367 302.953 185.897C294.454 217.423 270.057 249.772 245.931 270.884C221.805 291.997 176.295 307.895 147.513 307.895C118.731 307.895 119.548 307.895 119.548 295.281V193.025C119.548 141.212 114.616 131.341 97.3412 112.424C80.0723 93.5067 53.7504 85.8315 33.7383 86.3789V139.017C33.7383 157.657 53.4797 189.368 93.5037 190.92L93.4917 190.915Z" fill="url(#nm_grad)"/><path d="M379.787 239.684V135.761H401.951L403.833 153.326C407.179 147.192 411.848 142.313 417.843 138.688C423.977 135.064 431.086 133.252 439.171 133.252C447.814 133.252 455.133 135.064 461.127 138.688C467.122 142.173 471.721 147.401 474.928 154.371C478.134 161.342 479.737 169.984 479.737 180.299V239.684H454.645V182.6C454.645 173.539 452.693 166.569 448.79 161.689C445.026 156.81 439.241 154.371 431.434 154.371C426.277 154.371 421.676 155.626 417.634 158.135C413.731 160.505 410.594 164.06 408.225 168.799C405.994 173.4 404.879 178.976 404.879 185.527V239.684H379.787ZM544.258 242.194C535.894 242.194 528.645 240.452 522.511 236.966C516.517 233.482 511.917 228.254 508.711 221.283C505.504 214.174 503.901 205.461 503.901 195.146V135.761H528.785V192.637C528.785 201.977 530.666 209.086 534.43 213.965C538.333 218.705 544.188 221.075 551.995 221.075C557.153 221.075 561.753 219.82 565.796 217.311C569.838 214.802 572.975 211.247 575.205 206.647C577.575 202.046 578.76 196.401 578.76 189.71V135.761H603.853V239.684H581.479L579.805 221.911C576.459 228.045 571.72 232.993 565.586 236.757C559.592 240.381 552.482 242.194 544.258 242.194ZM631.362 239.684V135.761H653.736L656.036 155.207C658.545 150.747 661.612 146.843 665.236 143.498C669 140.152 673.322 137.643 678.201 135.97C683.08 134.158 688.517 133.252 694.511 133.252V159.598H687.401C682.941 159.598 678.828 160.156 675.064 161.271C671.3 162.247 668.024 163.92 665.236 166.29C662.448 168.66 660.288 171.866 658.754 175.908C657.221 179.952 656.454 184.97 656.454 190.964V239.684H631.362ZM758.418 239.684C751.448 239.684 745.314 238.569 740.017 236.339C734.719 234.109 730.607 230.414 727.679 225.257C724.891 220.099 723.498 213.129 723.498 204.346V156.671H705.515V135.761H723.498L726.425 108.369H748.59V135.761H777.028V156.671H748.59V204.346C748.59 209.644 749.705 213.338 751.936 215.429C754.166 217.38 758.069 218.356 763.645 218.356H776.191V239.684H758.418ZM838.716 242.194C830.352 242.194 823.103 240.452 816.97 236.966C810.975 233.482 806.375 228.254 803.168 221.283C799.963 214.174 798.36 205.461 798.36 195.146V135.761H823.242V192.637C823.242 201.977 825.125 209.086 828.888 213.965C832.792 218.705 838.646 221.075 846.453 221.075C851.61 221.075 856.211 219.82 860.253 217.311C864.296 214.802 867.432 211.247 869.663 206.647C872.033 202.046 873.218 196.401 873.218 189.71V135.761H898.31V239.684H875.936L874.264 221.911C870.918 228.045 866.178 232.993 860.045 236.757C854.05 240.381 846.941 242.194 838.716 242.194ZM925.82 239.684V135.761H948.193L950.495 155.207C953.005 150.747 956.075 146.843 959.694 143.498C963.455 140.152 967.784 137.643 972.663 135.97C977.542 134.158 982.97 133.252 988.967 133.252V159.598H981.862C977.4 159.598 973.288 160.156 969.518 161.271C965.757 162.247 962.479 163.92 959.694 166.29C956.908 168.66 954.748 171.866 953.214 175.908C951.679 179.952 950.911 184.97 950.911 190.964V239.684H925.82ZM1054.81 242.194C1044.49 242.194 1035.29 239.964 1027.21 235.503C1019.26 230.902 1012.99 224.559 1008.39 216.475C1003.93 208.389 1001.7 199.05 1001.7 188.454C1001.7 177.442 1003.93 167.823 1008.39 159.598C1012.85 151.374 1019.06 144.962 1027 140.361C1035.09 135.621 1044.43 133.252 1055.02 133.252C1065.33 133.252 1074.33 135.482 1082 139.943C1089.66 144.404 1095.58 150.468 1099.77 158.135C1104.09 165.663 1106.25 174.166 1106.25 183.645C1106.25 185.039 1106.25 186.643 1106.25 188.454C1106.25 190.127 1106.19 191.871 1106.04 193.682H1019.89V177.581H1080.95C1080.53 170.193 1077.88 164.338 1073 160.017C1068.26 155.695 1062.27 153.534 1055.02 153.534C1049.86 153.534 1045.05 154.719 1040.59 157.09C1036.27 159.459 1032.78 162.945 1030.14 167.545C1027.63 172.005 1026.37 177.721 1026.37 184.69V190.755C1026.37 197.167 1027.63 202.673 1030.14 207.274C1032.65 211.874 1036.06 215.429 1040.38 217.938C1044.7 220.308 1049.51 221.493 1054.81 221.493C1060.52 221.493 1065.33 220.239 1069.24 217.729C1073.14 215.08 1076.07 211.665 1078.02 207.483H1103.32C1101.37 214.035 1098.16 219.959 1093.71 225.257C1089.25 230.414 1083.73 234.527 1077.19 237.593C1070.63 240.661 1063.17 242.194 1054.81 242.194ZM1129 239.684V135.761H1151.17L1153.26 149.98C1156.6 144.683 1160.99 140.571 1166.43 137.643C1172.01 134.716 1178.42 133.252 1185.67 133.252C1190.97 133.252 1195.78 133.948 1200.1 135.343C1204.42 136.597 1208.18 138.619 1211.39 141.407C1214.73 144.195 1217.52 147.68 1219.75 151.862C1223.52 146.007 1228.53 141.476 1234.81 138.27C1241.21 134.924 1248.19 133.252 1255.72 133.252C1264.5 133.252 1271.96 135.064 1278.09 138.688C1284.37 142.173 1289.1 147.401 1292.31 154.371C1295.66 161.342 1297.33 169.984 1297.33 180.299V239.684H1272.45V182.6C1272.45 173.539 1270.63 166.569 1267.01 161.689C1263.38 156.81 1257.94 154.371 1250.7 154.371C1245.68 154.371 1241.29 155.626 1237.53 158.135C1233.76 160.644 1230.83 164.199 1228.75 168.799C1226.65 173.4 1225.6 179.045 1225.6 185.736V239.684H1200.72V182.6C1200.72 173.539 1198.91 166.569 1195.29 161.689C1191.66 156.81 1186.15 154.371 1178.76 154.371C1174.03 154.371 1169.77 155.626 1166.01 158.135C1162.25 160.505 1159.32 164.06 1157.23 168.799C1155.14 173.4 1154.09 179.045 1154.09 185.736V239.684H1129ZM1372.55 242.194C1362.23 242.194 1353.03 239.964 1344.95 235.503C1337 230.902 1330.73 224.559 1326.13 216.475C1321.66 208.389 1319.44 199.05 1319.44 188.454C1319.44 177.442 1321.66 167.823 1326.13 159.598C1330.59 151.374 1336.79 144.962 1344.74 140.361C1352.82 135.621 1362.16 133.252 1372.76 133.252C1383.07 133.252 1392.06 135.482 1399.73 139.943C1407.4 144.404 1413.32 150.468 1417.51 158.135C1421.83 165.663 1423.99 174.166 1423.99 183.645C1423.99 185.039 1423.99 186.643 1423.99 188.454C1423.99 190.127 1423.91 191.871 1423.78 193.682H1337.63V177.581H1398.69C1398.27 170.193 1395.62 164.338 1390.74 160.017C1386 155.695 1380 153.534 1372.76 153.534C1367.6 153.534 1362.79 154.719 1358.33 157.09C1354.01 159.459 1350.52 162.945 1347.88 167.545C1345.37 172.005 1344.11 177.721 1344.11 184.69V190.755C1344.11 197.167 1345.37 202.673 1347.88 207.274C1350.38 211.874 1353.8 215.429 1358.12 217.938C1362.44 220.308 1367.25 221.493 1372.55 221.493C1378.26 221.493 1383.07 220.239 1386.98 217.729C1390.88 215.08 1393.81 211.665 1395.76 207.483H1421.06C1419.11 214.035 1415.9 219.959 1411.44 225.257C1406.98 230.414 1401.47 234.527 1394.92 237.593C1388.37 240.661 1380.91 242.194 1372.55 242.194Z" fill="black"/></g></g><defs><linearGradient id="nm_grad" x1="108.873" y1="161.579" x2="167.218" y2="184.737" gradientUnits="userSpaceOnUse"><stop stop-color="#65FEFD"/><stop offset="1" stop-color="#66A3FE"/></linearGradient></defs></svg>`;
const LOGO_SRC = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(LOGO_SVG_RAW)}`;

// ── Font stacks ────────────────────────────────────────────────────────────────
const CABIN = "'Cabin','Trebuchet MS',Arial,sans-serif";
const INTER = "'Inter','Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif";

// ── Types ──────────────────────────────────────────────────────────────────────
interface EmailSection {
  id: string;
  type: 'header' | 'content' | 'cta' | 'footer';
  variant: string;
  // Header
  logoSrc: string;
  logoLinkUrl: string;
  bgColor: string;
  // Hero header
  heroTitle: string;
  heroSubtitle: string;
  // Content
  title: string;
  body: string;
  items: string[];
  // Image-text
  imageSrc: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  imageLinkUrl: string;
  // CTA
  ctaHeading: string;
  ctaBody: string;
  buttonText: string;
  buttonUrl: string;
  buttonColor: string;
  buttonTextColor: string;
  ctaBgColor: string;
  ctaTextColor: string;
  // Callout
  calloutText: string;
  // Stats row
  statsItems: Array<{ value: string; label: string }>;
  // Feature cards
  cardItems: Array<{ icon: string; title: string; body: string }>;
  // Footer
  footerLogoSrc: string;
  copyright: string;
  showUnsubscribe: boolean;
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function makeSection(
  type: EmailSection['type'],
  variant: string,
  overrides: Partial<EmailSection> = {},
): EmailSection {
  return {
    id: `${type}-${variant}-${uid()}`,
    type,
    variant,
    logoSrc: LOGO_SRC,
    logoLinkUrl: '',
    bgColor: NM_HEADER_BG,
    heroTitle: 'Your recruiting,<br><strong>supercharged.</strong>',
    heroSubtitle: 'Welcome to the platform built for modern talent teams.',
    title: 'Section Heading',
    body: 'Add your paragraph content here. Click to edit this text directly.',
    items: ['First bullet point', 'Second bullet point', 'Third bullet point'],
    imageSrc: '',
    imageAlt: 'Feature image',
    imagePosition: 'left',
    imageLinkUrl: '',
    statsItems: [
      { value: '30%', label: 'Higher Performance' },
      { value: '60%', label: 'Longer Retention' },
      { value: '50%', label: 'Faster Hiring' },
    ],
    cardItems: [
      { icon: '🤖', title: 'Resume Agent', body: 'Stop reading bad resumes. Source the top 10% instantly.' },
      { icon: '📅', title: 'Scheduling Agent', body: 'Schedule meetings and follow up without lifting a finger.' },
      { icon: '🎯', title: 'Interview Agent', body: 'Never waste time screening a candidate again.' },
    ],
    ctaHeading: 'Ready to get started?',
    ctaBody: 'Click below to access your dashboard and start sourcing candidates.',
    buttonText: 'Go to Dashboard',
    buttonUrl: 'https://app.nurtureme.ai',
    buttonColor: NM_TEAL,
    buttonTextColor: '#ffffff',
    ctaBgColor: NM_TEAL,
    ctaTextColor: '#ffffff',
    calloutText:
      "Keep an eye on your inbox. You'll receive an email from our team shortly with your platform access details.",
    footerLogoSrc: LOGO_SRC,
    copyright: '© 2026 Nurtureme · All rights reserved.',
    showUnsubscribe: true,
    ...overrides,
  };
}

// ── Default email ──────────────────────────────────────────────────────────────
const DEFAULT_SECTIONS: EmailSection[] = [
  makeSection('header', 'logo-centered'),
  makeSection('content', 'text', {
    title: 'Welcome to Nurtureme!',
    body: "Thank you for choosing Nurtureme! We're excited to get started. Here's a summary of what you've signed up for and how our AI agents will transform your hiring process.",
  }),
  makeSection('content', 'stats', {}),
  makeSection('content', 'bullets', {
    title: 'Your Plan Includes:',
    items: [
      'Full access to the Nurtureme platform',
      'AI-powered candidate sourcing through targeted campaigns',
      'Automated recruiting workflows and nurture sequences',
      'AI agents Ava (screening & ranking) and Stella (automated scheduling)',
      'Real-time reporting dashboard and analytics',
      'Dedicated onboarding support during your setup period',
    ],
  }),
  makeSection('content', 'feature-cards', {
    title: 'Meet Your AI Recruiting Team',
  }),
  makeSection('content', 'text', {
    title: "Don't Forget: Submit Your Roles",
    body: "Our team will also be sourcing candidates on your behalf. To get your campaigns started, send your job descriptions to your Onboarding Specialist at <a href='mailto:onboarding@nurtureme.ai' style='color:#29b9c5;'>onboarding@nurtureme.ai</a>. The sooner we receive them, the sooner candidates start flowing in.",
  }),
  makeSection('content', 'callout', {
    calloutText:
      "Keep an eye on your inbox. You'll receive an email from our team shortly with your platform access details and onboarding schedule.",
  }),
  makeSection('cta', 'button-center', {
    ctaHeading: 'Ready to start sourcing?',
    ctaBody: 'Log in to your Nurtureme dashboard and set up your first campaign.',
    buttonText: 'Go to Dashboard →',
  }),
  makeSection('footer', 'with-logo'),
];

// ── Section template catalogue ─────────────────────────────────────────────────
const TEMPLATE_GROUPS: Array<{
  type: EmailSection['type'];
  label: string;
  color: string;
  templates: Array<{ variant: string; label: string; overrides?: Partial<EmailSection> }>;
}> = [
  {
    type: 'header',
    label: 'Header',
    color: NM_TEAL,
    templates: [
      { variant: 'logo-centered', label: 'Logo Centered' },
      { variant: 'hero', label: 'Hero Banner' },
    ],
  },
  {
    type: 'content',
    label: 'Content',
    color: '#6366f1',
    templates: [
      { variant: 'text', label: 'Text Block' },
      { variant: 'bullets', label: 'Bullet List' },
      { variant: 'image-text', label: 'Image + Text' },
      { variant: 'callout', label: 'Callout Box' },
      { variant: 'stats', label: 'Stats Row' },
      { variant: 'feature-cards', label: 'Feature Cards' },
    ],
  },
  {
    type: 'cta',
    label: 'CTA',
    color: '#f59e0b',
    templates: [
      { variant: 'button-center', label: 'Centered Button' },
      { variant: 'banner', label: 'Banner CTA' },
    ],
  },
  {
    type: 'footer',
    label: 'Footer',
    color: '#64748b',
    templates: [
      { variant: 'simple', label: 'Simple Footer' },
      { variant: 'with-logo', label: 'Logo Footer' },
    ],
  },
];

// ── Editable text (contentEditable, syncs on blur) ────────────────────────────
interface EditableProps {
  html: string;
  onChange: (html: string) => void;
  tag?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
}

function Editable({ html, onChange, tag = 'div', style, className, placeholder }: EditableProps) {
  const elRef = useRef<HTMLElement>(null);
  const isEditingRef = useRef(false);
  const lastHtmlRef = useRef(html);

  // Sync incoming html to DOM when it changes from outside (not while user edits)
  useLayoutEffect(() => {
    if (!isEditingRef.current && elRef.current && html !== lastHtmlRef.current) {
      elRef.current.innerHTML = html;
      lastHtmlRef.current = html;
    }
  });

  // Set initial content on mount
  useEffect(() => {
    if (elRef.current) elRef.current.innerHTML = lastHtmlRef.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tag = tag as React.ElementType;
  return (
    <Tag
      ref={elRef}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onFocus={() => { isEditingRef.current = true; }}
      onBlur={() => {
        isEditingRef.current = false;
        if (elRef.current) {
          const newHtml = elRef.current.innerHTML;
          lastHtmlRef.current = newHtml;
          onChange(newHtml);
        }
      }}
      style={{ outline: 'none', cursor: 'text', ...style }}
      className={className}
    />
  );
}

// ── Editable image (hover → upload overlay) ────────────────────────────────────
function EditableImage({
  src,
  alt,
  onSrcChange,
  style,
  imgStyle,
}: {
  src: string;
  alt: string;
  onSrcChange: (src: string) => void;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onSrcChange(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const placeholder = !src;

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {placeholder ? (
        <div
          style={{
            width: '100%',
            minHeight: 120,
            backgroundColor: '#f1f5f9',
            border: '2px dashed #cbd5e1',
            borderRadius: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            cursor: 'pointer',
            ...imgStyle,
          }}
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon size={24} color="#94a3b8" />
          <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: INTER }}>Click to upload image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          style={{ display: 'block', maxWidth: '100%', ...imgStyle }}
        />
      )}
      {hovered && !placeholder && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: 4,
          }}
          onClick={() => inputRef.current?.click()}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#fff',
              color: NM_DARK,
              padding: '6px 12px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              fontFamily: INTER,
            }}
          >
            <ImageIcon size={13} />
            Change image
          </div>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
    </div>
  );
}

// ── Floating rich-text toolbar ────────────────────────────────────────────────
function RichToolbar({ visible }: { visible: boolean }) {
  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value ?? undefined);
  };

  const addLink = () => {
    const url = prompt('Link URL:', 'https://');
    if (url) exec('createLink', url);
  };

  if (!visible) return null;

  const btnStyle: React.CSSProperties = {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    border: '1px solid transparent',
    cursor: 'pointer',
    background: 'transparent',
    color: '#374151',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  };

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: '4px 6px',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        marginBottom: 10,
      }}
      onMouseDown={(e) => e.preventDefault()} // don't lose selection
    >
      <span style={{ fontSize: 11, color: '#9ca3af', marginRight: 4, fontFamily: INTER }}>Format:</span>
      <button style={{ ...btnStyle, fontFamily: 'serif' }} onClick={() => exec('bold')} title="Bold (Ctrl+B)">
        <Bold size={13} />
      </button>
      <button style={{ ...btnStyle, fontFamily: 'serif' }} onClick={() => exec('italic')} title="Italic (Ctrl+I)">
        <Italic size={13} />
      </button>
      <button style={btnStyle} onClick={() => exec('underline')} title="Underline (Ctrl+U)">
        <Underline size={13} />
      </button>
      <div style={{ width: 1, height: 18, backgroundColor: '#e5e7eb', margin: '0 4px' }} />
      <button style={btnStyle} onClick={addLink} title="Add link">
        <Link2 size={13} />
      </button>
      <div style={{ width: 1, height: 18, backgroundColor: '#e5e7eb', margin: '0 4px' }} />
      <label style={{ ...btnStyle, overflow: 'hidden' }} title="Text colour">
        <span style={{ fontSize: 11, fontWeight: 700 }}>A</span>
        <input
          type="color"
          defaultValue="#1a1a2e"
          style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
          onChange={(e) => exec('foreColor', e.target.value)}
        />
      </label>
      <div style={{ width: 1, height: 18, backgroundColor: '#e5e7eb', margin: '0 4px' }} />
      <span style={{ fontSize: 11, color: '#9ca3af', fontFamily: INTER }}>Click any text in the email to edit</span>
    </div>
  );
}

// ── Section toolbar (hover on each section) ───────────────────────────────────
function SectionToolbar({
  label,
  color,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  label: string;
  color: string;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: -1,
        right: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '0 0 0 6px',
        padding: '2px 6px',
        pointerEvents: 'all',
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color,
          fontFamily: INTER,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginRight: 4,
        }}
      >
        {label}
      </span>
      <span
        className="nm-drag-handle"
        title="Drag to reorder"
        style={{
          cursor: 'grab',
          color: '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          marginRight: 2,
          touchAction: 'none',
        }}
      >
        <GripVertical size={12} />
      </span>
      <button
        onClick={onMoveUp}
        disabled={isFirst}
        title="Move up"
        style={{
          width: 20,
          height: 20,
          border: 'none',
          background: 'transparent',
          cursor: isFirst ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          opacity: isFirst ? 0.3 : 1,
          color: '#6b7280',
        }}
      >
        <ChevronUp size={12} />
      </button>
      <button
        onClick={onMoveDown}
        disabled={isLast}
        title="Move down"
        style={{
          width: 20,
          height: 20,
          border: 'none',
          background: 'transparent',
          cursor: isLast ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          opacity: isLast ? 0.3 : 1,
          color: '#6b7280',
        }}
      >
        <ChevronDown size={12} />
      </button>
      <button
        onClick={onDelete}
        title="Remove section"
        style={{
          width: 20,
          height: 20,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          color: '#ef4444',
        }}
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

// ── Inline URL input (shown below buttons / images in editor) ─────────────────
function UrlInput({
  value,
  onChange,
  placeholder = 'https://',
  label = 'Link URL',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  label?: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        marginTop: 8,
        padding: '4px 8px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e5e7eb',
        borderRadius: 5,
      }}
    >
      <Link2 size={11} style={{ color: '#9ca3af', flexShrink: 0 }} />
      <span style={{ fontSize: 10, color: '#9ca3af', fontFamily: INTER, flexShrink: 0 }}>{label}:</span>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          padding: '1px 0',
          fontSize: 11,
          fontFamily: INTER,
          color: '#374151',
          outline: 'none',
          minWidth: 0,
        }}
      />
      {value && (
        <a href={value} target="_blank" rel="noreferrer" style={{ color: NM_TEAL, fontSize: 10, fontFamily: INTER, flexShrink: 0 }}>
          ↗
        </a>
      )}
    </div>
  );
}

// ── Hover-reveal wrapper — shows `reveal` only while hovered ──────────────────
function HoverReveal({
  children,
  reveal,
  style,
}: {
  children: React.ReactNode;
  reveal: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
    >
      {children}
      {hovered && reveal}
    </div>
  );
}

// ── Section renderers ──────────────────────────────────────────────────────────
function RenderSection({
  section,
  onChange,
}: {
  section: EmailSection;
  onChange: (patch: Partial<EmailSection>) => void;
}) {
  const { type, variant } = section;

  // ─ Header: Logo Centered ─
  if (type === 'header' && variant === 'logo-centered') {
    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={nmWaveSrc} alt="" aria-hidden="true"
          style={{ display: 'block', width: '100%', height: 120, objectFit: 'cover', objectPosition: 'top center' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <HoverReveal style={{ display: 'inline-block' }} reveal={<UrlInput value={section.logoLinkUrl} onChange={(v) => onChange({ logoLinkUrl: v })} label="Logo link" />}>
            <EditableImage
              src={section.logoSrc}
              alt="Nurtureme logo"
              onSrcChange={(src) => onChange({ logoSrc: src })}
              style={{ display: 'inline-block' }}
              imgStyle={{ maxWidth: 220, height: 'auto' }}
            />
          </HoverReveal>
        </div>
      </div>
    );
  }

  // ─ Header: Hero Banner ─
  if (type === 'header' && variant === 'hero') {
    return (
      <div
        style={{
          backgroundColor: NM_DARK,
          padding: '44px 48px 36px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Layered ambient glows */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(41,185,197,0.22) 0%, transparent 55%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 15% 80%, rgba(102,163,254,0.14) 0%, transparent 50%)', pointerEvents: 'none' }} />
        {/* Wave bottom edge */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, background: 'linear-gradient(to top, rgba(41,185,197,0.12), transparent)', pointerEvents: 'none' }} />
        <HoverReveal style={{ display: 'inline-block', marginBottom: 22 }} reveal={<UrlInput value={section.logoLinkUrl} onChange={(v) => onChange({ logoLinkUrl: v })} label="Logo link" />}>
          <EditableImage
            src={section.logoSrc}
            alt="Nurtureme logo"
            onSrcChange={(src) => onChange({ logoSrc: src })}
            imgStyle={{ maxWidth: 200, height: 'auto', filter: 'brightness(0) invert(1)' }}
          />
        </HoverReveal>
        {/* Teal accent line */}
        <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${NM_TEAL}, #66a3fe)`, borderRadius: 2, margin: '0 auto 18px' }} />
        <Editable
          tag="h1"
          html={section.heroTitle}
          onChange={(v) => onChange({ heroTitle: v })}
          style={{ fontFamily: CABIN, fontSize: 32, fontWeight: 700, color: '#ffffff', margin: '0 0 12px 0', lineHeight: 1.2 }}
          placeholder="Hero headline…"
        />
        <Editable
          tag="p"
          html={section.heroSubtitle}
          onChange={(v) => onChange({ heroSubtitle: v })}
          style={{ fontFamily: INTER, fontSize: 15, color: 'rgba(255,255,255,0.68)', margin: 0, lineHeight: 1.65, maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}
          placeholder="Subtitle…"
        />
      </div>
    );
  }

  // ─ Content: Text Block ─
  if (type === 'content' && variant === 'text') {
    return (
      <div style={{ padding: '30px 48px', backgroundColor: '#ffffff', borderLeft: `4px solid ${NM_TEAL}` }}>
        <Editable
          tag="h2"
          html={section.title}
          onChange={(v) => onChange({ title: v })}
          style={{ fontFamily: CABIN, fontSize: 21, fontWeight: 700, color: NM_DARK, margin: '0 0 10px 0', letterSpacing: '-0.3px' }}
          placeholder="Section heading…"
        />
        <Editable
          tag="p"
          html={section.body}
          onChange={(v) => onChange({ body: v })}
          style={{ fontFamily: INTER, fontSize: 15, lineHeight: 1.75, color: '#374151', margin: 0 }}
          placeholder="Paragraph text…"
        />
      </div>
    );
  }

  // ─ Content: Bullet List ─
  if (type === 'content' && variant === 'bullets') {
    return (
      <div style={{ padding: '30px 48px', backgroundColor: NM_LIGHT }}>
        <Editable
          tag="h2"
          html={section.title}
          onChange={(v) => onChange({ title: v })}
          style={{ fontFamily: CABIN, fontSize: 21, fontWeight: 700, color: NM_DARK, margin: '0 0 16px 0', letterSpacing: '-0.3px' }}
          placeholder="Section heading…"
        />
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {section.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              {/* Teal check circle */}
              <span style={{
                flexShrink: 0, marginTop: 2, width: 20, height: 20, borderRadius: '50%',
                backgroundColor: NM_TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: '#fff', fontWeight: 700, lineHeight: 1,
              }}>✓</span>
              <Editable
                tag="span"
                html={item}
                onChange={(v) => {
                  const newItems = [...section.items];
                  newItems[i] = v;
                  onChange({ items: newItems });
                }}
                style={{ flex: 1, fontFamily: INTER, fontSize: 15, lineHeight: 1.65, color: '#1e293b' }}
                placeholder={`Bullet ${i + 1}…`}
              />
              <button
                onClick={() => onChange({ items: section.items.filter((_, j) => j !== i) })}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#d1d5db', padding: 0, flexShrink: 0, marginTop: 4 }}
                title="Remove"
              >
                <Trash2 size={12} />
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => onChange({ items: [...section.items, 'New bullet point'] })}
          style={{ marginTop: 10, background: 'transparent', border: `1px dashed ${NM_TEAL}`, borderRadius: 4, color: NM_TEAL, fontSize: 12, fontFamily: INTER, padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <Plus size={11} /> Add item
        </button>
      </div>
    );
  }

  // ─ Content: Image + Text ─
  if (type === 'content' && variant === 'image-text') {
    const imgLeft = section.imagePosition === 'left';
    return (
      <div
        style={{
          padding: '28px 48px',
          backgroundColor: '#ffffff',
          display: 'flex',
          gap: 24,
          alignItems: 'flex-start',
          flexDirection: imgLeft ? 'row' : 'row-reverse',
        }}
      >
        <HoverReveal style={{ flexShrink: 0, width: '40%' }} reveal={<UrlInput value={section.imageLinkUrl} onChange={(v) => onChange({ imageLinkUrl: v })} label="Image link" />}>
          <EditableImage
            src={section.imageSrc}
            alt={section.imageAlt}
            onSrcChange={(src) => onChange({ imageSrc: src })}
            imgStyle={{ width: '100%', borderRadius: 6 }}
          />
        </HoverReveal>
        <div style={{ flex: 1 }}>
          <Editable
            tag="h2"
            html={section.title}
            onChange={(v) => onChange({ title: v })}
            style={{ fontFamily: CABIN, fontSize: 18, fontWeight: 700, color: NM_TEAL, margin: '0 0 10px 0' }}
            placeholder="Section heading…"
          />
          <Editable
            tag="p"
            html={section.body}
            onChange={(v) => onChange({ body: v })}
            style={{ fontFamily: INTER, fontSize: 14, lineHeight: 1.7, color: NM_DARK, margin: 0 }}
            placeholder="Description text…"
          />
          <button
            onClick={() => onChange({ imagePosition: imgLeft ? 'right' : 'left' })}
            style={{
              marginTop: 8,
              background: 'transparent',
              border: '1px solid #e5e7eb',
              borderRadius: 4,
              color: '#6b7280',
              fontSize: 11,
              fontFamily: INTER,
              padding: '3px 8px',
              cursor: 'pointer',
            }}
          >
            Flip layout
          </button>
        </div>
      </div>
    );
  }

  // ─ Content: Callout Box ─
  if (type === 'content' && variant === 'callout') {
    return (
      <div style={{ padding: '16px 48px', backgroundColor: '#ffffff' }}>
        <div style={{
          background: `linear-gradient(135deg, ${NM_TEAL}18 0%, #e0f2fe 100%)`,
          border: `1px solid ${NM_TEAL}44`,
          borderRadius: 10,
          padding: '18px 22px 18px 20px',
          display: 'flex',
          gap: 14,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>💡</span>
          <Editable
            tag="p"
            html={section.calloutText}
            onChange={(v) => onChange({ calloutText: v })}
            style={{ fontFamily: INTER, fontSize: 14.5, lineHeight: 1.65, color: NM_DARK, margin: 0, fontWeight: 500 }}
            placeholder="Callout / highlighted note…"
          />
        </div>
      </div>
    );
  }

  // ─ Content: Stats Row ─
  if (type === 'content' && variant === 'stats') {
    return (
      <div style={{ backgroundColor: NM_DARK, padding: '32px 48px' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {section.statsItems.map((stat, i) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < section.statsItems.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
              padding: '0 12px',
            }}>
              <Editable
                tag="div"
                html={stat.value}
                onChange={(v) => {
                  const next = section.statsItems.map((s, j) => j === i ? { ...s, value: v } : s);
                  onChange({ statsItems: next });
                }}
                style={{ fontFamily: CABIN, fontSize: 40, fontWeight: 800, color: NM_TEAL, lineHeight: 1 }}
                placeholder="00%"
              />
              <Editable
                tag="div"
                html={stat.label}
                onChange={(v) => {
                  const next = section.statsItems.map((s, j) => j === i ? { ...s, label: v } : s);
                  onChange({ statsItems: next });
                }}
                style={{ fontFamily: INTER, fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}
                placeholder="Metric label…"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─ Content: Feature Cards ─
  if (type === 'content' && variant === 'feature-cards') {
    return (
      <div style={{ padding: '30px 32px', backgroundColor: '#ffffff' }}>
        <Editable
          tag="h2"
          html={section.title}
          onChange={(v) => onChange({ title: v })}
          style={{ fontFamily: CABIN, fontSize: 21, fontWeight: 700, color: NM_DARK, margin: '0 0 20px 0', textAlign: 'center', letterSpacing: '-0.3px' }}
          placeholder="Section heading…"
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {section.cardItems.map((card, i) => (
            <div key={i} style={{ backgroundColor: NM_LIGHT, borderRadius: 12, padding: '18px 16px', border: `1px solid ${NM_TEAL}33`, position: 'relative' }}>
              <Editable
                tag="div"
                html={card.icon}
                onChange={(v) => {
                  const next = section.cardItems.map((c, j) => j === i ? { ...c, icon: v } : c);
                  onChange({ cardItems: next });
                }}
                style={{ fontSize: 26, marginBottom: 10, lineHeight: 1 }}
                placeholder="🤖"
              />
              <Editable
                tag="div"
                html={card.title}
                onChange={(v) => {
                  const next = section.cardItems.map((c, j) => j === i ? { ...c, title: v } : c);
                  onChange({ cardItems: next });
                }}
                style={{ fontFamily: CABIN, fontSize: 14, fontWeight: 700, color: NM_DARK, marginBottom: 6 }}
                placeholder="Card title…"
              />
              <Editable
                tag="div"
                html={card.body}
                onChange={(v) => {
                  const next = section.cardItems.map((c, j) => j === i ? { ...c, body: v } : c);
                  onChange({ cardItems: next });
                }}
                style={{ fontFamily: INTER, fontSize: 12.5, color: '#6b7280', lineHeight: 1.55 }}
                placeholder="Card description…"
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center' }}>
          <button
            onClick={() => onChange({ cardItems: [...section.cardItems, { icon: '⚡', title: 'New Feature', body: 'Describe this feature.' }] })}
            style={{ background: 'transparent', border: `1px dashed ${NM_TEAL}`, borderRadius: 4, color: NM_TEAL, fontSize: 11, fontFamily: INTER, padding: '3px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}
          >
            <Plus size={10} /> Add card
          </button>
          {section.cardItems.length > 1 && (
            <button
              onClick={() => onChange({ cardItems: section.cardItems.slice(0, -1) })}
              style={{ background: 'transparent', border: '1px dashed #e5e7eb', borderRadius: 4, color: '#9ca3af', fontSize: 11, fontFamily: INTER, padding: '3px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}
            >
              <Trash2 size={10} /> Remove last
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─ CTA: Button Center ─
  if (type === 'cta' && variant === 'button-center') {
    return (
      <div style={{ padding: '36px 48px', background: `linear-gradient(160deg, ${NM_LIGHT} 0%, #e0f2fe 100%)`, textAlign: 'center' }}>
        <Editable
          tag="h2"
          html={section.ctaHeading}
          onChange={(v) => onChange({ ctaHeading: v })}
          style={{ fontFamily: CABIN, fontSize: 24, fontWeight: 700, color: NM_DARK, margin: '0 0 10px 0', letterSpacing: '-0.3px' }}
          placeholder="CTA heading…"
        />
        <Editable
          tag="p"
          html={section.ctaBody}
          onChange={(v) => onChange({ ctaBody: v })}
          style={{ fontFamily: INTER, fontSize: 15, lineHeight: 1.65, color: '#4b5563', margin: '0 0 24px 0' }}
          placeholder="Supporting text…"
        />
        <HoverReveal style={{ display: 'inline-block' }} reveal={<UrlInput value={section.buttonUrl} onChange={(v) => onChange({ buttonUrl: v })} label="Button URL" />}>
          <Editable
            tag="a"
            html={section.buttonText}
            onChange={(v) => onChange({ buttonText: v })}
            style={{
              display: 'inline-block',
              background: `linear-gradient(135deg, ${NM_TEAL} 0%, ${NM_TEAL_DARK} 100%)`,
              color: '#ffffff',
              fontFamily: CABIN,
              fontSize: 15,
              fontWeight: 700,
              padding: '13px 36px',
              borderRadius: 8,
              textDecoration: 'none',
              boxShadow: `0 4px 18px ${NM_TEAL}55`,
              letterSpacing: '0.2px',
            }}
            placeholder="Button text…"
          />
        </HoverReveal>
      </div>
    );
  }

  // ─ CTA: Banner ─
  if (type === 'cta' && variant === 'banner') {
    return (
      <div style={{ padding: '40px 48px', background: `linear-gradient(135deg, ${NM_DARK} 0%, #0d2240 100%)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Glowing orb */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${NM_TEAL}30 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(102,163,254,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Editable
          tag="h2"
          html={section.ctaHeading}
          onChange={(v) => onChange({ ctaHeading: v })}
          style={{ fontFamily: CABIN, fontSize: 26, fontWeight: 700, color: '#ffffff', margin: '0 0 10px 0', letterSpacing: '-0.3px', position: 'relative' }}
          placeholder="Banner heading…"
        />
        <Editable
          tag="p"
          html={section.ctaBody}
          onChange={(v) => onChange({ ctaBody: v })}
          style={{ fontFamily: INTER, fontSize: 14.5, color: 'rgba(255,255,255,0.65)', margin: '0 0 24px 0', lineHeight: 1.6, position: 'relative' }}
          placeholder="Supporting text…"
        />
        <HoverReveal style={{ display: 'inline-block', position: 'relative' }} reveal={<UrlInput value={section.buttonUrl} onChange={(v) => onChange({ buttonUrl: v })} label="Button URL" />}>
          <Editable
            tag="span"
            html={section.buttonText}
            onChange={(v) => onChange({ buttonText: v })}
            style={{
              display: 'inline-block',
              background: `linear-gradient(135deg, ${NM_TEAL} 0%, #56b4c8 100%)`,
              color: '#ffffff',
              fontFamily: CABIN,
              fontSize: 14,
              fontWeight: 700,
              padding: '12px 32px',
              borderRadius: 8,
              letterSpacing: '0.2px',
            }}
            placeholder="Button text…"
          />
        </HoverReveal>
      </div>
    );
  }

  // ─ Footer: Simple ─
  if (type === 'footer' && variant === 'simple') {
    return (
      <div style={{ backgroundColor: NM_DARK, padding: '20px 40px', textAlign: 'center' }}>
        {/* Teal top accent line */}
        <div style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${NM_TEAL}, #66a3fe)`, borderRadius: 2, margin: '0 auto 14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Editable
            tag="span"
            html={section.copyright}
            onChange={(v) => onChange({ copyright: v })}
            style={{ fontFamily: INTER, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}
          />
          {section.showUnsubscribe && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span style={{ fontFamily: INTER, fontSize: 12, color: NM_TEAL, textDecoration: 'underline', cursor: 'pointer' }}>
                Unsubscribe
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─ Footer: With Logo ─
  if (type === 'footer' && variant === 'with-logo') {
    return (
      <div style={{ backgroundColor: NM_DARK, padding: '28px 40px', textAlign: 'center' }}>
        <EditableImage
          src={section.footerLogoSrc}
          alt="Nurtureme"
          onSrcChange={(src) => onChange({ footerLogoSrc: src })}
          style={{ display: 'inline-block', marginBottom: 14 }}
          imgStyle={{ maxWidth: 130, height: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }}
        />
        <div style={{ width: 32, height: 2, background: `linear-gradient(90deg, ${NM_TEAL}, #66a3fe)`, borderRadius: 2, margin: '0 auto 14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Editable
            tag="span"
            html={section.copyright}
            onChange={(v) => onChange({ copyright: v })}
            style={{ fontFamily: INTER, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}
          />
          {section.showUnsubscribe && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span style={{ fontFamily: INTER, fontSize: 12, color: NM_TEAL, textDecoration: 'underline', cursor: 'pointer' }}>
                Unsubscribe
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, color: '#9ca3af', fontFamily: INTER, fontSize: 13, textAlign: 'center' }}>
      Unknown section type: {type}/{variant}
    </div>
  );
}

// ── Mini thumbnail previews for the section library ───────────────────────────
function Thumbnail({ type, variant }: { type: string; variant: string }) {
  const key = `${type}/${variant}`;
  const w = 96, h = 58;
  const bar = (y: number, width: number, color: string, h2 = 5) => (
    <rect key={`${y}-${width}`} x={(96 - width) / 2} y={y} width={width} height={h2} rx={2} fill={color} />
  );
  const dot = (cx: number, cy: number, r: number, color: string) => (
    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={color} />
  );

  const renders: Record<string, React.ReactNode> = {
    'header/logo-centered': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c1dff7" />
            <stop offset="100%" stopColor="#e8f4ff" />
          </linearGradient>
        </defs>
        <rect width={w} height={h} rx={3} fill="url(#wg)" />
        {/* Wave curve */}
        <path d={`M0 ${h * 0.55}C${w * 0.3} ${h * 0.35} ${w * 0.7} ${h * 0.6} ${w} ${h * 0.45}L${w} 0L0 0Z`} fill="rgba(255,255,255,0.5)" />
        <rect x={20} y={20} width={56} height={14} rx={3} fill="rgba(255,255,255,0.85)" />
      </svg>
    ),
    'header/hero': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill={NM_DARK} />
        <circle cx={w * 0.8} cy={h * 0.25} r={24} fill={`${NM_TEAL}22`} />
        {bar(10, 40, 'rgba(255,255,255,0.9)', 6)}
        <rect x={38} y={21} width={20} height={2} rx={1} fill={NM_TEAL} />
        {bar(28, 52, 'rgba(255,255,255,0.45)', 3)}
        {bar(35, 42, 'rgba(255,255,255,0.3)', 3)}
      </svg>
    ),
    'content/text': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill="white" />
        <rect x={0} y={0} width={3} height={h} rx={0} fill={NM_TEAL} />
        {bar(12, 52, NM_DARK, 6)}
        {bar(23, 76, '#d1d5db', 3)}
        {bar(30, 70, '#d1d5db', 3)}
        {bar(37, 60, '#d1d5db', 3)}
        {bar(44, 40, '#d1d5db', 3)}
      </svg>
    ),
    'content/bullets': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill={NM_LIGHT} />
        {bar(8, 52, NM_DARK, 6)}
        {[20, 30, 40].map((y) => (
          <g key={y}>
            <circle cx={14} cy={y + 3} r={4} fill={NM_TEAL} />
            <rect x={22} y={y} width={55} height={4} rx={2} fill="#c7e9ed" />
          </g>
        ))}
      </svg>
    ),
    'content/image-text': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill="white" />
        <rect x={6} y={8} width={36} height={42} rx={3} fill="#e2e8f0" />
        <rect x={48} y={8} width={4} height={0} />
        {bar(12, 32, NM_TEAL, 5)}
        {[22, 30, 38].map((y) => <rect key={y} x={48} y={y} width={38} height={3} rx={2} fill="#e5e7eb" />)}
      </svg>
    ),
    'content/callout': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill="white" />
        <rect x={8} y={10} width={80} height={38} rx={6} fill={`${NM_TEAL}18`} stroke={`${NM_TEAL}55`} strokeWidth={1} />
        <circle cx={18} cy={27} r={5} fill={NM_TEAL} opacity={0.5} />
        {[20, 28, 36].map((y) => <rect key={y} x={28} y={y} width={y === 36 ? 36 : 50} height={3} rx={2} fill="#a5d6df" />)}
      </svg>
    ),
    'content/stats': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill={NM_DARK} />
        {[8, 40, 72].map((x, i) => (
          <g key={i}>
            <rect x={x} y={10} width={16} height={12} rx={2} fill={NM_TEAL} opacity={0.85} />
            <rect x={x + 1} y={26} width={14} height={3} rx={1} fill="rgba(255,255,255,0.35)" />
          </g>
        ))}
        <rect x={32} y={8} width={1} height={26} fill="rgba(255,255,255,0.1)" />
        <rect x={64} y={8} width={1} height={26} fill="rgba(255,255,255,0.1)" />
      </svg>
    ),
    'content/feature-cards': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill="white" />
        {bar(8, 48, NM_DARK, 5)}
        {[6, 36, 66].map((x) => (
          <g key={x}>
            <rect x={x} y={20} width={22} height={34} rx={4} fill={NM_LIGHT} stroke={`${NM_TEAL}44`} strokeWidth={1} />
            <circle cx={x + 7} cy={27} r={4} fill={NM_TEAL} opacity={0.4} />
            <rect x={x + 3} y={34} width={16} height={3} rx={1} fill="#c7e9ed" />
            <rect x={x + 3} y={40} width={13} height={2} rx={1} fill="#e5e7eb" />
          </g>
        ))}
      </svg>
    ),
    'cta/button-center': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <defs><linearGradient id="ctag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={NM_LIGHT} /><stop offset="100%" stopColor="#e0f2fe" /></linearGradient></defs>
        <rect width={w} height={h} rx={3} fill="url(#ctag)" />
        {bar(10, 58, NM_DARK, 6)}
        {bar(21, 68, '#9ca3af', 3)}
        {bar(28, 50, '#9ca3af', 3)}
        <rect x={24} y={37} width={48} height={14} rx={5} fill={NM_TEAL} />
        <rect x={34} y={42} width={28} height={4} rx={2} fill="white" />
      </svg>
    ),
    'cta/banner': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill={NM_DARK} />
        <circle cx={w * 0.85} cy={h * 0.22} r={16} fill={`${NM_TEAL}22`} />
        {bar(10, 60, 'rgba(255,255,255,0.9)', 6)}
        {bar(21, 68, 'rgba(255,255,255,0.35)', 3)}
        <rect x={26} y={31} width={44} height={14} rx={5} fill={NM_TEAL} />
        <rect x={36} y={36} width={24} height={4} rx={2} fill="white" />
      </svg>
    ),
    'footer/simple': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill={NM_DARK} />
        <rect x={38} y={14} width={20} height={2} rx={1} fill={NM_TEAL} />
        {bar(22, 56, 'rgba(255,255,255,0.3)', 3)}
        {bar(30, 40, 'rgba(255,255,255,0.2)', 3)}
      </svg>
    ),
    'footer/with-logo': (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <rect width={w} height={h} rx={3} fill={NM_DARK} />
        <rect x={28} y={10} width={40} height={10} rx={2} fill="rgba(255,255,255,0.6)" />
        <rect x={38} y={26} width={20} height={2} rx={1} fill={NM_TEAL} />
        {bar(33, 40, 'rgba(255,255,255,0.3)', 3)}
        {bar(41, 30, 'rgba(255,255,255,0.2)', 3)}
      </svg>
    ),
  };

  return (
    <div style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      {renders[key] ?? (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <rect width={w} height={h} rx={3} fill="#f8fafc" />
        </svg>
      )}
    </div>
  );
}

// ── HTML generator (email-safe, responsive) ────────────────────────────────────
function generateSectionsRows(sections: EmailSection[]): string {
  return sections
    .map((s) => {
      if (s.type === 'header' && s.variant === 'logo-centered') {
        const img = `<img src="${s.logoSrc}" width="220" alt="Nurtureme" style="display:block;max-width:220px;height:auto;border:0;" />`;
        const logoInner = s.logoLinkUrl ? `<a href="${s.logoLinkUrl}" target="_blank" style="display:inline-block;border:0;">${img}</a>` : img;
        return `
  <!-- Header: Logo Centered -->
  <tr><td align="center" background="${nmWaveSrc}" style="background-image:url(${nmWaveSrc});background-size:cover;background-position:top center;background-color:#dce8f5;height:120px;padding:20px 40px;vertical-align:middle;border-radius:8px 8px 0 0;">
    ${logoInner}
  </td></tr>`;
      }
      if (s.type === 'header' && s.variant === 'hero') {
        const img = `<img src="${s.logoSrc}" width="200" alt="Nurtureme" style="display:block;max-width:200px;height:auto;border:0;margin:0 auto 22px;filter:brightness(0) invert(1);" />`;
        return `
  <!-- Header: Hero -->
  <tr><td align="center" bgcolor="${NM_DARK}" style="padding:44px 48px 36px;border-radius:8px 8px 0 0;">
    ${s.logoLinkUrl ? `<a href="${s.logoLinkUrl}" target="_blank" style="display:inline-block;border:0;">${img}</a>` : img}
    <div style="width:48px;height:3px;background:linear-gradient(90deg,${NM_TEAL},#66a3fe);border-radius:2px;margin:0 auto 18px;line-height:0;font-size:0;">&nbsp;</div>
    <h1 style="margin:0 0 12px 0;font-family:'Cabin',Arial,sans-serif;font-size:32px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-0.5px;">${s.heroTitle}</h1>
    <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:15px;color:rgba(255,255,255,0.68);line-height:1.65;max-width:440px;">${s.heroSubtitle}</p>
  </td></tr>`;
      }
      if (s.type === 'content' && s.variant === 'text') {
        return `
  <!-- Content: Text -->
  <tr><td bgcolor="#ffffff" style="padding:30px 44px 30px 40px;border-left:4px solid ${NM_TEAL};">
    <h2 style="margin:0 0 10px 0;font-family:'Cabin',Arial,sans-serif;font-size:21px;font-weight:700;color:${NM_DARK};letter-spacing:-0.3px;">${s.title}</h2>
    <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.75;color:#374151;">${s.body}</p>
  </td></tr>`;
      }
      if (s.type === 'content' && s.variant === 'bullets') {
        const items = s.items
          .map(
            (item) =>
              `<tr><td style="padding:5px 0;font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.65;color:#1e293b;vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="width:22px;vertical-align:top;padding-top:1px;"><div style="width:20px;height:20px;border-radius:50%;background-color:${NM_TEAL};text-align:center;line-height:20px;font-size:11px;font-weight:700;color:#ffffff;">&#10003;</div></td><td style="padding-left:10px;">${item}</td></tr></table></td></tr>`,
          )
          .join('');
        return `
  <!-- Content: Bullets -->
  <tr><td bgcolor="${NM_LIGHT}" style="padding:30px 48px;">
    <h2 style="margin:0 0 16px 0;font-family:'Cabin',Arial,sans-serif;font-size:21px;font-weight:700;color:${NM_DARK};letter-spacing:-0.3px;">${s.title}</h2>
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tbody>${items}</tbody></table>
  </td></tr>`;
      }
      if (s.type === 'content' && s.variant === 'image-text') {
        const imgTag = s.imageSrc
          ? `<img src="${s.imageSrc}" alt="${s.imageAlt}" style="display:block;width:100%;height:auto;border-radius:6px;" />`
          : `<div style="background:#f1f5f9;border:2px dashed #cbd5e1;height:120px;border-radius:6px;"></div>`;
        const imgContent = s.imageLinkUrl
          ? `<a href="${s.imageLinkUrl}" target="_blank" style="display:block;border:0;">${imgTag}</a>`
          : imgTag;
        const imgCell = `<td style="width:40%;padding-right:${s.imagePosition === 'left' ? '20px' : '0'};padding-left:${s.imagePosition === 'right' ? '20px' : '0'};vertical-align:top;">
      ${imgContent}
    </td>`;
        const textCell = `<td style="vertical-align:top;">
      <h2 style="margin:0 0 10px 0;font-family:'Cabin',Arial,sans-serif;font-size:18px;font-weight:700;color:${NM_TEAL};">${s.title}</h2>
      <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:14px;line-height:1.7;color:${NM_DARK};">${s.body}</p>
    </td>`;
        return `
  <!-- Content: Image + Text -->
  <tr><td bgcolor="#ffffff" style="padding:28px 48px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    ${s.imagePosition === 'left' ? imgCell + textCell : textCell + imgCell}
    </tr></table>
  </td></tr>`;
      }
      if (s.type === 'content' && s.variant === 'callout') {
        return `
  <!-- Content: Callout -->
  <tr><td bgcolor="#ffffff" style="padding:16px 48px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="padding:18px 20px;background:linear-gradient(135deg,${NM_TEAL}18 0%,#e0f2fe 100%);border:1px solid ${NM_TEAL}44;border-radius:10px;">
        <table cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="width:28px;vertical-align:top;font-size:20px;padding-top:2px;">&#128161;</td>
          <td style="padding-left:12px;"><p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:14.5px;line-height:1.65;color:${NM_DARK};font-weight:500;">${s.calloutText}</p></td>
        </tr></table>
      </td>
    </tr></table>
  </td></tr>`;
      }
      if (s.type === 'content' && s.variant === 'stats') {
        const statCells = s.statsItems
          .map((stat, i) =>
            `<td align="center" style="padding:0 12px;${i < s.statsItems.length - 1 ? 'border-right:1px solid rgba(255,255,255,0.12);' : ''}">
              <div style="font-family:'Cabin',Arial,sans-serif;font-size:40px;font-weight:800;color:${NM_TEAL};line-height:1;">${stat.value}</div>
              <div style="font-family:'Inter',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.65);margin-top:6px;">${stat.label}</div>
            </td>`,
          )
          .join('');
        return `
  <!-- Content: Stats -->
  <tr><td bgcolor="${NM_DARK}" style="padding:32px 48px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${statCells}</tr></table>
  </td></tr>`;
      }
      if (s.type === 'content' && s.variant === 'feature-cards') {
        const cols = s.cardItems.length;
        const colWidth = Math.floor(100 / cols);
        const cards = s.cardItems
          .map(
            (card) =>
              `<td width="${colWidth}%" style="padding:0 7px;vertical-align:top;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                  <td style="padding:18px 16px;background-color:${NM_LIGHT};border-radius:12px;border:1px solid ${NM_TEAL}33;vertical-align:top;">
                    <div style="font-size:26px;line-height:1;margin-bottom:10px;">${card.icon}</div>
                    <div style="font-family:'Cabin',Arial,sans-serif;font-size:14px;font-weight:700;color:${NM_DARK};margin-bottom:6px;">${card.title}</div>
                    <div style="font-family:'Inter',Arial,sans-serif;font-size:12.5px;color:#6b7280;line-height:1.55;">${card.body}</div>
                  </td>
                </tr></table>
              </td>`,
          )
          .join('');
        return `
  <!-- Content: Feature Cards -->
  <tr><td bgcolor="#ffffff" style="padding:30px 25px;">
    <h2 style="margin:0 0 20px 0;font-family:'Cabin',Arial,sans-serif;font-size:21px;font-weight:700;color:${NM_DARK};text-align:center;letter-spacing:-0.3px;">${s.title}</h2>
    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${cards}</tr></table>
  </td></tr>`;
      }
      if (s.type === 'cta' && s.variant === 'button-center') {
        return `
  <!-- CTA: Button Center -->
  <tr><td align="center" style="padding:36px 48px;background:linear-gradient(160deg,${NM_LIGHT} 0%,#e0f2fe 100%);">
    <h2 style="margin:0 0 10px 0;font-family:'Cabin',Arial,sans-serif;font-size:24px;font-weight:700;color:${NM_DARK};letter-spacing:-0.3px;">${s.ctaHeading}</h2>
    <p style="margin:0 0 24px 0;font-family:'Inter',Arial,sans-serif;font-size:15px;line-height:1.65;color:#4b5563;">${s.ctaBody}</p>
    <a href="${s.buttonUrl}" style="display:inline-block;background-color:${NM_TEAL};color:#ffffff;font-family:'Cabin',Arial,sans-serif;font-size:15px;font-weight:700;padding:13px 36px;border-radius:8px;text-decoration:none;letter-spacing:0.2px;">${s.buttonText}</a>
  </td></tr>`;
      }
      if (s.type === 'cta' && s.variant === 'banner') {
        return `
  <!-- CTA: Banner -->
  <tr><td bgcolor="${NM_DARK}" align="center" style="padding:40px 48px;">
    <h2 style="margin:0 0 10px 0;font-family:'Cabin',Arial,sans-serif;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">${s.ctaHeading}</h2>
    <p style="margin:0 0 24px 0;font-family:'Inter',Arial,sans-serif;font-size:14.5px;line-height:1.6;color:rgba(255,255,255,0.65);">${s.ctaBody}</p>
    <a href="${s.buttonUrl}" style="display:inline-block;background-color:${NM_TEAL};color:#ffffff;font-family:'Cabin',Arial,sans-serif;font-size:14px;font-weight:700;padding:12px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.2px;">${s.buttonText}</a>
  </td></tr>`;
      }
      if (s.type === 'footer') {
        const logoHtml =
          s.variant === 'with-logo'
            ? `<div style="margin-bottom:14px;"><img src="${s.footerLogoSrc}" width="130" alt="Nurtureme" style="display:block;max-width:130px;height:auto;border:0;margin:0 auto;filter:brightness(0) invert(1);opacity:0.85;" /></div>`
            : '';
        return `
  <!-- Footer -->
  <tr><td align="center" bgcolor="${NM_DARK}" style="padding:${s.variant === 'with-logo' ? '28px' : '20px'} 40px;">
    ${logoHtml}
    <div style="width:32px;height:2px;background-color:${NM_TEAL};border-radius:2px;margin:0 auto 14px;line-height:0;font-size:0;">&nbsp;</div>
    <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:12px;line-height:1.5;color:rgba(255,255,255,0.4);">
      ${s.copyright}${s.showUnsubscribe ? ` &nbsp;&middot;&nbsp; <a href="#" style="color:${NM_TEAL};text-decoration:none;">Unsubscribe</a>` : ''}
    </p>
  </td></tr>`;
      }
      return '';
    })
    .join('');
}

// Paste-ready: just the 600 px content table, no wrapper, no <head>.
// This is the only thing that goes on the clipboard for "Paste-Ready" copy.
function generatePasteTable(sections: EmailSection[]): string {
  const rows = generateSectionsRows(sections)
    .replace(/<!--[\s\S]*?-->/g, '') // strip HTML comments — Gmail can split on them
    .trim();
  return `<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;"><tbody>${rows}</tbody></table>`;
}

function generateEmailHTML(sections: EmailSection[]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nurtureme Email</title>
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;600;700&amp;family=Inter:wght@400;500&amp;display=swap" rel="stylesheet">
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f4f7;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f7;">
    <tr><td align="center" style="padding:40px 20px;">
      ${generatePasteTable(sections)}
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Main component ─────────────────────────────────────────────────────────────
export function NurtureEmail() {
  const [sections, setSections] = useState<EmailSection[]>(DEFAULT_SECTIONS);
  const [richToolbarVisible, setRichToolbarVisible] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    header: true,
    content: true,
    cta: true,
    footer: true,
  });
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [libraryDrag, setLibraryDrag] = useState<{ type: EmailSection['type']; variant: string } | null>(null);
  const [dragOverAppend, setDragOverAppend] = useState(false);

  type CopyFormat = 'rich' | 'html' | 'text';
  const [copiedFormat, setCopiedFormat] = useState<CopyFormat | null>(null);

  const markCopied = (format: CopyFormat, label: string) => {
    setCopiedFormat(format);
    toast.success(label);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const writeText = (text: string, onSuccess: () => void) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        try { document.execCommand('copy'); onSuccess(); } catch { toast.error('Copy failed.'); }
        document.body.removeChild(ta);
      });
    }
  };

  const copyAsRich = () => {
    const html = generatePasteTable(sections);

    // Use position:fixed so the element stays in the viewport — Chrome blocks
    // execCommand('copy') on off-screen (left:-9999px) elements, causing it to
    // silently return false and fall through to ClipboardItem which double-pastes.
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    el.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0.001;overflow:hidden;pointer-events:none;';
    el.innerHTML = html;
    document.body.appendChild(el);

    let ok = false;
    try {
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
        ok = document.execCommand('copy');
        sel.removeAllRanges();
      }
    } finally {
      document.body.removeChild(el);
    }

    if (ok) {
      markCopied('rich', 'Copied! Paste directly into Gmail / Outlook.');
      return;
    }

    // Fallback: use ClipboardItem with text/html only.
    // Do NOT include text/plain — an empty plain-text entry causes Gmail to
    // paste the HTML content a second time, resulting in a duplicate.
    if (navigator.clipboard?.write) {
      navigator.clipboard
        .write([new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
        })])
        .then(() => markCopied('rich', 'Copied! Paste directly into Gmail / Outlook.'))
        .catch(() => writeText(html, () => markCopied('html', 'Rich text unavailable — HTML copied.')));
    } else {
      writeText(html, () => markCopied('html', 'Rich text unavailable — HTML copied.'));
    }
  };

  const copyAsHTML = () =>
    writeText(generateEmailHTML(sections), () => markCopied('html', 'Responsive HTML template copied.'));

  const copyAsText = () => {
    const lines: string[] = [];
    sections.forEach((s) => {
      if (s.type === 'content' && s.variant === 'bullets') {
        const stripped = (h: string) => h.replace(/<[^>]+>/g, '');
        lines.push(stripped(s.title));
        s.items.forEach((i) => lines.push(`  • ${stripped(i)}`));
      } else if (s.type === 'content') {
        const stripped = (h: string) => h.replace(/<[^>]+>/g, '');
        if (s.title) lines.push(stripped(s.title));
        if (s.body) lines.push(stripped(s.body));
        if (s.calloutText) lines.push(stripped(s.calloutText));
      } else if (s.type === 'cta') {
        const stripped = (h: string) => h.replace(/<[^>]+>/g, '');
        if (s.ctaHeading) lines.push(stripped(s.ctaHeading));
        if (s.ctaBody) lines.push(stripped(s.ctaBody));
        lines.push(`[ ${stripped(s.buttonText)} ] ${s.buttonUrl}`);
      } else if (s.type === 'footer') {
        lines.push(s.copyright.replace(/<[^>]+>/g, ''));
      }
      lines.push('');
    });
    writeText(lines.join('\n'), () => markCopied('text', 'Plain text copied.'));
  };

  // ── Section mutations ─────────────────────────────────────────────────────
  const patchSection = useCallback((id: string, patch: Partial<EmailSection>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }, []);

  const moveSection = (id: string, dir: -1 | 1) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy;
    });
  };

  const removeSection = (id: string) => setSections((prev) => prev.filter((s) => s.id !== id));

  const reorderSections = (from: number, to: number) => {
    if (from === to) return;
    setSections((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  };

  const insertSectionAt = (type: EmailSection['type'], variant: string, insertIdx: number) => {
    setSections((prev) => {
      const newSection = makeSection(type, variant);
      const copy = [...prev];
      copy.splice(insertIdx, 0, newSection);
      return copy;
    });
  };

  const clearDragState = () => {
    setDraggingIdx(null);
    setDragOverIdx(null);
    setLibraryDrag(null);
    setDragOverAppend(false);
  };

  const addSection = (type: EmailSection['type'], variant: string) => {
    setSections((prev) => [...prev, makeSection(type, variant)]);
  };

  const toggleGroup = (type: string) =>
    setOpenGroups((prev) => ({ ...prev, [type]: !prev[type] }));

  // Show toolbar when any contentEditable is focused
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      if ((e.target as HTMLElement)?.contentEditable === 'true') {
        setRichToolbarVisible(true);
      }
    };
    const onBlur = (e: FocusEvent) => {
      if ((e.target as HTMLElement)?.contentEditable === 'true') {
        setTimeout(() => setRichToolbarVisible(false), 150);
      }
    };
    document.addEventListener('focusin', onFocus);
    document.addEventListener('focusout', onBlur);
    return () => {
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('focusout', onBlur);
    };
  }, []);

  const typeColorMap: Record<string, string> = {
    header: NM_TEAL,
    content: '#6366f1',
    cta: '#f59e0b',
    footer: '#64748b',
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', gap: 0, minHeight: '80vh', background: '#f8fafc', borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0' }}>

      {/* ── LEFT: Section Library ──────────────────────────────────────────── */}
      <div
        style={{
          width: 240,
          flexShrink: 0,
          borderRight: '1px solid #e2e8f0',
          backgroundColor: '#fff',
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #f1f5f9' }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: INTER }}>
            Section Library
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#cbd5e1', fontFamily: INTER }}>
            Click or drag into canvas
          </p>
        </div>

        {TEMPLATE_GROUPS.map((group) => (
          <div key={group.type}>
            {/* Group header */}
            <button
              onClick={() => toggleGroup(group.type)}
              style={{
                width: '100%',
                padding: '8px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: group.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', fontFamily: INTER, flex: 1 }}>
                {group.label}
              </span>
              {openGroups[group.type] ? <ChevronUp size={12} color="#9ca3af" /> : <ChevronDown size={12} color="#9ca3af" />}
            </button>

            {/* Templates */}
            {openGroups[group.type] && (
              <div style={{ padding: '8px 12px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {group.templates.map((tpl) => (
                  <button
                    key={tpl.variant}
                    draggable
                    onClick={() => addSection(group.type, tpl.variant)}
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'copy';
                      setLibraryDrag({ type: group.type, variant: tpl.variant });
                    }}
                    onDragEnd={clearDragState}
                    title={`Drag or click to add ${tpl.label}`}
                    style={{
                      background: 'transparent',
                      border: '1px solid #e5e7eb',
                      borderRadius: 6,
                      padding: '6px 6px 5px',
                      cursor: 'grab',
                      textAlign: 'center',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = group.color;
                      (e.currentTarget as HTMLButtonElement).style.background = '#fafeff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb';
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    }}
                  >
                    <Thumbnail type={group.type} variant={tpl.variant} />
                    <p style={{ margin: '5px 0 0', fontSize: 10, color: '#6b7280', fontFamily: INTER, lineHeight: 1.2 }}>
                      {tpl.label}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── RIGHT: Email Canvas ────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', backgroundColor: '#f0f4f7' }}>

        {/* Rich text toolbar (sticky) */}
        <RichToolbar visible={richToolbarVisible} />

        {/* Email canvas */}
        <div
          style={{
            maxWidth: 600,
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          {sections.length === 0 ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverAppend(true); }}
              onDragLeave={() => setDragOverAppend(false)}
              onDrop={(e) => {
                e.preventDefault();
                if (libraryDrag !== null) addSection(libraryDrag.type, libraryDrag.variant);
                clearDragState();
              }}
              style={{
                padding: '60px 40px',
                textAlign: 'center',
                color: '#9ca3af',
                fontFamily: INTER,
                fontSize: 14,
                border: dragOverAppend ? `2px dashed ${NM_TEAL}` : '2px dashed transparent',
                borderRadius: 8,
                backgroundColor: dragOverAppend ? `${NM_TEAL}11` : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              <Plus size={32} color="#d1d5db" style={{ margin: '0 auto 12px' }} />
              <p style={{ margin: 0 }}>{dragOverAppend ? 'Drop here to add' : 'Drag a block from the library or click to add it.'}</p>
            </div>
          ) : (
            sections.map((section, idx) => {
              const groupColor = typeColorMap[section.type] ?? '#6b7280';
              const groupLabel = TEMPLATE_GROUPS.find((g) => g.type === section.type)?.label ?? section.type;
              return (
                <div
                  key={section.id}
                  draggable
                  onDragStart={(e) => {
                    if ((e.target as HTMLElement).isContentEditable) {
                      e.preventDefault();
                      return;
                    }
                    e.dataTransfer.effectAllowed = 'move';
                    setDraggingIdx(idx);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = draggingIdx !== null ? 'move' : 'copy';
                    if (dragOverIdx !== idx) setDragOverIdx(idx);
                  }}
                  onDragLeave={(e) => {
                    if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
                      setDragOverIdx(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggingIdx !== null) {
                      reorderSections(draggingIdx, idx);
                    } else if (libraryDrag !== null) {
                      insertSectionAt(libraryDrag.type, libraryDrag.variant, idx);
                    }
                    clearDragState();
                  }}
                  onDragEnd={clearDragState}
                  style={{
                    position: 'relative',
                    opacity: draggingIdx === idx ? 0.35 : 1,
                    transition: 'opacity 0.15s',
                  }}
                  className="nm-section-wrapper"
                >
                  {/* Drop indicator */}
                  {dragOverIdx === idx && (
                    (draggingIdx !== null && draggingIdx !== idx) || libraryDrag !== null
                  ) && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        backgroundColor: NM_TEAL,
                        zIndex: 30,
                        borderRadius: 2,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Section toolbar (absolutely positioned top-right) */}
                  <div
                    data-section-toolbar
                    style={{ opacity: 0, transition: 'opacity 0.15s' }}
                    className="nm-section-toolbar"
                  >
                    <SectionToolbar
                      label={groupLabel}
                      color={groupColor}
                      isFirst={idx === 0}
                      isLast={idx === sections.length - 1}
                      onMoveUp={() => moveSection(section.id, -1)}
                      onMoveDown={() => moveSection(section.id, 1)}
                      onDelete={() => removeSection(section.id)}
                    />
                  </div>

                  {/* Section content */}
                  <div
                    style={{
                      outline: 'none',
                      borderTop: idx > 0 ? '1px solid #f1f5f9' : 'none',
                    }}
                  >
                    <RenderSection
                      section={section}
                      onChange={(patch) => patchSection(section.id, patch)}
                    />
                  </div>
                </div>
              );
            })
          )}

          {/* Append drop zone — always present when sections exist so you can drop at the end */}
          {sections.length > 0 && (libraryDrag !== null || draggingIdx !== null) && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverAppend(true); setDragOverIdx(null); }}
              onDragLeave={() => setDragOverAppend(false)}
              onDrop={(e) => {
                e.preventDefault();
                if (draggingIdx !== null) {
                  reorderSections(draggingIdx, sections.length - 1);
                } else if (libraryDrag !== null) {
                  addSection(libraryDrag.type, libraryDrag.variant);
                }
                clearDragState();
              }}
              style={{
                height: dragOverAppend ? 56 : 24,
                margin: dragOverAppend ? '4px 4px' : 0,
                border: dragOverAppend ? `2px dashed ${NM_TEAL}` : '2px dashed transparent',
                borderRadius: 6,
                backgroundColor: dragOverAppend ? `${NM_TEAL}11` : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s',
                color: NM_TEAL,
                fontSize: 11,
                fontFamily: INTER,
              }}
            >
              {dragOverAppend && 'Drop here to add at end'}
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: '#94a3b8', fontFamily: INTER }}>
          Hover any section to drag, move or delete · Click any text to edit · Hover images to change them
        </p>
      </div>

      {/* ── Inline CSS for hover effects ──────────────────────────────────── */}
      <style>{`
        .nm-section-wrapper:hover .nm-section-toolbar { opacity: 1 !important; }
        .nm-section-wrapper:hover .nm-drag-handle { color: #64748b !important; }
        .nm-drag-handle:hover { color: ${NM_TEAL} !important; }
        .nm-section-wrapper[draggable]:hover { cursor: grab; }
        .nm-section-wrapper[draggable]:active { cursor: grabbing; }
        [contenteditable]:focus { outline: 2px solid ${NM_TEAL}33 !important; border-radius: 3px; }
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          font-style: italic;
        }
        .nm-section-wrapper:hover { outline: 1.5px dashed ${NM_TEAL}66; outline-offset: -1px; }
      `}</style>

      {/* ── Floating copy bar ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          borderRadius: 10,
          overflow: 'hidden',
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <button
          onClick={copyAsRich}
          style={{
            backgroundColor: NM_TEAL,
            color: '#fff',
            border: 'none',
            padding: '10px 18px',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: INTER,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {copiedFormat === 'rich' ? <><Check size={14} /> Copied!</> : <><ClipboardPaste size={14} /> Copy Template</>}
        </button>
        <div style={{ width: 1, backgroundColor: '#1da8b2', flexShrink: 0 }} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                backgroundColor: NM_TEAL,
                color: '#fff',
                border: 'none',
                padding: '10px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronDown size={14} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem onSelect={copyAsRich} className="gap-3 py-2.5">
              <ClipboardPaste className="size-4 text-gray-500 shrink-0" />
              <div>
                <div className="font-medium text-sm">Paste-Ready</div>
                <div className="text-xs text-gray-500">Paste directly into Gmail / Outlook</div>
              </div>
              {copiedFormat === 'rich' && <Check className="ml-auto size-3.5 text-green-500" />}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={copyAsHTML} className="gap-3 py-2.5">
              <Code className="size-4 text-gray-500 shrink-0" />
              <div>
                <div className="font-medium text-sm">Responsive HTML</div>
                <div className="text-xs text-gray-500">Full email HTML with Cabin + Inter fonts</div>
              </div>
              {copiedFormat === 'html' && <Check className="ml-auto size-3.5 text-green-500" />}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={copyAsText} className="gap-3 py-2.5">
              <AlignLeft className="size-4 text-gray-500 shrink-0" />
              <div>
                <div className="font-medium text-sm">Plain Text</div>
                <div className="text-xs text-gray-500">No formatting, works everywhere</div>
              </div>
              {copiedFormat === 'text' && <Check className="ml-auto size-3.5 text-green-500" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </div>
  );
}
