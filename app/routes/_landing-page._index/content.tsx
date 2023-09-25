import { useNavigate } from "@remix-run/react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import pkg from "react-reveal";
import { Button } from "~/components/ui/button";

const { Fade } = pkg;

export const LandingPageContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <div className="cont">
        <div className="left" data-aos="fade-right">
          <h1>E-Clean</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
            atque suscipit neque labore blanditiis repudiandae
            jhefjrehrkjehrkjenhrkjehnrkjenhrjkhkjernhfrjenrfrefefrmeb
            frnmeb3frm3efrmealiquid porro voluptatibus soluta optio!
          </p>
        </div>

        <div className="btns" data-aos="fade-left">
          <Button onClick={() => navigate("/sign-in")}>Log In</Button>
          <Button variant="secondary" onClick={() => navigate("/sign-in")}>
            Sign Up
          </Button>
        </div>
      </div>
      <Fade top distance="10%" duration={1500}>
        <h1 id="heads">E-WASTE PRODUCTS</h1>
        <div className="photos">
          <div className="c1">
            <img
              src="https://i.rtings.com/assets/pages/ZRskDBBI/best-laptop-brands-20230420-3-medium.jpg"
              alt=""
              srcSet=""
            />
            <div className="para">
              <h3>Laptops</h3>
            </div>
          </div>
          <div className="c1">
            <img
              src="https://m-cdn.phonearena.com/images/article/64576-wide-two_940/The-Best-Phones-to-buy-in-2023---our-top-10-list"
              alt=""
              srcSet=""
            />
            <div className="para">
              <h3>MobilePhones</h3>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};
