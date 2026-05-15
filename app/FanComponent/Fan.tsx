import React from "react";

const FanIcon = () => {
  return (
    <div className="fan-wrapper">
      <div className="fan">
        <div className="blade blade-top"></div>
        <div className="blade blade-right"></div>
        <div className="blade blade-bottom"></div>
        <div className="blade blade-left"></div>

        <div className="center-ring">
          <div className="center-core"></div>
        </div>
      </div>

      <style>{`
        .fan-wrapper {
          width: 450px;
          height: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fan {
          position: relative;
          width: 300px;
          height: 300px;
        }

        .blade {
          position: absolute;
          background: linear-gradient(
            180deg,
            rgba(70, 90, 130, 0.5),
            rgba(40, 55, 90, 0.85)
          );
          border-radius: 999px;
          box-shadow: inset 0 0 20px rgba(255,255,255,0.03);
        }

        .blade-top {
          width: 72px;
          height: 190px;
          left: 50%;
          transform: translateX(-50%);
          top: -10px;
        }

        .blade-bottom {
          width: 72px;
          height: 190px;
          left: 50%;
          transform: translateX(-50%);
          bottom: -10px;
        }

        .blade-left {
          width: 190px;
          height: 72px;
          top: 50%;
          transform: translateY(-50%);
          left: -10px;
        }

        .blade-right {
          width: 190px;
          height: 72px;
          top: 50%;
          transform: translateY(-50%);
          right: -10px;
        }

        .center-ring {
          position: absolute;
          width: 95px;
          height: 95px;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            rgba(60, 75, 110, 0.9),
            rgba(25, 35, 60, 1)
          );
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow:
            inset 0 0 12px rgba(255,255,255,0.05),
            0 0 20px rgba(0,0,0,0.4);
        }

        .center-core {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            #263457,
            #111a33 70%
          );
          box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  );
};

export default FanIcon;