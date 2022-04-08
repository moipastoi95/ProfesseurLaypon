import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Home from "./screen/Home";
import Admin from "./screen/Admin";
import Manage from "./screen/Manage";

const MyStack = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(`http://backlaypon-env.eba-q7y4uvtd.eu-west-3.elasticbeanstalk.com/`, { transports: ['websocket'] }); // http://${window.location.hostname}:3000
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // return (
  // <Router>
  //   <Routes>
  //     <Route path="/" element={socket ? (
  //         <div>
  //           <Home socket={socket}/>
  //         </div>
  //       ) : (
  //         <div>Not connected</div>
  //       )} />
  //     <Route path="/admin" element={socket ? (
  //       <div>
  //         <Admin socket={socket}/>
  //       </div>
  //     ) : (
  //       <div>Not connected</div>
  //     )} />
  //     <Route path="/manage" element={socket ? (
  //       <div>
  //         <Manage socket={socket}/>
  //       </div>
  //     ) : (
  //       <div>Not connected</div>
  //     )} />
  //   </Routes>
  // </Router>
  // )

  return (<div>
    {socket ? (
      <div>
        <Admin socket={socket} />
      </div>
    ) : (
      <div>Not connected</div>
    )}
  </div>
  )
};

export default MyStack











// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
