import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = ({ socket }) => {

    const [p1, setP1] = useState(false);
    const [p2, setP2] = useState(false);
    const [txt, setTxt] = useState("");

    const sendTxt = (e) => {
        e.preventDefault();
        const upd = { admin: true, p1: p1, p2: p2, txt: txt };
        socket.emit('data', upd);

        setTxt("");
    }

    const sendInput = (e, n) => {
        e.preventDefault();
        const upd = { admin: true, input: n };
        socket.emit('data', upd);
    }

    return (
        <div className='adminPanel'>
            <form className="speechForm" onSubmit={sendTxt}>
                <div className='checkbox'>
                    <label>
                        <input type="checkbox" checked={p1} onChange={(e) => setP1(e.currentTarget.checked)} />
                        Perso gauche
                    </label>
                    <label>
                        <input type="checkbox" checked={p2} onChange={(e) => setP2(e.currentTarget.checked)} />
                        Perso droite
                    </label>
                </div>
                <textarea value={txt} onChange={(e) => setTxt(e.currentTarget.value)} />
                <button type="submit">Envoyer</button>
            </form>

            <div className='fastSpeechBtn sectionBtn'>
                <form onSubmit={(e) => sendInput(e, 0)}>
                    <button type="submit">Reset dialogue</button>
                </form>

                <form onSubmit={(e) => sendInput(e, 2)}>
                    <button type="submit">Dire 'Non'</button>
                </form>
            </div>


            <div className='tempBtn sectionBtn'>
                <form onSubmit={(e) => sendInput(e, 4)}>
                    <button className="corrBtn" type="submit">Enigme correcte</button>
                </form>

                <form onSubmit={(e) => sendInput(e, 5)}>
                    <button className="incorrBtn" type="submit">Enigme incorrecte</button>
                </form>

                <form onSubmit={(e) => sendInput(e, 1)}>
                    <button className="skipBtn" type="submit">Skiper</button>
                </form>
            </div>

            Scroll pour recommencer depuis le début ...



            <form className='restartBtn sectionBtn' onSubmit={(e) => sendInput(e, 3)}>
                <button type="submit">Recommencer depuis le début</button>
            </form>


        </div>

    );
};

export default Admin;