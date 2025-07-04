import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Frekans Tibb Mərkəzi – mərhələli inkişaf etmiş, müasir tibbi
            xidmətlərin göstərilməsinə həsr olunmuş bir müəssisədir. Bizim
            peşəkar həkim və tibb işçilərindən ibarət komandamız hər bir
            xəstənin ehtiyaclarına uyğun fərdi və qayğıkeş yanaşma təqdim etməyə
            sadiqdir. ZeeCare-də biz sizin sağlamlığınızı ön planda tuturuq və
            sizi sağlam və balanslı həyata doğru harmoniya içində yönəltməyə
            çalışırıq.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
