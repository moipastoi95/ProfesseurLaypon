import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
// import Home from "./screen/Home";
// import Admin from "./screen/Admin";
// import Manage from "./screen/Manage";

const MyStack = () => {
  const [socket, setSocket] = useState(null)
  
  useEffect(() => {
    const newSocket = io(`backlaypon.alwaysdata.net`, {transports: ['websocket']}); // http://${window.location.hostname}:3000
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // show different screen according to the url
  const urlpath = window.location.pathname;
  return (
    <div>
      C'est bon ça marche
    </div>
  )
  if (urlpath == '/') {
    return (
      <div>
        {socket ? (
          <div>
            <Home socket={socket}/>
          </div>
        ) : (
          <div>Not connected</div>
        )}
      </div>
    );
  } else if (urlpath == '/admin') {
    return (<div>
      {socket ? (
        <div>
          <Admin socket={socket}/>
        </div>
      ) : (
        <div>Not connected</div>
      )}
    </div>);
  } else if (urlpath == '/manage') {
    return (<div>
      {socket ? (
        <div>
          <Manage socket={socket}/>
        </div>
      ) : (
        <div>Not connected</div>
      )}
    </div>);
  } else {
    return (<div></div>);
  }

  
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
