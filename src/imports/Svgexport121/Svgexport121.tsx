import svgPaths from "./svg-d2ign0exee";
import { imgGroup, imgGroup1 } from "./svg-rf7xx";

function Group1() {
  return (
    <div className="absolute inset-[0.35%_-0.1%_0.5%_0.45%] mask-position-[-3.457px_-3.502px,_-3.457px_-3.502px]" style={{ maskImage: `url('${imgGroup}'), url('${imgGroup1}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 765.287 987.496">
        <g id="Group">
          <path d={svgPaths.p95bce80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3c541200} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p3dad2380} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2f9d5e0} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p366eb580} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p3a60a180} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p38ff8080} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p336f5100} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p2023cc00} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p3ced900} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p137d5e00} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.p37e6eb00} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p16590a80} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p11521000} fill="var(--fill-0, white)" id="Vector_14" />
          <path d={svgPaths.p1cc3eb00} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p9b77800} fill="var(--fill-0, white)" id="Vector_16" />
          <path d={svgPaths.p3262d00} fill="var(--fill-0, white)" id="Vector_17" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[0_0_0.26%_0]" data-name="Mask group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0_0_0.26%_0]" data-name="Group">
      <MaskGroup />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[0_0_0.26%_0]" data-name="Clip path group">
      <Group />
    </div>
  );
}

export default function Svgexport() {
  return (
    <div className="relative size-full" data-name="svgexport-1 (2) 1">
      <ClipPathGroup />
    </div>
  );
}