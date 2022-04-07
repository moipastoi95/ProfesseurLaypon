import React, { useEffect, useState } from 'react';
import  './Home.css';

// return a dictionnary (key, value) = ("./name.png", source in the context)
function importAll(r) {
  var imports = {};
  var keys = r.keys();
  for (let i = 0; i < keys.length; i++) {
    imports[keys[i]] = r(keys[i]);
  }
  return imports;
}

function Home({ socket }) {
  const [BImg, setBImg] = useState("village.png");
  const [bImg, setbImg] = useState("enigme1.jpg");
  const [p1, setP1] = useState("layton.png");
  const [p2, setP2] = useState("erin.png");
  const [txt, setTxt] = useState("Professeur Laypon");
  const [who, setWho] = useState(1);


  useEffect(() => {
    const updateDisplay = (step) => {

      console.log("object reçu : " + JSON.stringify(step));

      if (step.hasOwnProperty("BImg")) {
        setBImg(step.BImg);
      }
      if (step.hasOwnProperty("bImg")) {
        setbImg(step.bImg);
      }
      if (step.hasOwnProperty("p1")) {
        setP1(step.p1);
      }
      if (step.hasOwnProperty("p2")) {
        setP2(step.p2);
      }
      if (step.hasOwnProperty("txt")) {
        setTxt(step.txt);
      }
      if (step.hasOwnProperty("who")) {
        setWho(step.who);
      }

      console.log("object modif : " + JSON.stringify(step));
    };

    // handshake
    socket.emit('data', {admin: false});

    socket.on('data', updateDisplay);

    return () => {
      socket.off('data', updateDisplay);
    };
  }, [socket]);

  const backgrounds = importAll(require.context('../assets/backgrounds/', false, /\.(png|jpe?g|svg)$/));
  const characters = importAll(require.context('../assets/characters/', false, /\.(png|jpe?g|svg)$/));

  const skip = () => {
    socket.emit('data', {});
  };

  return (
    <form className="screen" onClick={skip}>
      <img className="background" src={backgrounds['./' + BImg]} />
      {bImg != "" &&
        <img className="enigme" src={backgrounds['./' + bImg]} />
      }
      <img className={"character p1 " + (who % 2 == 0 ? 'notSpeaking' : '')} src={characters['./' + p1]} />
      <img className={"character p2 " + (who <= 1 ? 'notSpeaking' : '')} src={characters['./' + p2]} />
      {
        txt != "" &&
        <div className='bulle'>
          {txt}
          <div className='skipTri'></div>
        </div>
      }
    </form>
  );
}

export default Home;