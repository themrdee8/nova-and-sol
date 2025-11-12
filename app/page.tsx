// import Image from "next/image";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import banner from "../public/images/banner.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Navbar />
        <div>
          <Image src={banner} alt="banner" />
          <p className="">shop now</p>
        </div>
        <Link href="/streetWear"><p>street wear</p></Link>
        <Link href="/theSolStrand"><p>the sol strand</p></Link>
        <Link href="/amari"><p>amari</p></Link>
        <Link href="/theCharmBar"><p>the charm bar</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
        <Link href="/thePerfectFind"><p>the perfect find</p></Link>
      </main>
    </div>
  );
}
