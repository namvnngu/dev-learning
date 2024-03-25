import styles from "../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="keywords" content="ninjas"/>
      </Head>
      <div>
        <h1 className={styles.title}>Hello</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          nulla iste assumenda consequuntur voluptatem? Ipsa aliquam assumenda
          ullam in, possimus asperiores corporis ea tenetur esse sapiente
          eveniet. Facilis, sequi fuga.
        </p>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          nulla iste assumenda consequuntur voluptatem? Ipsa aliquam assumenda
          ullam in, possimus asperiores corporis ea tenetur esse sapiente
          eveniet. Facilis, sequi fuga.
        </p>
        <Link href="/ninjas">
          <a className={styles.btn}>See Ninjas Listing</a>
        </Link>
      </div>
    </>
  );
}
