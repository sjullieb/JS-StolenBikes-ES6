import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { BikeService } from './bikes.js';

$(document).ready(function() {

  let location = "";
  let distance = "";
  let stolenness = "proximity";
  let color1 = "";
  let color2 = "";
  let count1 = 0;
  let count2 = 0;

  $('#search-form').submit(function(event) {
    event.preventDefault();
    location = $("#location").val();
    distance = $('#distance').val();
    color1 = $("#color1").val();
    color2 = $("#color2").val();

    showResults();
  });

  function showResults(){
    let bikeService = new BikeService();

    let promise1 = bikeService.getBikeInfo(color1, location, distance);
    let promise2 = bikeService.getBikeInfo(color2, location, distance);
    promise1.then(function(response){
      let body = JSON.parse(response);
      console.log(1);
      console.log(body);
      if (location === ""){
        count1 = body.stolen;
      }
      else {
        count1 = body.proximity;
      }
    });
    promise2.then(function(response){
      let body = JSON.parse(response);
      console.log(2);
      console.log(body);
      if (location === ""){
        count2 = body.stolen;
      }
      else {
        count2 = body.proximity;
      }
    });

    Promise.all([promise1, promise2]).then(function(){
      $("#count1").text(color1 + ": "+ count1);
      $("#count2").text(color2 + ": "+ count2);
    });

// ===================== chained Promises =====================

    // bikeService.getBikeInfo(color1, location, distance)
    //   .then(function(response){
    //     let body = JSON.parse(response);
    //     console.log(1);
    //     console.log(body);
    //     if (location === ""){
    //       count1 = body.stolen;
    //     }
    //     else {
    //       count1 = body.proximity;
    //     }
    //     return bikeService.getBikeInfo(color2, location, distance);
    //   })
    //   .then(function(response){
    //     let body = JSON.parse(response);
    //     console.log(2);
    //     console.log(body);
    //     if (location === ""){
    //       count2 = body.stolen;
    //     }
    //     else {
    //       count2 = body.proximity;
    //     }
    //     $("#count1").text(color1 + ": "+ count1);
    //     $("#count2").text(color2 + ": "+ count2);
    //   });
  }
});
