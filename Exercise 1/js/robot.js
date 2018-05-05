var Robot = function() {

    this.root = new THREE.Object3D;
};
var selection,parent,s=0,Arr=[];
var Axis=[];
var flag=false;

console.log("key w = select parent node \nkey s = select first child node \nkeys a & d = selecting children nodes backward (a) & forward (d), in start go forward with d to come back with a");
console.log("keys ArorwUp & ArrowDown = Rotaion of selected node on X Axis \nkeys ArorwLeft & ArrowRight = Rotaion of selected node on Z Axis");
console.log("keys y & x = Rotaion of selected node on Y Axis \nkey r = reset the whole robot to initial position \nkey c = switch the visibility of coordinate systems");
console.log("key k (keep long prssed) = makes robot dance (Bonus Part)\n");


Robot.prototype.buildRobot = function(){

    var geometry = new THREE.BoxGeometry( 0.3, 0.3, 0.1 );
    // https://threejs.org/docs/#api/materials/MeshLambertMaterial
    var material = new THREE.MeshLambertMaterial( {
        color: "red",  // CSS color names can be used!
    } );
   var Sgeometry = new THREE.SphereGeometry( 0.11, 40, 40 );
var Smaterial = new THREE.MeshLambertMaterial( {
        color: "yellow",  // CSS color names can be used!
    } );
var RAgeometry = new THREE.BoxGeometry( 0.23, 0.1, 0.1 );
var RAmaterial = new THREE.MeshLambertMaterial( {
        color: "yellow",  // CSS color names can be used!
    } );

var LAgeometry = new THREE.BoxGeometry( 0.23, 0.1, 0.1 );
var LAmaterial = new THREE.MeshLambertMaterial( {
        color: "yellow",  // CSS color names can be used!
    } );

var LLgeometry = new THREE.BoxGeometry( 0.1, 0.25, 0.1 );
var LLmaterial = new THREE.MeshLambertMaterial( {
        color: "yellow",  // CSS color names can be used!
    } );


var RLgeometry = new THREE.BoxGeometry( 0.1, 0.25, 0.1 );
var RLmaterial = new THREE.MeshLambertMaterial( {
        color: "yellow",  // CSS color names can be used!
    } );

var LFgeometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
var LFmaterial = new THREE.MeshLambertMaterial( {
        color: "blue",  // CSS color names can be used!
    } );

var RFgeometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
var RFmaterial = new THREE.MeshLambertMaterial( {
        color: "blue",  // CSS color names can be used!
    } );


    //a mesh consists of geometry and a material; added to the scene
var torso = new THREE.Mesh( geometry, material );
    this.root.add(torso);
    
// renderer.render(torso, camera);

var sphere = new THREE.Mesh(Sgeometry,Smaterial);
    sphere.position.set(0,0.28,0);
    torso.add(sphere);

var LArm = new THREE.Mesh( LAgeometry, LAmaterial );
    LArm.position.set(-0.3,0.1,0);
    torso.add(LArm);

var RArm = new THREE.Mesh( RAgeometry, RAmaterial );
    RArm.position.set(0.3,0.1,0);
    torso.add(RArm);

var LLeg = new THREE.Mesh( LLgeometry, LLmaterial );
    LLeg.position.set(-0.1,-0.3,0);
    torso.add(LLeg);

var RLeg = new THREE.Mesh( RLgeometry, RLmaterial );
    RLeg.position.set(0.1,-0.3,0);
    torso.add(RLeg);

var LFoot = new THREE.Mesh( LFgeometry, LFmaterial );
    LFoot.position.set(0,-0.09,0.1);
    LLeg.add(LFoot);

var RFoot = new THREE.Mesh( RFgeometry, RFmaterial );
    RFoot.position.set(0,-0.09,0.1);
    RLeg.add(RFoot);

 selection = torso;
parent=this.root;


for(var j=0;j<selection.children.length;j++)
{
  
  Arr.push(selection.children[j]);
    
  if(selection.children[j].children[0] )
  {
    
  
       Arr.push(selection.children[j].children[0]);
  }
}


for (var k = 0; k < Arr.length; k++) {
   Axis[k] = new THREE.AxisHelper( 0.5);
  Arr[k].add(Axis[k]);
}

 Axis[Arr.length] = new THREE.AxisHelper(0.5);
   selection.add(Axis[Arr.length]);

    return this.root;
};


Robot.prototype.reset = function(){
  for (var i = 0; i < Arr.length; i++) 
   {
      Arr[i].rotation.set(0,0,0);
       if(i==4 || i==6)
          Arr[i].material.color.setRGB(0,0,255); 
      else
          Arr[i].material.color.setRGB(255,255,0);
       parent.children[0].material.color.setRGB(255,0,0);

   }
   s=0;
     
};

Robot.prototype.selectChild = function (forward) {
 
  selection.children[0].material.color.setRGB(255,255,255); 

};

