// components/FakeAd.tsx
"use client";

export default function FakeAd({ title, img }: { title: string; img: string }) {
  return (
    <div className="mb-8 w-[240px] rounded-3xl bg-black/70 shadow-2xl border border-zinc-800 backdrop-blur-lg overflow-hidden animate-fade-in">
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover"
        style={{ filter: "brightness(0.93) contrast(1.08)" }}
      />
      <div className="p-4 text-lg font-bold text-white text-center">{title}</div>
      <div className="px-3 pb-4 text-sm text-zinc-400 text-center">
        Pub fictive
      </div>
    </div>
  );
}
