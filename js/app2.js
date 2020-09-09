"use strict";

$().ready(() => {
  const animalArray = [];
  // get data with ajax
  $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(
    (hornyAnimals) => {
      //create a new animal object for each element in hornyAnimals array
      hornyAnimals.forEach((beast) => {
        new Animal(beast);
      });
      //run gather function after animals data was GOT with ajax
      gatherKeywords();
      animalArray.forEach((critter) => {
        $("main").append(critter.createHtml());
      });
    }
  );
  //constructor function
  function Animal(object) {
    this.title = object.title;
    this.image_url = object.image_url;
    this.description = object.description;
    this.keyword = object.keyword;
    this.horns = object.horns;
    animalArray.push(this);
  }
  //keyword function
  const gatherKeywords = () => {
    const keywordArray = [];
    animalArray.forEach((animal) => {
      //if keyword is not in keyword array for each animal.
      if (!keywordArray.includes(animal.keyword)) {
        keywordArray.push(animal.keyword);
      }
    });
    //create option elements inside the select parent
    keywordArray.forEach((keyword) => {
      //create new option tag, give it value, text of this keyword
      const $selector = $(`<option value="${keyword}">${keyword}</option>`);
      $("select").append($selector);
    });
  };
  // event handler on option change
  $("#menu").on("change", eventHandler);
  function eventHandler(event) {
    $("section").hide();
    animalArray.forEach((object) => {
      if (event.target.value === object.keyword) {
        // console.log(object);
        $(`section[class = ${object.keyword}]`).show();
      }
    });
  }

  Animal.prototype.createHtml = function () {
    //get template from html
    let template = $("#beast").html();
    //use mustache to create new instance of template with object from data
    let html = Mustache.render(template, this);
    //return html from this method
    return html;
  };
});