Robot.prototype.selectSibling = function(forward){

if(forward == "d" && s< Arr.length){
    // if(i<=0)
    //   i++;
    // else{
    Arr[s].material.color.setRGB(255,255,255);
    if(s>0)
    {
      if(s==5)
        Arr[s-1].material.color.setRGB(0,0,255);
      else
        Arr[s-1].material.color.setRGB(255,255,0);
      
    }
    s++;

  }
  if(forward == "a")
  {
  
    if(s>=Arr.length)
      s--;  
    if(s>0)
    {
     
      if(s==4 || s==6)
          Arr[s].material.color.setRGB(0,0,255); 
      else
          Arr[s].material.color.setRGB(255,255,0);
    
      
          Arr[s-1].material.color.setRGB(255,255,255);
          s--;
      
    }
    
  }


  


};

Robot.prototype.toggleAxisVisibility= function()
{
   if(flag==false)
    {

   for (var i = 0; i < selection.children.length; i++) 
   {
   
    if( selection.children[i])
       if( selection.children[i].type == "LineSegments" )
       {
        
            selection.children[i].visible=false;
            
       }

    
    if( selection.children[i].children[0])
       if( selection.children[i].children[0].type == "LineSegments" )
       {
        
            selection.children[i].children[0].visible=false;
            
       }
       if( selection.children[i].children[1])
         if(selection.children[i].children[1].type=="LineSegments")
         {
       
            selection.children[i].children[1].visible=false;
            
         }
         if(i<selection.children.length-1)
         {
       if(selection.children[i].children[0].children[0])
       {
        
         if(selection.children[i].children[0].children[0].type=="LineSegments" )
            {
              
              selection.children[i].children[0].children[0].visible=false;
            }
       }
     }
     flag=true;
  }
}


// ////////////for visibility
else if(flag==true)
{
     for (var i = 0; i < selection.children.length; i++) 
   {  
    if( selection.children[i])
       if( selection.children[i].type == "LineSegments" )
       {
       
            selection.children[i].visible=true;
            
       }

     
    if( selection.children[i].children[0])
       if( selection.children[i].children[0].type == "LineSegments" )
       {
        
            selection.children[i].children[0].visible=true;
            
       }
       if( selection.children[i].children[1])
         if(selection.children[i].children[1].type=="LineSegments")
         {
     
            selection.children[i].children[1].visible=true;
            
         }
         if(i<selection.children.length-1)
         {
       if(selection.children[i].children[0].children[0])
       {
         if(selection.children[i].children[0].children[0].type=="LineSegments" )
            {
              selection.children[i].children[0].children[0].visible=true;
            }
       }
     }
     flag=false;  
      }
}
   
}

Robot.prototype.selectParent = function(forward){
    // console.log(parent.children);
    parent.children[0].material.color.setRGB(255,255,255);
};

Robot.prototype.toggleSelection = function()
{
};

Robot.prototype.DanceRobot = function()
{
  var vertices = selection.geometry.vertices;
// Specify the duration for each tween.
var duration = 500;
 var j=0;

// Iterate through each vertex in the line, starting at 1.
for (var i = 1, len = vertices.length; i < len; i++) 
  {
    // Set the position of the sphere to the previous vertex.
     // selection.position.copy(vertices[i - 1]);
    if(j+i+1<Arr.length)
    {
   Arr[j].rotateX(i);
   Arr[j].position.set(0,0.33,0);
   Arr[j+i].rotateZ(i);
    Arr[j+i+1].rotateY(i);
  }
  if(i>=len)
  {
    i=1;
    j=0;
  }
    // j++;
    // Create the tween from the current sphere position to the current vertex.
    // new TWEEN.Tween(selection.position).to(vertices[i], duration).delay(i * duration).start();
  }
  Arr[j].position.set(0,0.28,0);
};

Robot.prototype.rotateOnAxis = function(axis, degree){
    for (var i = 0; i < selection.children.length; i++) {
       if( selection.children[i].material.color.getHex()=='-16777471')
       {
            // console.log(selection.children[i].material.color.getHex());
            selection.children[i].rotateX(degree);
            
       }
       if(selection.children[i].children[0])
        if(selection.children[i].children[0].material.color.getHex()=='-16777471')
                selection.children[i].children[0].rotateX(degree);
    }
};

Robot.prototype.rotateOnAxisZ = function(axis, degree){
    for (var i = 0; i < selection.children.length; i++) {
       if( selection.children[i].material.color.getHex()=='-16777471')
       {
            // console.log(selection.children[i].material.color.getHex());
            selection.children[i].rotateZ(degree);
            
       }
       if(selection.children[i].children[0])
        if(selection.children[i].children[0].material.color.getHex()=='-16777471')
                selection.children[i].children[0].rotateZ(degree);
    }
};
Robot.prototype.rotateOnAxisY = function(axis, degree){
    for (var i = 0; i < selection.children.length; i++) {
       if( selection.children[i].material.color.getHex()=='-16777471')
       {
            // console.log(selection.children[i].material.color.getHex());
            selection.children[i].rotateY(degree);
            
       }
       if(selection.children[i].children[0])
        if(selection.children[i].children[0].material.color.getHex()=='-16777471')
                selection.children[i].children[0].rotateY(degree);
    }
};


