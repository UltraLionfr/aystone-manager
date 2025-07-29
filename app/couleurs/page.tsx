import Image from "next/image";

export const metadata = {
  title: "Charte des couleurs Minecraft",
};
export default function CouleursPage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-center">
        🎨 Charte des couleurs Minecraft
      </h1>
      <div className="w-full max-w-4xl">
        <Image
          src="/charte-couleurs.png"
          alt="Charte des couleurs Minecraft"
          width={1000}
          height={563}
          className="rounded-xl shadow-xl w-full h-auto"
        />
      </div>
    </div>
  );
}