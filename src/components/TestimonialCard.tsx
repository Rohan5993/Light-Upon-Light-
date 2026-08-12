import { siteImages } from "../assets/siteImages";

function TestimonialCard({
  quote,
  name,
  role,
  img,
}: {
  quote: string;
  name: string;
  role: string;
  img: string;
}) {
  return (
    <article className="w-full h-full min-w-0 bg-white p-8 md:p-10 rounded-2xl flex flex-col border border-solid border-[1px] border-slate-200">
      <img
        src={siteImages.quoteMark}
        alt=""
        aria-hidden="true"
        className="w-24 h-auto md:w-28 mb-5 shrink-0"
      />
      <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed flex-1 mb-8 break-words whitespace-normal">
        {quote}
      </p>
      <div className="flex flex-row items-center gap-4 pt-4 border-t border-slate-100 min-w-0 mt-auto">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-violet-200/70 shadow-md overflow-hidden shrink-0">
          <img src={img} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-bold text-slate-900 text-sm md:text-base break-words">{name}</p>
          <p className="text-[10px] md:text-xs font-bold text-violet-600 tracking-widest uppercase break-words">{role}</p>
        </div>
      </div>
    </article>
  );
}

export { TestimonialCard };
