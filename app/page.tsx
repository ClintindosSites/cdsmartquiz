import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-2 p-5">
      <h1 className="font-bold uppercase text-center text-2xl">
        <Image
          src="/logo.png"
          alt="Logo de CDS Quiz"
          width={400}
          height={400}
        />
        Descubra em 2 minutos se sua inteligência está acima da média
      </h1>
      <p className="text-center">
        Mais de 37 mil pessoas já fizeram esta análise cognitiva.
      </p>
      <Link
        href={"/quiz"}
        className="  bg-blue-500
          p-5
          uppercase
          font-bold
          rounded-2xl
          cursor-pointer
          shadow-[0_0_25px_rgba(59,130,246,0.5)]
          hover:scale-105
          transition-all"
      >
        Começar teste
      </Link>
    </div>
  );
}
