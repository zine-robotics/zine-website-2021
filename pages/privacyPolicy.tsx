import type { NextPage } from "next";
import Head from "next/head";
import Privacy from "../components/privacy";
import { Footer, SecFooter } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ChatButton } from "../components/Chat";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Zine | Privacy Policy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Privacy />
      {/* <ChatButton /> */}
      <></>
      <SecFooter />
    </>
  );
};

export default Home;
