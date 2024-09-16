import Head from "next/head";
import {
  Workshops
} from "../../components/Workshops";
import { SecFooter } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Head>
        <title>Zine | Workshops</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Workshops />
      <SecFooter />
    </>
  );
};

export default Home;
