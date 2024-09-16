import type { NextPage } from "next";
import Head from "next/head";
import TandC from "../components/TandC";
import { Footer, SecFooter } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ChatButton } from "../components/Chat";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zine | Terms and Conditions</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <TandC />
      {/* <ChatButton /> */}
      <></>
      <SecFooter />
    </>
  );
};

export default Home;
