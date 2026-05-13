import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import {
  Mail, Phone, Globe, Linkedin, Copy, Check, MapPin, Layout,
  ChevronDown, Code, AlignLeft, ClipboardPaste,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';
import Svgexport from '../../imports/Svgexport121-2/Svgexport121-2002-169';
const g2sDarkPngInline = new URL('../../../G2S Dark.png', import.meta.url).href;
const bishopFinchPngInline = new URL('../../../Bishop & Finch.png', import.meta.url).href;

// Use PNG for clipboard output so pasted signatures keep the logo in email clients.
const g2sLogoEmailHTML = (size: number, _unusedTextColor?: string) => {
  return `<table cellpadding="0" cellspacing="0" style="display:inline-table;vertical-align:top;border-collapse:collapse"><tr><td width="${size}" height="${size}" style="width:${size}px;height:${size}px;min-width:${size}px;background-color:transparent;vertical-align:middle;text-align:center"><img src="${g2sDarkPngInline}" width="${size}" height="${size}" alt="G2S logo" style="display:block;width:${size}px;height:${size}px;border:0;outline:none;text-decoration:none" /></td></tr></table>`;
};

const bishopLogoEmailHTML = (width = 230) =>
  `<img src="${bishopFinchPngInline}" width="${width}" alt="Bishop & Finch logo" style="display:block;width:${width}px;height:auto;border:0;outline:none;text-decoration:none" />`;

// ─── Nurtureme brand ───────────────────────────────────────────────────────────
const NM_TEAL = '#29b9c5';
const NM_BG   = '#e9f3ff';
const NM_DARK = '#1a1a2e';

const nmLogoSrc = new URL('../../../Nurture me logo.svg', import.meta.url).href;

// Wave background PNG (used as header image across all 3 layouts)
const nmWaveSrc = new URL('../../../nurture-wave.png', import.meta.url).href;

// ─── Inline SVG icon strings for clipboard HTML output ────────────────────────
const svgIcon = (path: string, color = '#9ca3af') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px;display:inline-block">${path}</svg>`;

const svgMail = (c = '#9ca3af') => svgIcon('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', c);
const svgPhone = (c = '#9ca3af') => svgIcon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 5.37 5.37l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>', c);
const svgGlobe = (c = '#9ca3af') => svgIcon('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', c);
const svgPin = (c = '#9ca3af') => svgIcon('<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>', c);
const svgLinkedin = (c = '#9ca3af') => svgIcon('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>', c);

// ─── G2S Logo wrapper ─────────────────────────────────────────────────────────
function G2SLogo({
  size = 72,
  bgColor = '#0f172a',
  fillColor = '#ffffff',
}: {
  size?: number;
  bgColor?: string;
  fillColor?: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        borderRadius: 4,
        flexShrink: 0,
        overflow: 'hidden',
        padding: Math.round(size * 0.06),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // CSS custom property controls the SVG path fill colour
        ['--fill-0' as string]: fillColor,
      }}
    >
      <Svgexport />
    </div>
  );
}

type Brand = 'g2s' | 'bishop' | 'nurture';
type LayoutOption = 'a' | 'b' | 'c';

// ─── Bishop & Finch inline logo ───────────────────────────────────────────────
function BishopFinchLogo({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const textColor = variant === 'light' ? '#e8e4dd' : '#0a1220';
  return (
    <span
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500,
        fontSize: 'inherit',
        color: textColor,
        whiteSpace: 'nowrap',
      }}
    >
      Bishop{' '}
      <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>&amp;</em>
      {' '}Finch
    </span>
  );
}

// ─── Shared icon row for React previews ───────────────────────────────────────
function IconRow({
  icon: Icon,
  text,
  iconColor = '#9ca3af',
  textColor = '#4b5563',
  fontSize = 13,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>;
  text: string;
  iconColor?: string;
  textColor?: string;
  fontSize?: number;
}) {
  return (
    <tr>
      <td style={{ padding: '2.5px 0', verticalAlign: 'middle' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize, color: textColor }}>
          {/* Use inline CSS style (beats SVG presentation attributes and any class rule) */}
          <Icon size={13} strokeWidth={2} style={{ stroke: iconColor, fill: 'none', color: iconColor, flexShrink: 0 }} />
          {text}
        </span>
      </td>
    </tr>
  );
}

