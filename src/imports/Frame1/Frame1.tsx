export default function Frame() {
  return (
    <div className="bg-[#444] border border-[rgba(255,255,255,0.1)] border-solid font-['Cormorant_Garamond:Medium',sans-serif] font-medium leading-[0] overflow-clip relative rounded-[2px] size-full text-[128px] whitespace-nowrap">
      <p className="absolute left-[57px] text-[#e8e4dd] top-[31px]">
        <span className="leading-[normal]">{`Bishop `}</span>
        <span className="font-['Cormorant_Garamond:Medium_Italic',sans-serif] italic leading-[normal] text-[#c9a96e]">{`&`}</span>
        <span className="leading-[normal]">{` Finch`}</span>
      </p>
      <p className="absolute left-[57px] text-[#0a1220] top-[203px]">
        <span className="leading-[normal]">{`Bishop `}</span>
        <span className="font-['Cormorant_Garamond:Medium_Italic',sans-serif] italic leading-[normal] text-[#c9a96e]">{`&`}</span>
        <span className="leading-[normal]">{` Finch`}</span>
      </p>
    </div>
  );
}