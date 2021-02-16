import "./main.css";
import hello from "../assets/hello.png";
import Chart from "../Chart/Chart";

const Main = () => {
  return (
    <main>
      <div className="main-container">
        <div className="main-title">
          <img src={hello} alt="hello" />
          <div className="main-greeting">
            <h1>Hello Medishare</h1>
            <p>Welcome to your Dashboard</p>
          </div>
          <div className="main-cards">
            <div className="card">
              <i className="fa fa-user-o fa-2x text-lightblue"></i>
              <div className="card-inner">
                <p className="text-primary-p">Number of Subscribers</p>
                <span className="font-bold text-title">538</span>
              </div>
            </div>
            <div className="card">
              <i className="fa fa-calendar fa-2x text-red"></i>
              <div className="card-inner">
                <p className="text-primary-p">Times of Watching</p>
                <span className="font-bold text-title">5118</span>
              </div>
            </div>
            <div className="card">
              <i className="fa fa-video-camera fa-2x text-yellow"></i>
              <div className="card-inner">
                <p className="text-primary-p">Number of Video</p>
                <span className="font-bold text-title">320</span>
              </div>
            </div>
            <div className="card">
              <i className="fa fa-thumbs-up fa-2x text-green"></i>
              <div className="card-inner">
                <p className="text-primary-p">Number of Likes</p>
                <span className="font-bold text-title">659</span>
              </div>
            </div>
            <div className="charts">
              <div className="charts-left">
                <div className="charts-left-title">
                  <div>
                    <h1>Daily Reports</h1>
                    <p>New Delhi, Delhi, India</p>
                  </div>
                  <i className="fa fa-use"></i>
                </div>
                <Chart />
              </div>
              <div className="charts-right">
                <div className="card1">
                  <h1>Income</h1>
                  <p>$75,300</p>
                </div>
                <div className="card2">
                  <h1>Sales</h1>
                  <p>$124,200</p>
                </div>
                <div className="card3">
                  <h1>Users</h1>
                  <p>3900</p>
                </div>
                <div className="card4">
                  <h1>Orders</h1>
                  <p>1881</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
