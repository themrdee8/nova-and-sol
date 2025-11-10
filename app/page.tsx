// import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <main className="">
        Nova and Sol
        <Link href="/streetWear"><p>street wear</p></Link>
        <Link href="/theSolStrand"><p>the sol strand</p></Link>
        <Link href="/amari"><p>amari</p></Link>
        <Link href="/theCharmBar"><p>the charm bar</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
      </main>
    </div>
  );
}
