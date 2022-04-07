import React, { useEffect, useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import './Graph.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const backgrounds = importAll(require.context('../assets/backgrounds/', false, /\.(png|jpe?g|svg)$/));
const characters = importAll(require.context('../assets/characters/', false, /\.(png|jpe?g|svg)$/));

function Graph({
    content,
    onDelete,
    onChange,
    onMove,
    onAdd // (id, tag), tag = {0: next, 1: succ, 2: fail}
}) {

    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState("");
    const [path, setPath] = useState("0");

    // modal
    const [showMod, setShowMod] = useState(false);
    const [modId, setModId] = useState(content[0].id);
    const [modBg, setModBg] = useState(content[0].attributes.BImg);
    const [modEn, setModEn] = useState(content[0].attributes.bImg);
    const [modP1, setModP1] = useState(content[0].attributes.p1);
    const [modP2, setModP2] = useState(content[0].attributes.p2);
    const [modTxt, setModTxt] = useState(content[0].attributes.txt);
    const [modWait, setModWait] = useState(content[0].attributes.wait);
    const [modSpeakP1, setModSpeakP1] = useState(content[0].attributes.who % 2 == 0);
    const [modSpeakP2, setModSpeakP2] = useState(content[0].attributes.who <= 1);

    const setModStep = (step) => {
        setModId(step.id);
        setModBg(step.attributes.BImg);
        setModEn(step.attributes.bImg);
        setModP1(step.attributes.p1);
        setModP2(step.attributes.p2);
        setModTxt(step.attributes.txt);
        setModWait(step.attributes.wait > 0);
        setModSpeakP1(step.attributes.who % 2 == 1);
        setModSpeakP2(step.attributes.who > 1);
    }

    const getModStep = (postFun) => {
        postFun({
            id: modId,
            attributes:
            {
                BImg: modBg,
                bImg: modEn,
                p1: modP1,
                p2: modP2,
                txt: modTxt,
                who: (modSpeakP1 ? 1 : 0) + (modSpeakP2 ? 2 : 0),
                wait: (modWait ? 1 : 0)
            }
        });
    }


    const generatePath = (nodes, nbPath = 0) => {
        return (
            <div className={"path" + nbPath}>
                {
                    nodes.map((item, i) => {
                        return (
                            <div className='step'>
                                <div className='card'>
                                    <div className='nbStep'>
                                        {item.id}
                                        {item.attributes.wait != 0 && <div className="stopSymbole"></div>}
                                    </div>

                                    <div className='lilScene'>
                                        <img className="lilBackground" src={backgrounds['./' + item.attributes.BImg]} />

                                        {item.attributes.bImg != "" &&
                                            <img className="lilEnigme" src={backgrounds['./' + item.attributes.bImg]} />
                                        }

                                        <img className={"lilCharacter lilP1 " + (item.attributes.who % 2 == 0 ? 'lilNotSpeaking' : '')} src={characters['./' + item.attributes.p1]} />
                                        <img className={"lilCharacter lilP2 " + (item.attributes.who <= 1 ? 'lilNotSpeaking' : '')} src={characters['./' + item.attributes.p2]} />

                                        <div className='lilBulle'>
                                            {item.attributes.txt}
                                        </div>
                                    </div>



                                    <div className="manageBtn">
                                        <button className="editBtn" onClick={() => {
                                            setModStep(item);
                                            setShowMod(true);
                                        }}>Editer</button>

                                        {
                                            // you can't delete the first step
                                            (i != 0 || nbPath != 0) &&
                                            <button className="deleteBtn" onClick={() => onDelete(item.id)}>Supprimer</button>
                                        }
                                        <button className="addBtn" onClick={() => onAdd(item.id, 0)}>Ajouter Next</button>
                                        {nbPath == 0 && i != 0 && <button className="addBtn" onClick={() => onAdd(item.id, 2)}>Ajouter Fail</button>}
                                        {nbPath == 0 && i != 0 && <button className="addBtn" onClick={() => onAdd(item.id, 1)}>Ajouter Success</button>}
                                    </div>


                                </div>
                                <div className='alternate'>
                                    {
                                        item.succ.length !== 0 &&
                                        generatePath(item.succ, nbPath + 1)
                                    }
                                    {
                                        item.fail.length !== 0 &&
                                        generatePath(item.fail, nbPath + 1)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const generateDropDown = (listFile, modItem, setModItem) => {
        return (
            <Dropdown
                onSelect={(eventkey, event) => {
                    setModItem(eventkey);
                }}
            >
                <Dropdown.Toggle id="dropdown-custom-components">
                    {modItem != "" &&
                        <img
                            className="popUpImg"
                            src={listFile['./' + modItem]}
                        />
                    }
                    {modItem == "" && <div>Pas d'image</div>}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="">
                        Aucune
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {
                        Object.keys(listFile).map(key => {
                            return (
                                <Dropdown.Item eventKey={key.split('/')[1]}>
                                    <img
                                        className="popUpImg"
                                        src={listFile[key]}
                                    />
                                </Dropdown.Item>
                            )
                        })
                    }

                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <div className='story'>
            {false &&
                <form onSubmit={() => onMove(moveFrom, moveTo, parseInt(path))}>
                    <label>
                        Déplacer l'étape :
                        <input type="text" value={moveFrom} onChange={(e) => setMoveFrom(e.target.value)} />
                    </label>
                    <label>
                        juste avant l'étape :
                        <input type="text" value={moveTo} onChange={(e) => setMoveTo(e.target.value)} />

                    </label>
                    <label>
                        <input type="radio" value="0" onChange={(e) => setPath(e.target.value)} checked={path === "0"} />
                        next
                    </label>
                    <label>
                        <input type="radio" value="1" onChange={(e) => setPath(e.target.value)} checked={path === "1"} />
                        success
                    </label>
                    <label>
                        <input type="radio" value="2" onChange={(e) => setPath(e.target.value)} checked={path === "2"} />
                        fail
                    </label>
                    <input type="submit"></input>
                </form>
            }
            {
                generatePath(content)
            }

            <Modal show={showMod} onHide={() => { setShowMod(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Modification</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {generateDropDown(backgrounds, modBg, setModBg)}
                    {generateDropDown(backgrounds, modEn, setModEn)}
                    {generateDropDown(characters, modP1, setModP1)}
                    {generateDropDown(characters, modP2, setModP2)}
                    <textarea type="text" value={modTxt} onChange={(e) => setModTxt(e.target.value)} />
                    <label>
                        <input type="checkbox" checked={modSpeakP1} onChange={(e) => setModSpeakP1(e.currentTarget.checked)} />
                        Perso gauche
                    </label>
                    <label>
                        <input type="checkbox" checked={modSpeakP2} onChange={(e) => setModSpeakP2(e.currentTarget.checked)} />
                        Perso droite
                    </label>
                    <label>
                        <input type="checkbox" checked={modWait} onChange={(e) => setModWait(e.currentTarget.checked)} />
                        Attendre à cette étape
                    </label>



                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowMod(false) }}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            getModStep(onChange);
                            setShowMod(false);
                        }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

// return a dictionnary (key, value) = ("./name.png", source in the context)
function importAll(r) {
    var imports = {};
    var keys = r.keys();
    for (let i = 0; i < keys.length; i++) {
        imports[keys[i]] = r(keys[i]);
    }
    return imports;
}

export default Graph;