import React, { useEffect, useState } from 'react';
import './Manage.css';
import Graph from './Graph.js';


const defGraph = [
    {
        id: 1,
        attributes: {
            BImg: "",
            bImg: "",
            p1: "",
            p2: "",
            txt: "",
            who: 0,
            wait: 0,
        },
        succ: [],
        fail: []
    }
]


function Manage({ socket }) {
    const [graph, setGraph] = useState(defGraph);

    useEffect(() => {
        const displayData = (node) => {
            setGraph(node);
        }

        // handshake
        socket.emit('data', { admin: true, input: 6 });

        socket.on('data', displayData);

        return () => {
            socket.off('data', displayData);
        };
    }, [socket]);

    // add, change, move or remove steps (respectively mode=0, 1, 2, 3)
    const onDelete = (idCurr) => {
        socket.emit('data', { input: 7, changes: { mode: 3, idCurr: idCurr } })
    }

    const onChange = (stepCurr) => {
        socket.emit('data', { input: 7, changes: { mode: 1, stepCurr: stepCurr } })
    }

    const onMove = (idCurr, idParent, path) => {
        socket.emit('data', { input: 7, changes: { mode: 2, idCurr: idCurr, idParent: idParent, path: path } })
    }

    // id of the parent
    const onAdd = (idParent, path) => {
        socket.emit('data', { input: 7, changes: { mode: 0, idParent: idParent, path: path } })
    }

    return (
        <div className='cont'>
            <button onClick={() => { socket.emit('data', { input: 6 }) }}>Refresh</button>
            <Graph
                content={graph}
                onDelete={onDelete}
                onChange={onChange}
                onMove={onMove}
                onAdd={onAdd}
            />
        </div>
    );
}

export default Manage;