import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Frekans Tibb Mərkəzi – sağlamlığınıza dəyər verən, peşəkarlıq və
            insani münasibəti birləşdirən aparıcı tibbi mərkəzdir. Müasir
            texnologiyalarla təchiz olunmuş klinikamızda yüksək ixtisaslı
            həkimlər və təcrübəli tibbi heyət sizə tam spektrli tibbi xidmətlər
            təqdim edir. Hər bir xəstəyə fərdi yanaşmanı əsas götürərək, yalnız
            müalicə deyil, həm də profilaktika və ümumi sağlamlıq yönümlü həllər
            təklif edirik. Bizim məqsədimiz – hər bir pasiyentin rifahını və
            həyat keyfiyyətini yaxşılaşdırmaqdır. Frekans – sağlam gələcəyinizin
            etibarlı ünvanıdır.
          </p>

          
        
        </div>
      </div>
    </>
  );
};

export default Biography;
