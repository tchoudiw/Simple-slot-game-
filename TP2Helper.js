




var images = [];

// get images, place them in an array & randomize the order
for (var i = 0; i < 8; i++) { 
  var rand = Math.floor(Math.random() * (1200 - 900 + 1) + 900); 
  var img = 'http://lolcat.com/images/lolcats/' + rand + '.jpg';
  images.push(img);
  images.push(img);
}
randomizeImages();

// output images then hide them
var output = "<ol>"; 
for (var i = 0; i < 16; i++) { 
  output += "<li>";
  output += "<img src = '" + images[i] + "'/>";
  output += "</li>";
}
output += "</ol>";
document.getElementById("container").innerHTML = output;