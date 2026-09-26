import { useEffect } from "react";

function Timer() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Timer running...");
    }, 1000);

    // return () => {
    //   console.log("Cleanup called!");
    //   clearInterval(timer);
    // };
  }, []);

  return <h2>Timer is visible</h2>;
}

export default Timer;