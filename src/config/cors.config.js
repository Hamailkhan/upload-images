var whitelist = [
  "http://localhost:5173",
  "https://safro.vercel.app",
  "http://localhost:8006",
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = {
  corsOptions,
};
