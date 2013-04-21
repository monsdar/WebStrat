
$(document).ready(function() {
  
  var currentStep = 0;
  
  $( ".draggable" ).draggable({ 
    containment: "parent",
    
    stop: function() {
      $(this).data("y" + currentStep, $(this).css('top'));
      $(this).data("x" + currentStep, $(this).css('left'));
      
      console.log("x" + currentStep + ": " + $(this).data("x" + currentStep));
      console.log("y" + currentStep + ": " + $(this).data("y" + currentStep));
    } 
  });

  var updateObjects = function() {
    $.each($(".draggable"), function(index, item) {
      $(item).animate(
        {top: $(item).data("y" + currentStep), 
         left: $(item).data("x" + currentStep)}, 
        200 );
    });
  };
  
  $('input[name="prevStep"]').click(function(){
    currentStep--;
    $("h1").text("Step: " + currentStep);
    
    updateObjects();
  });
  
  $('input[name="nextStep"]').click(function(){
    currentStep++;
    $("h1").text("Step: " + currentStep);
    
    updateObjects();
  });
  
});