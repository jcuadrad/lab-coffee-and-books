// var express = require("express");
// var router = express.Router();

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });

// module.exports = router;

const express = require("express");

const router = express.Router();

const Place = require("../models/place");

// router.route(/)

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/new", (req, res, next) => {
  res.render("new");
});

router.post("/new", (req, res, next) => {
  // Get Params from POST
  let location = {
    type: "Point",
    coordinates: [req.body.longitude, req.body.latitude]
  };

  // Create a new Place with location
  const newPlace = new Place({
    name: req.body.name,
    description: req.body.description,
    business: req.body.business,
    location: location
  });

  // Save the restaurant to the Database
  newPlace.save(error => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("new");
    }
  });
});

router.get("/map", (req, res, next) => {
  Place.find((error, places) => {
    if (error) {
      next(error);
    } else {
      res.render("map", { places });
    }
  });
});

module.exports = router;