// ─── G2S Preview A – Enterprise Pro ──────────────────────────────────────────
// Clean vertical split with dark logo panel and structured contact rows.
function G2SPreviewA({ data }: { data: FormData }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 520 }}>
      <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            {/* Left: Logo */}
            <td style={{ verticalAlign: 'top', paddingRight: 18 }}>
              <G2SLogo size={68} bgColor="transparent" fillColor="#0f172a" />
            </td>
            {/* Right: Content */}
            <td style={{ verticalAlign: 'top', borderLeft: '1px solid #e5e7eb', paddingLeft: 18 }}>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                {data.name}
              </div>
              <div style={{ marginTop: 3, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#6b7280', fontWeight: 400 }}>
                <span>{data.title}</span>
                {data.email && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#94a3b8' }}>-</span>
                    <span style={{ color: '#4b5563' }}>{data.email}</span>
                  </span>
                )}
              </div>
              {data.company && (
                <div style={{ fontSize: 12.5, marginTop: 2, fontWeight: 600, color: '#374151' }}>{data.company}</div>
              )}
              <div style={{ borderTop: '1px solid #f1f5f9', margin: '10px 0 6px' }} />
              <table cellPadding={0} cellSpacing={0}>
                <tbody>
                  {data.phone && <IconRow icon={Phone} text={data.phone} />}
                  {data.website && <IconRow icon={Globe} text={data.website} />}
                  {data.linkedin && <IconRow icon={Linkedin} text={data.linkedin} />}
                  {data.address && <IconRow icon={MapPin} text={data.address} />}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

// ─── G2S Preview B – Dark Infrastructure ─────────────────────────────────────
// Deep navy header inspired by the website's hero. Clean white contact body.
function G2SPreviewB({ data }: { data: FormData }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 520, borderRadius: 6, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
      {/* Dark header */}
      <div style={{ backgroundColor: '#0f172a', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <G2SLogo size={52} bgColor="transparent" fillColor="#ffffff" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.8px', lineHeight: 1.2 }}>
            {data.name}
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3, fontWeight: 400 }}>
            {data.title}
            {data.company && <span style={{ color: '#fff', fontWeight: 600 }}>{` · ${data.company}`}</span>}
          </div>
        </div>
      </div>
      {/* Contact body */}
      <div style={{ backgroundColor: '#ffffff', padding: '12px 18px 14px', borderTop: '3px solid #fff' }}>
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            {data.email && <IconRow icon={Mail} text={data.email} iconColor="#64748b" textColor="#374151" fontSize={12.5} />}
            {data.phone && <IconRow icon={Phone} text={data.phone} iconColor="#64748b" textColor="#374151" fontSize={12.5} />}
            {data.website && <IconRow icon={Globe} text={data.website} iconColor="#64748b" textColor="#374151" fontSize={12.5} />}
            {data.linkedin && <IconRow icon={Linkedin} text={data.linkedin} iconColor="#64748b" textColor="#374151" fontSize={12.5} />}
            {data.address && <IconRow icon={MapPin} text={data.address} iconColor="#64748b" textColor="#374151" fontSize={12.5} />}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── G2S Preview C – Data Minimal ────────────────────────────────────────────
// Compact single-row layout with a clean data-inspired underline accent.
function G2SPreviewC({ data }: { data: FormData }) {
  const icStyle = { stroke: '#94a3b8', fill: 'none', color: '#94a3b8' } as const;
  const contactParts = [
    data.email && (
      <span key="email" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Mail size={11} strokeWidth={2} style={icStyle} />
        <span>{data.email}</span>
      </span>
    ),
    data.phone && (
      <span key="phone" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Phone size={11} strokeWidth={2} style={icStyle} />
        <span>{data.phone}</span>
      </span>
    ),
    data.website && (
      <span key="web" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <Globe size={11} strokeWidth={2} style={icStyle} />
        <span>{data.website}</span>
      </span>
    ),
    data.address && (
      <span key="addr" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <MapPin size={11} strokeWidth={2} style={icStyle} />
        <span>{data.address}</span>
      </span>
    ),
  ].filter(Boolean);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 520 }}>
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'middle', paddingRight: 14, borderRight: '2px solid #0f172a' }}>
              <G2SLogo size={46} bgColor="transparent" fillColor="#0f172a" />
            </td>
            <td style={{ paddingLeft: 14, verticalAlign: 'middle' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                {data.name}
              </div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>
                {data.title}
                {data.company && <span style={{ color: '#94a3b8' }}> · {data.company}</span>}
              </div>
              <div style={{ height: 2, width: 40, backgroundColor: '#fff', borderRadius: 1, margin: '6px 0' }} />
              {contactParts.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px', fontSize: 11.5, color: '#4b5563' }}>
                  {contactParts}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Bishop & Finch Previews ──────────────────────────────────────────────────
function BishopPreviewA({ data }: { data: FormData }) {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", maxWidth: 520, overflow: 'hidden', borderRadius: 4 }}>
      <div style={{ backgroundColor: '#0a1220', padding: '18px 24px' }}>
        <div style={{ fontSize: 26, fontWeight: 500, color: '#e8e4dd', letterSpacing: '0.5px' }}>
          Bishop <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>&amp;</em> Finch
        </div>
        <div style={{ width: 48, height: 2, backgroundColor: '#c9a96e', marginTop: 8 }} />
      </div>
      <div style={{ backgroundColor: '#fff', padding: '14px 24px', border: '1px solid #e8e4dd', borderTop: 'none' }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#0a1220', marginBottom: 2 }}>{data.name}</div>
        <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic', marginBottom: 8 }}>
          {data.title}
          {data.company && <span>{` - ${data.company}`}</span>}
          {data.email && <span style={{ color: '#555', fontStyle: 'normal' }}>{` - ${data.email}`}</span>}
        </div>
        <div style={{ borderTop: '1px solid #e8e4dd', paddingTop: 8 }}>
          <table cellPadding={0} cellSpacing={0}>
            <tbody>
              {data.phone && <IconRow icon={Phone} text={data.phone} iconColor="#c9a96e" textColor="#555" fontSize={12.5} />}
              {data.website && <IconRow icon={Globe} text={data.website} iconColor="#c9a96e" textColor="#555" fontSize={12.5} />}
              {data.linkedin && <IconRow icon={Linkedin} text={data.linkedin} iconColor="#c9a96e" textColor="#555" fontSize={12.5} />}
              {data.address && <IconRow icon={MapPin} text={data.address} iconColor="#c9a96e" textColor="#555" fontSize={12.5} />}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BishopPreviewB({ data }: { data: FormData }) {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", maxWidth: 520, borderLeft: '3px solid #c9a96e', paddingLeft: 20 }}>
      <div style={{ fontSize: 24, fontWeight: 500, color: '#0a1220' }}>
        Bishop <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>&amp;</em> Finch
      </div>
      <div style={{ fontSize: 16, fontWeight: 500, color: '#0a1220', marginTop: 8 }}>{data.name}</div>
      <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic', marginBottom: 10 }}>{data.title}{data.company && `, ${data.company}`}</div>
      <div style={{ borderTop: '1px solid #ddd', paddingTop: 8 }}>
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            {data.email && <IconRow icon={Mail} text={data.email} iconColor="#c9a96e" textColor="#444" fontSize={12.5} />}
            {data.phone && <IconRow icon={Phone} text={data.phone} iconColor="#c9a96e" textColor="#444" fontSize={12.5} />}
            {data.website && <IconRow icon={Globe} text={data.website} iconColor="#c9a96e" textColor="#444" fontSize={12.5} />}
            {data.linkedin && <IconRow icon={Linkedin} text={data.linkedin} iconColor="#c9a96e" textColor="#444" fontSize={12.5} />}
            {data.address && <IconRow icon={MapPin} text={data.address} iconColor="#c9a96e" textColor="#444" fontSize={12.5} />}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BishopPreviewC({ data }: { data: FormData }) {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', serif", maxWidth: 520, textAlign: 'center' }}>
      <div style={{ fontSize: 28, fontWeight: 500, color: '#0a1220', letterSpacing: '1px' }}>
        Bishop <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>&amp;</em> Finch
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '10px 0' }}>
        <div style={{ flex: 1, height: 1, backgroundColor: '#c9a96e' }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#c9a96e' }} />
        <div style={{ flex: 1, height: 1, backgroundColor: '#c9a96e' }} />
      </div>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#0a1220' }}>{data.name}</div>
      <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic', marginBottom: 10 }}>{data.title}{data.company && ` · ${data.company}`}</div>
      <div style={{ fontSize: 12.5, color: '#555', fontFamily: 'Arial, sans-serif', lineHeight: '1.9' }}>
        {data.email && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Mail size={11} strokeWidth={2} style={{ stroke: '#c9a96e', fill: 'none', color: '#c9a96e' }} />{data.email}
          </div>
        )}
        {data.phone && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Phone size={11} strokeWidth={2} style={{ stroke: '#c9a96e', fill: 'none', color: '#c9a96e' }} />{data.phone}
          </div>
        )}
        {data.website && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Globe size={11} strokeWidth={2} style={{ stroke: '#c9a96e', fill: 'none', color: '#c9a96e' }} />{data.website}
          </div>
        )}
        {data.address && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <MapPin size={11} color="#c9a96e" strokeWidth={2} />{data.address}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Nurtureme Previews ───────────────────────────────────────────────────────

// A – Wave Splash: wave PNG header with logo overlaid, teal bar, white body
function NurturePreviewA({ data }: { data: FormData }) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 520, borderRadius: 8, overflow: 'hidden', border: '1px solid #dde9f7' }}>
      {/* Wave header */}
      <div style={{ position: 'relative' }}>
        <img src={nmWaveSrc} alt="" aria-hidden="true"
          style={{ display: 'block', width: '100%', height: 72, objectFit: 'cover', objectPosition: 'top center' }} />
        {/* Logo overlaid on wave */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 22px' }}>
          <img src={nmLogoSrc} alt="nurtureme" style={{ height: 26, width: 'auto', display: 'block' }} />
        </div>
      </div>
      {/* Teal accent bar */}
      <div style={{ height: 3, backgroundColor: NM_TEAL }} />
      {/* White body */}
      <div style={{ backgroundColor: '#ffffff', padding: '14px 22px' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: NM_DARK, marginBottom: 1 }}>{data.name}</div>
        <div style={{ fontSize: 12.5, color: NM_TEAL, marginBottom: 8 }}>
          {data.title}{data.company && <span style={{ color: '#6b7280' }}> · {data.company}</span>}
        </div>
        <div style={{ borderTop: '1px solid #eef5f8', marginBottom: 8 }} />
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            {data.email    && <IconRow icon={Mail}    text={data.email}    iconColor={NM_TEAL} textColor="#374151" fontSize={12.5} />}
            {data.phone    && <IconRow icon={Phone}   text={data.phone}    iconColor={NM_TEAL} textColor="#374151" fontSize={12.5} />}
            {data.website  && <IconRow icon={Globe}   text={data.website}  iconColor={NM_TEAL} textColor="#374151" fontSize={12.5} />}
            {data.linkedin && <IconRow icon={Linkedin} text={data.linkedin} iconColor={NM_TEAL} textColor="#374151" fontSize={12.5} />}
            {data.address  && <IconRow icon={MapPin}  text={data.address}  iconColor={NM_TEAL} textColor="#374151" fontSize={12.5} />}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  address: string;
}

const defaultG2S: FormData = {
  name: 'John Castell',
  title: 'Senior Consultant',
  company: 'Growth2Success',
  email: 'John@growth2success.com',
  phone: '+1 (786) 641-7097',
  website: 'growth2success.com',
  linkedin: 'linkedin.com/company/growth2success',
  address: '425 Page Mill RD, Palo Alto, CA 94306',
};

const defaultBishop: FormData = {
  name: 'John Castell',
  title: 'Senior Associate',
  company: 'Bishop & Finch',
  email: 'John@bishopfinch.com',
  phone: '+1 (786) 641-7097',
  website: 'www.bishopfinch.com',
  linkedin: 'linkedin.com/in/charlottefinch',
  address: '30 N Gould St #10830 Sheridan, WY 82801',
};

const defaultNurture: FormData = {
  name: 'Ava Mitchell',
  title: 'Talent Sourcing Specialist',
  company: 'Nurtureme',
  email: 'ava@nurtureme.ai',
  phone: '+1 (786) 641-7097',
  website: 'nurtureme.ai',
  linkedin: 'linkedin.com/company/nurtureme',
  address: '',
};

// ─── Layout card ──────────────────────────────────────────────────────────────
function LayoutCard({
  label,
  selected,
  onClick,
  children,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border-2 transition-all overflow-hidden ${
        selected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="px-3 py-1.5 bg-gray-50 border-b flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        {selected && <span className="text-xs text-blue-500 font-semibold">Selected</span>}
      </div>
      <div className="p-4 bg-white pointer-events-none scale-90 origin-top-left" style={{ width: '111%' }}>
        {children}
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function EmailSignature() {
  const [brand, setBrand] = useState<Brand>('g2s');
  const [layout, setLayout] = useState<LayoutOption>('a');
  const [g2sData, setG2sData] = useState<FormData>(defaultG2S);
  const [bishopData, setBishopData] = useState<FormData>(defaultBishop);
  const [nurtureData, setNurtureData] = useState<FormData>(defaultNurture);

  const data = brand === 'g2s' ? g2sData : brand === 'bishop' ? bishopData : nurtureData;
  const setData = brand === 'g2s' ? setG2sData : brand === 'bishop' ? setBishopData : setNurtureData;

  const handleChange = (field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleBrandChange = (b: Brand) => {
    setBrand(b);
    setLayout('a');
  };

  // ─── Build clipboard HTML ──────────────────────────────────────────────────
  const generateHTML = (): string => {
    const iconStyle = 'style="vertical-align:middle;margin-right:5px;display:inline-block"';

    const contactRow = (svgFn: (c?: string) => string, text: string, iconColor: string) =>
      `<tr><td style="padding:2.5px 0;font-size:13px;color:#4b5563;vertical-align:middle">${svgFn(iconColor)}${text}</td></tr>`;

    if (brand === 'g2s') {
      if (layout === 'a') {
        return `<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@700;800&display=swap" rel="stylesheet">
<div style="font-family:Arial,sans-serif;max-width:520px">
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    <tr>
      <td style="vertical-align:top;padding-right:18px">
        ${g2sLogoEmailHTML(68, '#0f172a')}
      </td>
      <td style="vertical-align:top;border-left:1px solid #e5e7eb;padding-left:18px">
        <div style="font-size:16px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.6px">${data.name}</div>
        <div style="font-size:12.5px;color:#6b7280;margin-top:3px;display:inline-flex;align-items:center;gap:8px">${data.title}${data.email ? `<span style="display:inline-flex;align-items:center;gap:6px"><span style="color:#94a3b8">-</span><span style="color:#4b5563">${data.email}</span></span>` : ''}</div>
        ${data.company ? `<div style="font-size:12.5px;margin-top:2px;font-weight:600;color:#374151">${data.company}</div>` : ''}
        <div style="border-top:1px solid #f1f5f9;margin:10px 0 6px"></div>
        <table cellpadding="0" cellspacing="0">
          ${data.phone ? contactRow(svgPhone, data.phone, '#9ca3af') : ''}
          ${data.website ? contactRow(svgGlobe, data.website, '#9ca3af') : ''}
          ${data.linkedin ? contactRow(svgLinkedin, data.linkedin, '#9ca3af') : ''}
          ${data.address ? contactRow(svgPin, data.address, '#9ca3af') : ''}
        </table>
      </td>
    </tr>
  </table>
</div>`;
      }
      if (layout === 'b') {
        return `<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@700;800&display=swap" rel="stylesheet">
<div style="font-family:Arial,sans-serif;max-width:520px;border-radius:6px;overflow:hidden;border:1px solid #e2e8f0">
  <table cellpadding="0" cellspacing="0" style="width:100%;background:#0f172a">
    <tr>
      <td style="padding:14px 18px;vertical-align:middle">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:16px;vertical-align:middle">
            ${g2sLogoEmailHTML(52, '#ffffff')}
          </td>
          <td style="vertical-align:middle">
            <div style="font-size:17px;font-weight:700;color:#f8fafc;text-transform:uppercase;letter-spacing:.8px;line-height:1.2">${data.name}</div>
            <div style="font-size:12px;color:#94a3b8;margin-top:3px">${data.title}${data.company ? `<span style="color:#fff;font-weight:600"> · ${data.company}</span>` : ''}</div>
          </td>
        </tr></table>
      </td>
    </tr>
  </table>
  <div style="background:#ffffff;padding:12px 18px 14px;border-top:3px solid #fff">
    <table cellpadding="0" cellspacing="0">
      ${data.email ? contactRow(svgMail, data.email, '#64748b') : ''}
      ${data.phone ? contactRow(svgPhone, data.phone, '#64748b') : ''}
      ${data.website ? contactRow(svgGlobe, data.website, '#64748b') : ''}
      ${data.linkedin ? contactRow(svgLinkedin, data.linkedin, '#64748b') : ''}
      ${data.address ? contactRow(svgPin, data.address, '#64748b') : ''}
    </table>
  </div>
</div>`;
      }
      // Layout C
      const contactInline = [
        data.email ? `${svgMail('#94a3b8')}<span style="font-size:11.5px;color:#4b5563">${data.email}</span>` : '',
        data.phone ? `${svgPhone('#94a3b8')}<span style="font-size:11.5px;color:#4b5563">${data.phone}</span>` : '',
        data.website ? `${svgGlobe('#94a3b8')}<span style="font-size:11.5px;color:#4b5563">${data.website}</span>` : '',
        data.address ? `${svgPin('#94a3b8')}<span style="font-size:11.5px;color:#4b5563">${data.address}</span>` : '',
      ].filter(Boolean).join('<span style="color:#e2e8f0;margin:0 8px">|</span>');

      return `<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@700&display=swap" rel="stylesheet">
<div style="font-family:Arial,sans-serif;max-width:520px">
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    <tr>
      <td style="vertical-align:middle;padding-right:14px;border-right:2px solid #0f172a">
        ${g2sLogoEmailHTML(46, '#0f172a')}
      </td>
      <td style="padding-left:14px;vertical-align:middle">
        <div style="font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.7px">${data.name}</div>
        <div style="font-size:11.5px;color:#64748b;margin-top:2px">${data.title}${data.company ? `<span style="color:#94a3b8"> · ${data.company}</span>` : ''}</div>
        <div style="height:2px;width:40px;background:#fff;border-radius:1px;margin:6px 0"></div>
        ${contactInline ? `<div style="line-height:1.6">${contactInline}</div>` : ''}
      </td>
    </tr>
  </table>
</div>`;
    }

    // ─── Nurtureme HTML ──────────────────────────────────────────────────────
    if (brand === 'nurture') {
      const nmRow = (svgFn: (c?: string) => string, text: string) =>
        `<tr><td style="padding:2.5px 0;font-size:12.5px;color:#374151;vertical-align:middle;font-family:Arial,sans-serif">${svgFn(NM_TEAL)}${text}</td></tr>`;

      if (layout === 'a') {
        return `<div style="font-family:Arial,sans-serif;max-width:520px;border-radius:8px;overflow:hidden;border:1px solid #dde9f7"><table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td background="${nmWaveSrc}" style="background-image:url(${nmWaveSrc});background-size:cover;background-position:top center;background-color:#dce8f5;height:72px;padding:0 22px;vertical-align:middle"><img src="${nmLogoSrc}" height="26" alt="nurtureme" style="display:block;height:26px;width:auto;border:0" /></td></tr><tr><td bgcolor="${NM_TEAL}" height="3" style="height:3px;line-height:0;font-size:0">&nbsp;</td></tr><tr><td bgcolor="#ffffff" style="padding:14px 22px"><div style="font-size:16px;font-weight:700;color:${NM_DARK};margin-bottom:1px">${data.name}</div><div style="font-size:12.5px;color:${NM_TEAL};margin-bottom:8px">${data.title}${data.company ? `<span style="color:#6b7280"> · ${data.company}</span>` : ''}</div><div style="border-top:1px solid #eef5f8;margin-bottom:8px"></div><table cellpadding="0" cellspacing="0">${data.email ? nmRow(svgMail, data.email) : ''}${data.phone ? nmRow(svgPhone, data.phone) : ''}${data.website ? nmRow(svgGlobe, data.website) : ''}${data.linkedin ? nmRow(svgLinkedin, data.linkedin) : ''}${data.address ? nmRow(svgPin, data.address) : ''}</table></td></tr></table></div>`;
      }
    }

    // ─── Bishop & Finch HTML ─────────────────────────────────────────────────
    const bfLogoHTML = bishopLogoEmailHTML(230);

    const bfContactRow = (svgFn: (c?: string) => string, text: string) =>
      `<tr><td style="padding:2.5px 0;font-size:12.5px;color:#555;vertical-align:middle;font-family:Arial,sans-serif">${svgFn('#c9a96e')}${text}</td></tr>`;

    if (layout === 'a') {
      return `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,400&display=swap" rel="stylesheet">
<div style="font-family:'Cormorant Garamond',serif;max-width:520px;border-radius:4px;overflow:hidden">
  <div style="background-color:#0a1220;padding:18px 24px">
    <div>${bfLogoHTML}</div>
    <div style="width:48px;height:2px;background-color:#c9a96e;margin-top:8px"></div>
  </div>
  <div style="background-color:#fff;padding:14px 24px;border:1px solid #e8e4dd;border-top:none">
    <div style="font-size:17px;font-weight:600;color:#0a1220;margin-bottom:2px">${data.name}</div>
    <div style="font-size:13px;color:#888;font-style:italic;margin-bottom:8px">${data.title}${data.company ? ` - ${data.company}` : ''}${data.email ? ` - <span style="color:#555;font-style:normal">${data.email}</span>` : ''}</div>
    <div style="border-top:1px solid #e8e4dd;padding-top:8px">
      <table cellpadding="0" cellspacing="0">
        ${data.phone ? bfContactRow(svgPhone, data.phone) : ''}
        ${data.website ? bfContactRow(svgGlobe, data.website) : ''}
        ${data.linkedin ? bfContactRow(svgLinkedin, data.linkedin) : ''}
        ${data.address ? bfContactRow(svgPin, data.address) : ''}
      </table>
    </div>
  </div>
</div>`;
    }
    if (layout === 'b') {
      return `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,400&display=swap" rel="stylesheet">
<div style="font-family:'Cormorant Garamond',serif;max-width:520px;border-left:3px solid #c9a96e;padding-left:20px">
  <div style="font-size:24px;font-weight:500;color:#0a1220">Bishop <em style="color:#c9a96e;font-style:italic">&amp;</em> Finch</div>
  <div style="font-size:16px;font-weight:500;color:#0a1220;margin-top:8px">${data.name}</div>
  <div style="font-size:13px;color:#888;font-style:italic;margin-bottom:10px">${data.title}${data.company ? `, ${data.company}` : ''}</div>
  <div style="border-top:1px solid #ddd;padding-top:8px">
    <table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif">
      ${data.email ? bfContactRow(svgMail, data.email) : ''}
      ${data.phone ? bfContactRow(svgPhone, data.phone) : ''}
      ${data.website ? bfContactRow(svgGlobe, data.website) : ''}
      ${data.linkedin ? bfContactRow(svgLinkedin, data.linkedin) : ''}
      ${data.address ? bfContactRow(svgPin, data.address) : ''}
    </table>
  </div>
</div>`;
    }
    return `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,400&display=swap" rel="stylesheet">
<div style="font-family:'Cormorant Garamond',serif;max-width:520px;text-align:center">
  <div style="font-size:28px;font-weight:500;color:#0a1220;letter-spacing:1px">Bishop <em style="color:#c9a96e;font-style:italic">&amp;</em> Finch</div>
  <table cellpadding="0" cellspacing="0" style="width:100%;margin:10px 0"><tr>
    <td style="border-bottom:1px solid #c9a96e">&nbsp;</td>
    <td style="width:10px;text-align:center;color:#c9a96e">◆</td>
    <td style="border-bottom:1px solid #c9a96e">&nbsp;</td>
  </tr></table>
  <div style="font-size:16px;font-weight:600;color:#0a1220">${data.name}</div>
  <div style="font-size:13px;color:#888;font-style:italic;margin-bottom:10px">${data.title}${data.company ? ` · ${data.company}` : ''}</div>
  <div style="font-size:12.5px;color:#555;font-family:Arial,sans-serif;line-height:1.9">
    ${data.email ? `<div>${svgMail('#c9a96e')}${data.email}</div>` : ''}
    ${data.phone ? `<div>${svgPhone('#c9a96e')}${data.phone}</div>` : ''}
    ${data.website ? `<div>${svgGlobe('#c9a96e')}${data.website}</div>` : ''}
    ${data.address ? `<div>${svgPin('#c9a96e')}${data.address}</div>` : ''}
  </div>
</div>`;

  };

  // ─── Paste-safe HTML (no SVG, no data URLs — survives Gmail/Outlook paste) ───
  const generatePasteHTML = (): string => {
    // Unicode text symbols that render as characters (not emoji) in email contexts
    const ic = (sym: string, color = '#9ca3af', fontSize = 13) =>
      `<span style="font-size:${fontSize}px;color:${color};margin-right:5px;font-family:Arial,sans-serif">${sym}</span>`;

    const row = (sym: string, text: string, symColor = '#9ca3af', textColor = '#4b5563') =>
      `<tr><td style="padding:2.5px 0;font-size:13px;color:${textColor};font-family:Arial,sans-serif;vertical-align:middle">${ic(sym, symColor)}${text}</td></tr>`;

    if (brand === 'g2s') {
      const bar = (w: number) => `<div style="height:3px;width:${w}px;background-color:#0f172a;border-radius:2px;margin-top:6px"></div>`;
      const rows = [
        data.phone   ? row('✆', data.phone) : '',
        data.website ? row('⊕', data.website) : '',
        data.linkedin ? row('in', data.linkedin) : '',
        data.address ? row('◎', data.address) : '',
      ].join('');

      if (layout === 'a') {
        return `<div style="font-family:Arial,sans-serif;max-width:520px">
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tr>
    <td style="vertical-align:top;padding-right:18px">${g2sLogoEmailHTML(68, '#0f172a')}</td>
    <td style="vertical-align:top;border-left:1px solid #e5e7eb;padding-left:18px">
      <div style="font-size:16px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.6px;font-family:Arial,sans-serif">${data.name}</div>
      <div style="font-size:12.5px;color:#6b7280;margin-top:3px;font-family:Arial,sans-serif;display:inline-flex;align-items:center;gap:8px">${data.title}${data.email ? ` <span style="display:inline-flex;align-items:center;gap:6px"><span style="color:#94a3b8">-</span><span style="color:#4b5563">${data.email}</span></span>` : ''}</div>
      ${data.company ? `<div style="font-size:12.5px;margin-top:2px;font-weight:600;color:#374151;font-family:Arial,sans-serif">${data.company}</div>` : ''}
      <div style="border-top:1px solid #f1f5f9;margin:10px 0 6px"></div>
      <table cellpadding="0" cellspacing="0"><tbody>${rows}</tbody></table>
    </td>
  </tr></table>
</div>`;
      }
      if (layout === 'b') {
        const rowsDark = [
          data.email   ? row('✉', data.email, '#64748b', '#374151') : '',
          data.phone   ? row('✆', data.phone, '#64748b', '#374151') : '',
          data.website ? row('⊕', data.website, '#64748b', '#374151') : '',
          data.linkedin ? row('in', data.linkedin, '#64748b', '#374151') : '',
          data.address ? row('◎', data.address, '#64748b', '#374151') : '',
        ].join('');
        return `<div style="font-family:Arial,sans-serif;max-width:520px;border-radius:6px;border:1px solid #e2e8f0">
  <table cellpadding="0" cellspacing="0" style="width:100%;background-color:#0f172a;border-radius:5px 5px 0 0"><tr>
    <td style="padding:14px 18px;vertical-align:middle">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:16px;vertical-align:middle">${g2sLogoEmailHTML(52, '#ffffff')}</td>
        <td style="vertical-align:middle">
          <div style="font-size:17px;font-weight:700;color:#f8fafc;text-transform:uppercase;letter-spacing:.8px;font-family:Arial,sans-serif">${data.name}</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:3px;font-family:Arial,sans-serif">${data.title}${data.company ? ` · <span style="color:#ffffff;font-weight:600">${data.company}</span>` : ''}</div>
        </td>
      </tr></table>
    </td>
  </tr></table>
  <div style="background-color:#ffffff;padding:12px 18px 14px;border-top:3px solid #ffffff">
    <table cellpadding="0" cellspacing="0"><tbody>${rowsDark}</tbody></table>
  </div>
</div>`;
      }
      // Layout C
      const parts = [
        data.email   ? `${ic('✉', '#9ca3af', 11)}${data.email}` : '',
        data.phone   ? `${ic('✆', '#9ca3af', 11)}${data.phone}` : '',
        data.website ? `${ic('⊕', '#9ca3af', 11)}${data.website}` : '',
        data.address ? `${ic('◎', '#9ca3af', 11)}${data.address}` : '',
      ].filter(Boolean).join('<span style="color:#e2e8f0;margin:0 8px">|</span>');
      return `<div style="font-family:Arial,sans-serif;max-width:520px">
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tr>
    <td style="vertical-align:middle;padding-right:14px;border-right:2px solid #0f172a">${g2sLogoEmailHTML(46, '#0f172a')}</td>
    <td style="padding-left:14px;vertical-align:middle">
      <div style="font-size:14px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.7px;font-family:Arial,sans-serif">${data.name}</div>
      <div style="font-size:11.5px;color:#64748b;margin-top:2px;font-family:Arial,sans-serif">${data.title}${data.company ? ` · <span style="color:#94a3b8">${data.company}</span>` : ''}</div>
      <div style="height:2px;width:40px;background-color:#0f172a;border-radius:1px;margin:6px 0"></div>
      ${parts ? `<div style="font-size:11.5px;color:#4b5563;font-family:Arial,sans-serif;line-height:1.8">${parts}</div>` : ''}
    </td>
  </tr></table>
</div>`;
    }

    // ── Nurtureme ─────────────────────────────────────────────────────────────
    if (brand === 'nurture') {
      const nmPasteRow = (sym: string, text: string) =>
        `<tr><td style="padding:2.5px 0;font-size:12.5px;color:#374151;font-family:Arial,sans-serif;vertical-align:middle">${ic(sym, NM_TEAL, 12)}${text}</td></tr>`;

      if (layout === 'a') {
        return `<div style="font-family:Arial,sans-serif;max-width:520px;border-radius:8px;overflow:hidden;border:1px solid #dde9f7"><table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse"><tr><td background="${nmWaveSrc}" style="background-image:url(${nmWaveSrc});background-size:cover;background-position:top center;background-color:#dce8f5;height:72px;padding:0 22px;vertical-align:middle"><img src="${nmLogoSrc}" height="26" alt="nurtureme" style="display:block;height:26px;width:auto;border:0" /></td></tr><tr><td bgcolor="${NM_TEAL}" height="3" style="height:3px;line-height:0;font-size:0">&nbsp;</td></tr><tr><td bgcolor="#ffffff" style="padding:14px 22px"><div style="font-size:16px;font-weight:700;color:${NM_DARK};font-family:Arial,sans-serif">${data.name}</div><div style="font-size:12.5px;color:${NM_TEAL};margin-bottom:8px;font-family:Arial,sans-serif">${data.title}${data.company ? ` · ${data.company}` : ''}</div><div style="border-top:1px solid #eef5f8;margin-bottom:8px"></div><table cellpadding="0" cellspacing="0"><tbody>${data.email ? nmPasteRow('✉', data.email) : ''}${data.phone ? nmPasteRow('✆', data.phone) : ''}${data.website ? nmPasteRow('⊕', data.website) : ''}${data.linkedin ? nmPasteRow('in', data.linkedin) : ''}${data.address ? nmPasteRow('◎', data.address) : ''}</tbody></table></td></tr></table></div>`;
      }
    }

    // ── Bishop & Finch ────────────────────────────────────────────────────────
    const bfRow = (sym: string, text: string) =>
      `<tr><td style="padding:2.5px 0;font-size:12.5px;color:#555;font-family:Arial,sans-serif">${ic(sym, '#c9a96e', 12)}${text}</td></tr>`;
    const bfRows = [
      data.phone   ? bfRow('✆', data.phone) : '',
      data.website ? bfRow('⊕', data.website) : '',
      data.linkedin ? bfRow('in', data.linkedin) : '',
      data.address ? bfRow('◎', data.address) : '',
    ].join('');

    if (layout === 'a') {
      return `<div style="font-family:Georgia,serif;max-width:520px;border-radius:4px;border:1px solid #e8e4dd">
  <div style="background-color:#0a1220;padding:18px 24px">
    <div>${bishopLogoEmailHTML(230)}</div>
    <div style="width:48px;height:2px;background-color:#c9a96e;margin-top:8px"></div>
  </div>
  <div style="background-color:#ffffff;padding:14px 24px">
  <div style="font-size:17px;font-weight:600;color:#0a1220;margin-bottom:2px;font-family:Georgia,serif">${data.name}</div>
  <div style="font-size:13px;color:#888;font-style:italic;margin-bottom:8px;font-family:Georgia,serif">${data.title}${data.company ? ` - ${data.company}` : ''}${data.email ? ` - <span style="color:#555;font-style:normal">${data.email}</span>` : ''}</div>
    <div style="border-top:1px solid #e8e4dd;padding-top:8px">
      <table cellpadding="0" cellspacing="0"><tbody>${bfRows}</tbody></table>
    </div>
  </div>
</div>`;
    }
    if (layout === 'b') {
      return `<div style="font-family:Georgia,serif;max-width:520px;border-left:3px solid #c9a96e;padding-left:20px">
  <div style="font-size:24px;font-weight:500;color:#0a1220;font-family:Georgia,serif">Bishop <em style="color:#c9a96e;font-style:italic">&amp;</em> Finch</div>
  <div style="font-size:16px;font-weight:500;color:#0a1220;margin-top:8px;font-family:Georgia,serif">${data.name}</div>
  <div style="font-size:13px;color:#888;font-style:italic;margin-bottom:10px;font-family:Georgia,serif">${data.title}${data.company ? `, ${data.company}` : ''}</div>
  <div style="border-top:1px solid #ddd;padding-top:8px">
    <table cellpadding="0" cellspacing="0"><tbody>${bfRows}</tbody></table>
  </div>
</div>`;
    }
    return `<div style="font-family:Georgia,serif;max-width:520px;text-align:center">
  <div style="font-size:28px;font-weight:500;color:#0a1220;letter-spacing:1px;font-family:Georgia,serif">Bishop <em style="color:#c9a96e;font-style:italic">&amp;</em> Finch</div>
  <table cellpadding="0" cellspacing="0" style="width:100%;margin:10px 0"><tr>
    <td style="border-bottom:1px solid #c9a96e">&nbsp;</td>
    <td style="width:10px;text-align:center;color:#c9a96e">◆</td>
    <td style="border-bottom:1px solid #c9a96e">&nbsp;</td>
  </tr></table>
  <div style="font-size:16px;font-weight:600;color:#0a1220;font-family:Georgia,serif">${data.name}</div>
  <div style="font-size:13px;color:#888;font-style:italic;margin-bottom:10px;font-family:Georgia,serif">${data.title}${data.company ? ` · ${data.company}` : ''}</div>
  <div style="font-size:12.5px;color:#555;font-family:Arial,sans-serif;line-height:1.9">
    ${data.email   ? `<div>${ic('✉', '#c9a96e', 12)}${data.email}</div>` : ''}
    ${data.phone   ? `<div>${ic('✆', '#c9a96e', 12)}${data.phone}</div>` : ''}
    ${data.website ? `<div>${ic('⊕', '#c9a96e', 12)}${data.website}</div>` : ''}
    ${data.address ? `<div>${ic('◎', '#c9a96e', 12)}${data.address}</div>` : ''}
  </div>
</div>`;
  };

  type CopyFormat = 'rich' | 'html' | 'text';
  const [copiedFormat, setCopiedFormat] = useState<CopyFormat | null>(null);

  const markCopied = (format: CopyFormat, label: string) => {
    setCopiedFormat(format);
    toast.success(label);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const generatePlainText = (): string =>
    [
      data.name,
      [data.title, data.company].filter(Boolean).join(' | '),
      '',
      data.email && `Email: ${data.email}`,
      data.phone && `Phone: ${data.phone}`,
      data.website && `Web:   ${data.website}`,
      data.linkedin && `LinkedIn: ${data.linkedin}`,
      data.address && `Address: ${data.address}`,
    ].filter(Boolean).join('\n');

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
    const html = generatePasteHTML();
    if (navigator.clipboard?.write) {
      const blob = new Blob([html], { type: 'text/html' });
      navigator.clipboard
        .write([new ClipboardItem({ 'text/html': blob })])
        .then(() => markCopied('rich', 'Copied! Paste directly into Gmail / Outlook.'))
        .catch(() => writeText(html, () => markCopied('html', 'Rich text unavailable — HTML source copied instead.')));
    } else {
      writeText(html, () => markCopied('html', 'Rich text unavailable — HTML source copied instead.'));
    }
  };

  const copyAsHTML = () =>
    writeText(generateHTML(), () => markCopied('html', 'HTML source copied.'));

  const copyAsText = () =>
    writeText(generatePlainText(), () => markCopied('text', 'Plain text copied.'));

  const isBishop = brand === 'bishop';

  return (
    <div className="space-y-6">
      {/* Brand Tabs */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 max-w-sm shadow-sm">
        <button
          onClick={() => handleBrandChange('g2s')}
          className={`flex-1 py-3 px-6 text-sm font-semibold transition-all ${
            brand === 'g2s'
              ? 'bg-[#0f172a] text-[#fff]'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          G2S
        </button>
        <button
          onClick={() => handleBrandChange('bishop')}
          className={`flex-1 py-3 px-6 text-sm font-semibold transition-all ${
            isBishop
              ? 'bg-[#0a1220] text-[#c9a96e]'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          style={isBishop ? { fontFamily: "'Cormorant Garamond', serif", fontSize: 15 } : {}}
        >
          {isBishop ? (
            <span>
              Bishop{' '}
              <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>&amp;</em>
              {' '}Finch
            </span>
          ) : (
            'Bishop & Finch'
          )}
        </button>
        <button
          onClick={() => handleBrandChange('nurture')}
          className={`flex-1 py-3 px-6 text-sm font-semibold transition-all ${
            brand === 'nurture'
              ? 'text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          style={brand === 'nurture' ? { backgroundColor: NM_TEAL } : {}}
        >
          nurtureme
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {brand === 'nurture' ? (
                <span style={{ color: NM_TEAL }}>nurtureme</span>
              ) : isBishop ? (
                <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Bishop <em style={{ color: '#c9a96e', fontStyle: 'italic' }}>&</em> Finch
                </span>
              ) : (
                'G2S'
              )}
              <span className="text-gray-400">— Edit Signature</span>
            </CardTitle>
            <CardDescription>Customize your email signature details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={data.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" value={data.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Senior Consultant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" value={data.company} onChange={(e) => handleChange('company', e.target.value)} placeholder="Company Name" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-gray-400" />
                <Input id="email" type="email" value={data.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@company.com" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-gray-400" />
                <Input id="phone" type="tel" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+1 (786) 641-7097" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="flex items-center gap-2">
                <Globe className="size-4 text-gray-400" />
                <Input id="website" value={data.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="growth2success.com" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="flex items-center gap-2">
                <Linkedin className="size-4 text-gray-400" />
                <Input id="linkedin" value={data.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="linkedin.com/company/..." className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-gray-400" />
                <Input id="address" value={data.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="425 Page Mill RD, Palo Alto, CA" className="flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column: layout picker + copy */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="size-4" /> Choose Layout
              </CardTitle>
              <CardDescription>
                {brand === 'nurture'
                  ? 'Choose a layout for your nurtureme signature'
                  : `Single approved layout for your ${isBishop ? 'Bishop & Finch' : 'G2S'} signature`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {brand === 'g2s' ? (
                <LayoutCard label="Layout A – Enterprise Pro" selected={layout === 'a'} onClick={() => setLayout('a')}>
                  <G2SPreviewA data={data} />
                </LayoutCard>
              ) : brand === 'nurture' ? (
                <LayoutCard label="Layout A – Wave Splash" selected={layout === 'a'} onClick={() => setLayout('a')}>
                  <NurturePreviewA data={data} />
                </LayoutCard>
              ) : (
                <LayoutCard label="Layout A – Dark Elegant" selected={layout === 'a'} onClick={() => setLayout('a')}>
                  <BishopPreviewA data={data} />
                </LayoutCard>
              )}
            </CardContent>
          </Card>

          {/* Split copy button */}
          <div className="flex shadow-sm" style={{ borderRadius: 8 }}>
            <button
              onClick={copyAsRich}
              className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold px-4 h-11 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: brand === 'nurture' ? NM_TEAL : isBishop ? '#0a1220' : '#0f172a',
                color: isBishop ? '#c9a96e' : '#fff',
                borderRadius: '8px 0 0 8px',
              }}
            >
              {copiedFormat === 'rich' ? (
                <><Check className="size-4" /> Copied!</>
              ) : (
                <><ClipboardPaste className="size-4" /> Copy Signature</>
              )}
            </button>
            <div style={{ width: 1, backgroundColor: brand === 'nurture' ? '#1fa8b3' : isBishop ? '#2a3a50' : '#2d3f55', flexShrink: 0 }} />
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center justify-center px-3 h-11 outline-none transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: brand === 'nurture' ? NM_TEAL : isBishop ? '#0a1220' : '#0f172a',
                  color: isBishop ? '#c9a96e' : '#fff',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuItem onSelect={copyAsRich} className="gap-3 py-2.5">
                  <ClipboardPaste className="size-4 text-gray-500 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">Paste-Ready</div>
                    <div className="text-xs text-gray-500">Renders visually in Gmail &amp; Outlook</div>
                  </div>
                  {copiedFormat === 'rich' && <Check className="ml-auto size-3.5 text-green-500" />}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={copyAsHTML} className="gap-3 py-2.5">
                  <Code className="size-4 text-gray-500 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">HTML Source</div>
                    <div className="text-xs text-gray-500">Paste into signature settings editor</div>
                  </div>
                  {copiedFormat === 'html' && <Check className="ml-auto size-3.5 text-green-500" />}
                </DropdownMenuItem>
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

          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong className="text-gray-700">Paste-Ready</strong> — paste directly into Gmail / Outlook compose and it renders as your signature.<br />
                <strong className="text-gray-700">HTML Source</strong> — for email client signature settings that accept raw HTML.<br />
                <strong className="text-gray-700">Plain Text</strong> — fallback with no styling.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
