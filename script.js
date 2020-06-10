let canvas = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas,true);


let loadingScreenDiv = window.document.getElementById("loadingScreen");
function customScreen(){
  console.log("Loading Assets");
}

customScreen.prototype.displayLoadingUI = function(){
  console.log("Loading...");
  loadingScreenDiv.innerHTML = "BKC IS LOADING!";
};

customScreen.prototype.hideLoadingUI = function(){
  console.log("loaded");
  loadingScreenDiv.style.display = "none";
}
let loadingScreen = new customScreen();
engine.loadingScreen = loadingScreen;
engine.displayLoadingUI();


BABYLON.SceneLoader.Load("","https://res.cloudinary.com/weatherapi/raw/upload/v1591741120/burg/burger_hemwc0.babylon",engine,function(newScene){
  let scene = newScene;
  scene.executeWhenReady(function(){
    scene.clearColor = new BABYLON.Color4(0, 0, 0,0);
   var light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene); 
   light.intensity = 0.9;
    
    
// Parameters: alpha, beta, radius, target position, scene
    var Arccamera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
  
    Arccamera.wheeldeltapercentage = 0.025;
    Arccamera.wheelPrecision = 2400;
    
// Positions the camera overwriting alpha, beta, radius
    Arccamera.setPosition(new BABYLON.Vector3(10, 0, 0));

// This attaches the camera to the canvas
    scene.activeCameras.push(Arccamera);
    Arccamera.attachControl(canvas, true);
    
    // scene.activeCamera.attachControl(canvas);
    engine.runRenderLoop(function(){
      scene.render();
    });
  });
});

window.addEventListener('resize',function(){
  engine.resize();
});


