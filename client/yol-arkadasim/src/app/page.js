import Link from "next/link";
import "./globals.css"
<<<<<<< HEAD
export default function Home() {
  return (
    <div >
      <Link href="/">Hello</Link>
=======
import HomePage from "./home/page";
export default function Home() {
  return (
    <div >
      <HomePage/>
>>>>>>> da265e4 (Merge pull request #39 from oguzhankuzlukluoglu/oguzhan)
    </div>
  );
}
