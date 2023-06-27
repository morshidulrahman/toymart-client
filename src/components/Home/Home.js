import Clock from "../../pages/Clock";
import Limited from "../../pages/Limited";
import Slider from "../Hero/Slider";
import Services from "../Services/Services";
import Shop from "../Shop/Shop";
import Helmet from "../shared/Helmet";

function Home() {
  return (
    <>
      <Helmet title="Home" />
      <Slider />
      <Services />
      <Shop />
      <Limited />
    </>
  );
}

export default Home;
